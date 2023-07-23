import { Pokemon } from "./pokemonConstructor.js"
import { randomNum } from "./pokemonConstructor.js"
import { MapElement } from "./mapConstructor.js"
import { Player } from "./playerConstructor.js"

//DOM ACCESING ELEMENTS. --- FOR THE MAP 
let mapElementPARENT = document.getElementById("main")
let mapScreen;
//<<DOM ACCESING ELEMENTS. --- FOR THE MAP 

//FUNCIÓN PARA INICIAR "MAPA":
function enableMap() {
    mapScreen = document.createElement("div")
    mapScreen.setAttribute("id", "map-screen")
    mapScreen.innerHTML =
        `
        <div id="main-path"></div>
        <div id="secondary-path1"></div>
        <div id="secondary-path2"></div>
        

    `
    mapElementPARENT.appendChild(mapScreen)
}

//FUNCIÓN PARA INICIAR "BATALLA":
function enableFightScreen() {
    let fightScreen = document.createElement("div")
    fightScreen.setAttribute("id", "combat-board")
    fightScreen.innerHTML =
        `
        <div id="enemy-status">
            <div id="nombre-enemy">Nombre Pokemon</div>
            <div id="nivel-enemy">Nivel</div>
            <div id="vida-enemy">VidaBarra</div>
        </div>

        <div id="img-enemy"> </div>
        <div id="img-enemy-background"></div>

        <div id="player-status">
            <div id="nombre-player">Nombre Pokemon</div>
            <div id="nivel-player">Nivel</div>
            <div id="vida-player">VidaBarra</div>
            <div id="pp-player">ppPlayer</div>
        </div>

        <div id="img-player"> </div>
        <div id="img-player-background"></div>

        <div id="message-box"> ( Message Box )
            <h3 id="attack-message">What will your Pokemon do?</h3>
            <div id="fight-menu">
                <div id="buttons1">
                    <button id="attackButton1"> </button>
                    <button id="attackButton2"> </button>
                </div>
                <div id="buttons2">
                    <button id="attackButton3"> </button>
                    <button id="attackButton4"> </button>
                </div>
            </div>
        </div>
    `
    //Añadimos el div que contiene el HTML con la pantalla "fightScreen":
    mapElementPARENT.appendChild(fightScreen)


    //DOM ACCESING ELEMENTS. --- FOR THE FIGHT:

    let messageBox = document.getElementById("attack-message");
    let playerName = document.getElementById("nombre-player")
    let playerLevel = document.getElementById("nivel-player")
    let playerHealth = document.getElementById("vida-player")
    let playerPP = document.getElementById("pp-player")

    let playerDiv = document.getElementById("img-player")
    let playerBackground = document.getElementById("img-player-background")

    let enemyName = document.getElementById("nombre-enemy")
    let enemyLevel = document.getElementById("nivel-enemy")
    let enemyHealth = document.getElementById("vida-enemy")

    let enemyDiv = document.getElementById("img-enemy")
    let enemyBackground = document.getElementById("img-enemy-background")

    //Botones de "ataques":
    let attackButton1 = document.getElementById("attackButton1")
    let attackButton2 = document.getElementById("attackButton2")
    let attackButton3 = document.getElementById("attackButton3")
    let attackButton4 = document.getElementById("attackButton4")

    //<<DOM ACCESING ELEMENTS. --- FOR THE FIGHT 

    //Creamos el menú con las opciones "Fight" y "Run":
    let fightRunMenu = document.createElement("div")
    fightRunMenu.setAttribute("id", "fight-run-menu")
    fightRunMenu.innerHTML =
        `
    <button id= "fight-button"> FIGHT </button>
    <button id= "run-button"> RUN </button>
    `

    //Creamos el menú de opciones tras "GameOver":
    let gameOverDiv = document.createElement("div")
    gameOverDiv.setAttribute("id", "game-over-div")
    gameOverDiv.innerHTML =
        `
    <button> EXIT GAME </button>
    <button> RESTART GAME </button>
    `

    //Primer mensaje que se ve en el "MessageBox" al iniciar la partida:
    function battleStart() {
        messageBox.innerText = "Has encontrado un \n" + enemy.name + "... ¿Qué vas a hacer?"
        //Se inserta en "MessageBox" el div con el menú "FightRun"
        messageBox.appendChild(fightRunMenu)
    }

    //Ejecutamos función para insertar el menú "FightRun":
    battleStart()

    //Booleano que inhabilita por defecto los botones de ataque hasta que seleccionemos "Fight":
    let enableButtons = false;

    //Le damos funcionalidad al botón "Fight":
    let fightButton = document.getElementById("fight-button")
    fightButton.addEventListener("click", function () {
        // Cambiamos el texto de los botones de ataque por los ataques del player. 
        attackButton1.innerText = player.attackList[0].attackName;
        attackButton2.innerText = player.attackList[1].attackName;
        attackButton3.innerText = player.attackList[2].attackName;
        attackButton4.innerText = player.attackList[3].attackName;
        enableButtons = true; //y habilitamos los botones de "ataque"
    })


    //Función que chequea el estado de la batalla para lanzar condición de "GameOver" o de "WIN":
    function checkBattle() {
        if (player.health <= 0) { //GAME OVER
            messageBox.innerText = "Oh no! " + player.name + " \n.......ha muerto."
            attackAvailable = false;
            clearTimeout(timerEnemyAttack);
            setTimeout(function () {
                messageBox.innerText = "GAME OVER.... \n tu Pokemon está demasiado débil \n como para seguir luchando \n ¿Qué desea hacer a continuación?"
                messageBox.appendChild(gameOverDiv)
            }, 6000)
        }
        else if (enemy.health <= 0) { //WIN
            messageBox.innerText = "Hemos conseguido derrotar a \n" + enemy.name + ". El combate ha terminado. "
            attackAvailable = false;
            clearTimeout(timerEnemyAttack);
            setTimeout(function () {
                messageBox.innerText = "Ganaste la batalla contra " + enemy.name
            }, 6000)
        }

    }

    //Asignamos las propiedades de "player" y "enemy" a los innerText de cada jugador:
    //Player:
    playerName.innerText = player.name
    playerLevel.innerText = "Lv." + player.level
    playerHealth.innerText = player.health
    playerPP.innerText = "PP: " + player.pp
    //Enemy:
    enemyName.innerText = enemy.name
    enemyLevel.innerText = "Lv." + enemy.level
    enemyHealth.innerText = enemy.health

    //Boolean que habilita realizar cada uno de los ataques durante la partida:
    let attackAvailable = true

    //ID del timer que ejecuta el ataque del enemigo:
    let timerEnemyAttack;

    //Ataque 1: 
    attackButton1.addEventListener("click", function () {
        if (enableButtons === true) {
            if (enemy.health > 0 && attackAvailable === true && player.pp >= player.attackList[0].ppMinus) {
                player.attack(enemy, 0)
                // enemy.checkEnemyHealth()
                if (enemy.health > 0) {
                    enemyHealth.innerText = enemy.health
                }
                else {
                    enemyHealth.innerText = 0
                }
                enemyBackground.style.backgroundImage = player.attackList[0].attackImage;
                playerBackground.style.backgroundImage = ""
                playerPP.innerText = "PP: " + player.pp
                messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[0].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[0].bonusDamage + "'" + " puntos de daño!!!"
                checkBattle()
                //Una vez atacamos, inhabilitamos los botones de ataque:
                attackAvailable = false
            }
            else if (attackAvailable === true && player.pp < 3) {
                messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[0].attackName + "'!!!"
            }
            //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

            timerEnemyAttack = setTimeout(function () {
                if (enemy.health > 0) {
                    enemy.attackRandom(player)
                    // player.checkPlayerHealth()
                    if (player.health > 0) {
                        playerHealth.innerText = player.health
                    } else {
                        playerHealth.innerText = 0
                    }
                    messageBox.innerText = enemy.name + " lanza ataque \n" + "'" + enemy.attackList[randomNum].attackName + "'" + " a " + player.name + "\n y le causa " + "'" + player.attackList[randomNum].bonusDamage + "'" + " puntos de daño!!!"
                    console.log(enemy.pp)
                    enemyBackground.style.backgroundImage = ""
                    playerBackground.style.backgroundImage = enemy.attackList[randomNum].attackImage;
                    checkBattle()
                    //Una vez nos atacan, se vuelven a habilitar los botones de ataque:
                    attackAvailable = true;
                }
            }, 2000)

        }
    })
    attackButton2.addEventListener("click", function () {
        if (enableButtons === true) {
            if (enemy.health > 0 && attackAvailable === true && player.pp >= player.attackList[1].ppMinus) {
                player.attack(enemy, 1)
                if (enemy.health > 0) {
                    enemyHealth.innerText = enemy.health
                }
                else {
                    enemyHealth.innerText = 0
                }
                enemyBackground.style.backgroundImage = player.attackList[1].attackImage;
                playerBackground.style.backgroundImage = ""
                playerPP.innerText = "PP: " + player.pp
                messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[1].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[1].bonusDamage + "'" + " puntos de daño!!!"
                checkBattle()
                attackAvailable = false
            }
            else if (attackAvailable === true && player.pp < 3) {
                messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[1].attackName + "'!!!"
            }
            //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

            timerEnemyAttack = setTimeout(function () {
                if (enemy.health > 0) {
                    enemy.attackRandom(player)
                    if (player.health > 0) {
                        playerHealth.innerText = player.health
                    } else {
                        playerHealth.innerText = 0
                    }
                    messageBox.innerText = enemy.name + " lanza ataque \n" + "'" + enemy.attackList[randomNum].attackName + "'" + " a " + player.name + "\n y le causa " + "'" + player.attackList[randomNum].bonusDamage + "'" + " puntos de daño!!!"
                    console.log(enemy.pp)
                    enemyBackground.style.backgroundImage = ""
                    playerBackground.style.backgroundImage = enemy.attackList[randomNum].attackImage
                    checkBattle()
                    attackAvailable = true;
                }
            }, 5000)
        }
    })

    attackButton3.addEventListener("click", function () {
        if (enableButtons === true) {
            if (enemy.health > 0 && attackAvailable === true && player.pp >= player.attackList[2].ppMinus) {
                player.attack(enemy, 2)
                if (enemy.health > 0) {
                    enemyHealth.innerText = enemy.health
                }
                else {
                    enemyHealth.innerText = 0
                }
                enemyBackground.style.backgroundImage = player.attackList[2].attackImage;
                playerBackground.style.backgroundImage = ""
                playerPP.innerText = "PP: " + player.pp
                messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[2].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[2].bonusDamage + "'" + " puntos de daño!!!"
                checkBattle()
                attackAvailable = false
            }
            else if (attackAvailable === true && player.pp < 3) {
                messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[2].attackName + "'!!!"
            }
            //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

            timerEnemyAttack = setTimeout(function () {
                if (enemy.health > 0) {
                    enemy.attackRandom(player)
                    if (player.health > 0) {
                        playerHealth.innerText = player.health
                    } else {
                        playerHealth.innerText = 0
                    }
                    messageBox.innerText = enemy.name + " lanza ataque \n" + "'" + enemy.attackList[randomNum].attackName + "'" + " a " + player.name + "\n y le causa " + "'" + player.attackList[randomNum].bonusDamage + "'" + " puntos de daño!!!"
                    console.log(enemy.pp)
                    enemyBackground.style.backgroundImage = ""
                    playerBackground.style.backgroundImage = enemy.attackList[randomNum].attackImage
                    checkBattle()
                    attackAvailable = true;
                }
            }, 5000)
        }
    })

    attackButton4.addEventListener("click", function () {
        if (enableButtons === true) {
            if (enemy.health > 0 && attackAvailable === true && player.pp >= player.attackList[3].ppMinus) {
                player.attack(enemy, 3)
                if (enemy.health > 0) {
                    enemyHealth.innerText = enemy.health
                }
                else {
                    enemyHealth.innerText = 0
                }
                enemyBackground.style.backgroundImage = player.attackList[3].attackImage;
                playerBackground.style.backgroundImage = ""
                playerPP.innerText = "PP: " + player.pp
                messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[3].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[3].bonusDamage + "'" + " puntos de daño!!!"
                checkBattle()
                attackAvailable = false

            } else if (attackAvailable === true && player.pp < 3) {
                messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[3].attackName + "'!!!"
            }
            //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

            timerEnemyAttack = setTimeout(function () {
                if (enemy.health > 0) {
                    enemy.attackRandom(player)
                    if (player.health > 0) {
                        playerHealth.innerText = player.health
                    } else {
                        playerHealth.innerText = 0
                    }
                    messageBox.innerText = enemy.name + " lanza ataque \n" + "'" + enemy.attackList[randomNum].attackName + "'" + " a " + player.name + "\n y le causa " + "'" + player.attackList[randomNum].bonusDamage + "'" + " puntos de daño!!!"
                    console.log(enemy.pp)
                    enemyBackground.style.backgroundImage = ""
                    playerBackground.style.backgroundImage = enemy.attackList[randomNum].attackImage
                    checkBattle()
                    attackAvailable = true;
                }
            }, 5000)
        }
    })

}

enableMap()

//ELEMENTOS INSERTADOS EN EL MAPA 
//ARBOLES
let arbol1 = new MapElement("Tree")
arbol1.insertMapElement(0, 0, mapScreen)
let arbol2 = new MapElement("Tree")
arbol2.insertMapElement(0, 50, mapScreen)
let arbol3 = new MapElement("Tree")
arbol3.insertMapElement(0, 100, mapScreen)
let arbol4 = new MapElement("Tree")
arbol4.insertMapElement(50, 50, mapScreen)
let arbol5 = new MapElement("Tree")
arbol5.insertMapElement(100, 50, mapScreen)
let arbol6 = new MapElement("Tree")
arbol6.insertMapElement(100, 100, mapScreen)
let arbol7 = new MapElement("Tree")
arbol7.insertMapElement(50, 100, mapScreen)
let arbol8 = new MapElement("Tree")
arbol8.insertMapElement(50, 0, mapScreen)
let arbol9 = new MapElement("Tree")
arbol9.insertMapElement(100, 0, mapScreen)
let arbol10 = new MapElement("Tree")
arbol10.insertMapElement(150, 0, mapScreen)
let arbol11 = new MapElement("Tree")
arbol11.insertMapElement(200, 0, mapScreen)
let arbol12 = new MapElement("Tree")
arbol12.insertMapElement(0, 150, mapScreen)
let arbol13 = new MapElement("Tree")
arbol13.insertMapElement(50, 150, mapScreen)
let arbol14 = new MapElement("Tree")
arbol14.insertMapElement(0, 200, mapScreen)
let arbol15 = new MapElement("Tree")
arbol15.insertMapElement(0, 250, mapScreen)
let arbol16 = new MapElement("Tree")
arbol16.insertMapElement(250, 0, mapScreen)


let arbol17 = new MapElement("Tree")
arbol17.insertMapElement(0, 650, mapScreen)
let arbol18 = new MapElement("Tree")
arbol18.insertMapElement(50, 650, mapScreen)
let arbol19 = new MapElement("Tree")
arbol19.insertMapElement(100, 650, mapScreen)
let arbol20 = new MapElement("Tree")
arbol20.insertMapElement(150, 650, mapScreen)
let arbol21 = new MapElement("Tree")
arbol21.insertMapElement(200, 650, mapScreen)
let arbol22 = new MapElement("Tree")
arbol22.insertMapElement(250, 650, mapScreen)
let arbol23 = new MapElement("Tree")
arbol23.insertMapElement(300, 650, mapScreen)
let arbol24 = new MapElement("Tree")
arbol24.insertMapElement(350, 650, mapScreen)
let arbol25 = new MapElement("Tree")
arbol25.insertMapElement(400, 650, mapScreen)
let arbol26 = new MapElement("Tree")
arbol26.insertMapElement(0, 600, mapScreen)
let arbol27 = new MapElement("Tree")
arbol27.insertMapElement(50, 600, mapScreen)
let arbol28 = new MapElement("Tree")
arbol28.insertMapElement(100, 600, mapScreen)
let arbol29 = new MapElement("Tree")
arbol29.insertMapElement(150, 600, mapScreen)
let arbol31 = new MapElement("Tree")
arbol31.insertMapElement(200, 600, mapScreen)
let arbol32 = new MapElement("Tree")
arbol32.insertMapElement(250, 600, mapScreen)
let arbol33 = new MapElement("Tree")
arbol33.insertMapElement(300, 600, mapScreen)
let arbol34 = new MapElement("Tree")
arbol34.insertMapElement(350, 600, mapScreen)
let arbol35 = new MapElement("Tree")
arbol35.insertMapElement(0, 550, mapScreen)
let arbol36 = new MapElement("Tree")
arbol36.insertMapElement(50, 550, mapScreen)
let arbol37 = new MapElement("Tree")
arbol37.insertMapElement(100, 550, mapScreen)
let arbol38 = new MapElement("Tree")
arbol38.insertMapElement(850, 550, mapScreen)
let arbol39 = new MapElement("Tree")
arbol39.insertMapElement(850, 600, mapScreen)
let arbol40 = new MapElement("Tree")
arbol40.insertMapElement(800, 600, mapScreen)
let arbol41 = new MapElement("Tree")
arbol41.insertMapElement(850, 500, mapScreen)


//CASAS
let house1 = new MapElement("PokeBank")
house1.insertMapElement(140, 30, mapScreen)
house1.height = 110;
house1.width = 130;
let house2 = new MapElement("PokeBakery")
house2.insertMapElement(300, 300, mapScreen)
house2.height = 90;
house2.width = 110;

let house4 = new MapElement("SideHouse")
house4.insertMapElement(605, 400, mapScreen)
house4.height = 130;
house4.width = 100;

let house5 = new MapElement("BackHouse")
house5.insertMapElement(400, 515, mapScreen)
house5.height = 120;
house5.width = 140;

//AGUA
let water1 = new MapElement("Lake1")
water1.insertMapElement(697, 0, mapScreen)
water1.height = 300;
water1.width = 200;
let water2 = new MapElement("Lake2")
water2.insertMapElement(494, 0, mapScreen)
water2.height = 100;
water2.width = 200;

//CASA que se superpone al agua
let house3 = new MapElement("LakeHouse")
house3.insertMapElement(550, 50, mapScreen)
house3.height = 130;
house3.width = 150;

//CESPED
let grass1 = new MapElement("Grass")
grass1.insertMapElement(0, 300, mapScreen)
let grass2 = new MapElement("Grass")
grass2.insertMapElement(50, 300, mapScreen)
let grass3 = new MapElement("Grass")
grass3.insertMapElement(50, 250, mapScreen)
let grass4 = new MapElement("Grass")
grass4.insertMapElement(50, 200, mapScreen)
// detras de la casa 
let grass5 = new MapElement("Grass")
grass5.insertMapElement(300, 0, mapScreen)
let grass7 = new MapElement("Grass")
grass7.insertMapElement(400, 0, mapScreen)
let grass8 = new MapElement("Grass")
grass8.insertMapElement(350, 0, mapScreen)

let grass9 = new MapElement("Grass")
grass9.insertMapElement(0, 500, mapScreen)
let grass10 = new MapElement("Grass")
grass10.insertMapElement(50, 500, mapScreen)
let grass11 = new MapElement("Grass")
grass11.insertMapElement(100, 500, mapScreen)
let grass12 = new MapElement("Grass")

let grass20 = new MapElement("Grass")
grass20.insertMapElement(250, 550, mapScreen)
let grass21 = new MapElement("Grass")
grass21.insertMapElement(300, 550, mapScreen)
let grass22 = new MapElement("Grass")
grass22.insertMapElement(300, 500, mapScreen)
let grass23 = new MapElement("Grass")
grass23.insertMapElement(250, 500, mapScreen)
let grass24 = new MapElement("Grass")
grass24.insertMapElement(200, 550, mapScreen)
let grass25 = new MapElement("Grass")
grass25.insertMapElement(150, 550, mapScreen)
let grass26 = new MapElement("Grass")
grass26.insertMapElement(150, 500, mapScreen)
let grass27 = new MapElement("Grass")
grass27.insertMapElement(200, 500, mapScreen)

// Al lado del agua 
grass12.insertMapElement(848, 305, mapScreen)
let grass13 = new MapElement("Grass")
grass13.insertMapElement(798, 305, mapScreen)
let grass14 = new MapElement("Grass")
grass14.insertMapElement(748, 305, mapScreen)
let grass15 = new MapElement("Grass")
grass15.insertMapElement(698, 305, mapScreen)
let grass16 = new MapElement("Grass")
grass16.insertMapElement(848, 355, mapScreen)
let grass17 = new MapElement("Grass")
grass17.insertMapElement(848, 405, mapScreen)
let grass18 = new MapElement("Grass")
grass18.insertMapElement(798, 355, mapScreen)

//FLOWERS
let flowers1 = new MapElement("Flowers")
flowers1.insertMapElement(255, 350, mapScreen)
let flowers2 = new MapElement("Flowers2")
flowers2.insertMapElement(430, 350, mapScreen)
let flowers3 = new MapElement("FlowersSp")
flowers3.insertMapElement(500, 100, mapScreen)
let flowers4 = new MapElement("FlowersSp2")
flowers4.insertMapElement(100, 160, mapScreen)
let flowers5 = new MapElement("Flowers")
flowers5.insertMapElement(645, 180, mapScreen)

//ROCKS

let rock1 = new MapElement("Rock")
rock1.insertMapElement(750, 350, mapScreen)
// let rock2= new MapElement("Rock2")
// rock2.insertMapElement(498,445,mapScreen)
// let rock4= new MapElement("Rock2")
// rock4.insertMapElement(430,440,mapScreen)

let rock8 = new MapElement("Rock")
rock8.insertMapElement(350, 490, mapScreen)
let rock7 = new MapElement("Rock")
rock7.insertMapElement(350, 510, mapScreen)
let rock6 = new MapElement("Rock")
rock6.insertMapElement(350, 530, mapScreen)
let rock5 = new MapElement("Rock")
rock5.insertMapElement(350, 550, mapScreen)

//bottom barrier 

let rock9 = new MapElement("Rock")
rock9.insertMapElement(850, 657, mapScreen)
let rock10 = new MapElement("Rock")
rock10.insertMapElement(830, 657, mapScreen)
let rock11 = new MapElement("Rock")
rock11.insertMapElement(810, 657, mapScreen)
let rock12 = new MapElement("Rock")
rock12.insertMapElement(790, 657, mapScreen)
let rock13 = new MapElement("Rock")
rock13.insertMapElement(770, 657, mapScreen)
let rock14 = new MapElement("Rock")
rock14.insertMapElement(750, 657, mapScreen)
let rock15 = new MapElement("Rock")
rock15.insertMapElement(730, 657, mapScreen)
let rock16 = new MapElement("Rock")
rock16.insertMapElement(710, 657, mapScreen)
let rock17 = new MapElement("Rock")
rock17.insertMapElement(690, 657, mapScreen)
let rock18 = new MapElement("Rock")
rock18.insertMapElement(670, 657, mapScreen)
let rock19 = new MapElement("Rock")
rock19.insertMapElement(650, 657, mapScreen)
let rock20 = new MapElement("Rock")
rock20.insertMapElement(630, 657, mapScreen)
let rock21 = new MapElement("Rock")
rock21.insertMapElement(610, 657, mapScreen)

let rock22 = new MapElement("Rock")
rock22.insertMapElement(485, 657, mapScreen)
let rock23 = new MapElement("Rock")
rock23.insertMapElement(465, 657, mapScreen)
let rock24 = new MapElement("Rock")
rock24.insertMapElement(445, 657, mapScreen)
let rock25 = new MapElement("Rock")
rock25.insertMapElement(610, 657, mapScreen)

//FOUNTAIN 

let fountain = new MapElement("Fountain")
fountain.insertMapElement(380, 175, mapScreen)
fountain.width = 80;
fountain.height = 80;

//PERSONAS

let person = new MapElement("Person")
person.insertMapElement(440, 200, mapScreen)
person.height = 20;
person.width = 30;

let snorlax = new MapElement("Snorlax")
snorlax.insertMapElement(0,370,mapScreen)


//ARRAY DE TODOS LOS OBSTACULOS 
let obstaclesArr = [arbol1, arbol2, arbol3, arbol4, arbol5, arbol6,
    arbol7, arbol8, arbol9, arbol10, arbol11, arbol12, arbol13, arbol14,
    arbol15, arbol16, arbol16, arbol17, arbol18, arbol19, arbol20, arbol21, arbol22,
    arbol23, arbol24, arbol25, arbol26, arbol27, arbol28, arbol29, arbol31,
    arbol32, arbol33, arbol34, arbol35, arbol36, arbol37, arbol38, arbol39, arbol40, arbol41,

    house1, house2, house3, house4, house5,
    water1, water2, fountain, person,snorlax,

    rock1, rock5, rock6, rock7, rock8, rock9, rock10, rock11, rock12,
    rock13, rock14, rock15, rock16, rock17, rock18, rock19, rock20, rock21, rock22, rock23,
    rock24, rock25

]

let newPlayer = new Player("Player", obstaclesArr)
newPlayer.insertPlayer(560, 670, mapScreen)


/////  INICIO DE LA BATALLA  

// let player = new Pokemon("Cubone", "Fire", 30)
// let enemy = new Pokemon("Pikachu", "Electric", 30)

// player.addAttacks();
// enemy.addAttacks();

// enableFightScreen()

//////

let playerTimerY;
let playerTimerX;

//Necesario crear este boolean para evitar el delay de las teclas cuando se dejan pulsadas:
let keyIsPressed = false

//Movimiento del personaje:
window.addEventListener("keydown", function (event) {
    console.log(event.key)
    switch (event.key) {
        case "ArrowLeft":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionX = -1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerLeft.png)'
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
            }
            break
        case "ArrowRight":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionX = 1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerRight.png)'
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
            }
            break
        case "ArrowUp":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = -1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerUp.png)'
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
            }
            break
        case "ArrowDown":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = 1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerDown.png)'
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
            }
            break
    }
})

window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            clearInterval(playerTimerX)
            newPlayer.directionX = 0
            // newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
        case "ArrowRight":
            clearInterval(playerTimerX)
            newPlayer.directionX = 0
            // newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
        case "ArrowUp":
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
            // newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false;
            break
        case "ArrowDown":
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
            // newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
    }
})