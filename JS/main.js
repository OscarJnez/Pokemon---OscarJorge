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

let arbol1 = new MapElement("Tree")
arbol1.insertMapElement(0, 0, mapScreen)
let arbol2 = new MapElement("Tree")
arbol2.insertMapElement(50, 0, mapScreen)
let arbol3 = new MapElement("Tree")
arbol3.insertMapElement(100, 0, mapScreen)
let arbol4 = new MapElement("Tree")
arbol4.insertMapElement(100, 50, mapScreen)
let arbol5 = new MapElement("Tree")
arbol5.insertMapElement(100, 100, mapScreen)

// let obstaclesArr = []
// obstaclesArr.push(arbol1, arbol2, arbol3, arbol4, arbol5)


let newPlayer = new Player("Player", arbol5)
newPlayer.insertPlayer(250, 250, mapScreen)


/////  INICIO DE LA BATALLA  

// let player = new Pokemon("Cubone", "Fire", 30)
// let enemy = new Pokemon("Pikachu", "Electric", 30)

// player.addAttacks();
// enemy.addAttacks();

// enableFightScreen()

//////

let playerTimerY
let playerTimerX

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
                newPlayer.sprite.style.backgroundColor = "green"
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
            }
            break
        case "ArrowRight":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionX = 1
                newPlayer.sprite.style.backgroundColor = "green"
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
            }
            break
        case "ArrowUp":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = -1
                newPlayer.sprite.style.backgroundColor = "green"
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
            }
            break
        case "ArrowDown":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = 1
                newPlayer.sprite.style.backgroundColor = "green"
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
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
        case "ArrowRight":
            clearInterval(playerTimerX)
            newPlayer.directionX = 0
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
        case "ArrowUp":
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false;
            break
        case "ArrowDown":
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
    }
})