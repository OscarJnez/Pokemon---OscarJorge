//Importamos las clases que hemos creado:
import { Player } from "./playerFightConstructor.js"
import { Enemy } from "./enemyConstructor.js"
import { MapElement } from "./mapConstructor.js"
import { PlayerMap } from "./playerMapConstructor.js"
import { obstaclesArr } from "./mapGenerator.js"

//AUDIO 
let startGameAudio = new Audio("./AUDIO/pokemon-opening.mp3")

//DOM Main SCREENS:
let startGameScreen = document.getElementById("start-game-screen")
let mapScreen = document.getElementById("map-screen")
let fightScreen = document.getElementById("fight-screen")

//DOM "startGameScreen" Elements:
let startGameButton = document.getElementById("start-game-button")

//DOM "mapScreen" Elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////BORRAR ESTE BOTÓN. SUSTITUIRLO POR EL EVENTO QUE SE DA AL ENCONTRAR UN NUEVO POKEMON EN EL MAPA///////////////
let startFightScreenButton = document.getElementById("start-fight-screen-button")
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//DOM "FightScreen" Elements:
let newMessage = document.getElementById("new-message")

//MENÚS EMERGENTES: 
//"FIGHT - RUN": 
let fightRunOptionMenu = document.getElementById("fight-run-option-menu")
let fightOptionButton = document.getElementById("fight-option-button")
let runOptionButton = document.getElementById("run-option-button")

//"RETURN TO MAP - RESTART GAME":
let winOptionMenu = document.getElementById("win-option-menu")
let returnToMapOptionButton = document.getElementById("return-to-map-option-button")
let restartGameOptionButton = document.getElementById("restart-game-option-button")
let gameOverOptionMenu = document.getElementById("game-over-option-menu")
let restartGameOverOptionButton = document.getElementById("restart-game-over-option-button")

//Botones de ataque:
let attackButtonsDiv = document.getElementById("attack-buttons")
let attackButton1 = document.getElementById("attackButton1")
let attackButton2 = document.getElementById("attackButton2")
let attackButton3 = document.getElementById("attackButton3")
let attackButton4 = document.getElementById("attackButton4")

//Creación de 2 Pokemons: "enemy" y "player"
let enemy = new Enemy("Pikachu", "Electric", 20)
let player = new Player("Charmander", "Fire", 20)

//Variable para controlar el ataque del enemigo:
let timerEnemyAttack;

//DOM "enemy" Elements:
let enemyName = document.getElementById("enemy-name")
let enemyLevel = document.getElementById("enemy-level")
let enemyHealth = document.getElementById("enemy-health-text")
let enemyPP = document.getElementById("enemy-pp-text")

//DOM "player" Elements:
let playerName = document.getElementById("player-name")
let playerLevel = document.getElementById("player-level")
let playerHealth = document.getElementById("player-health-text")
let playerPP = document.getElementById("player-pp-text")
let playerImg = document.getElementById("player-img")
let playerStatus = document.getElementById("player-status")

//DOM "transition-screen" Elements: 

let loadingImgStartScreen = document.getElementById("loading-animation-start-screen")
let transitionScreen = document.getElementById("transition-screen")

//FUNCIONES PARA MOSTRAR DIFERENTES PANTALLAS:
//Función para mostrar "startGameScreen":

function startGameScreenON() {
    // startGameAudio.play();
    startGameScreen.removeAttribute("class")
    mapScreen.setAttribute("class", "hidden")
    fightScreen.setAttribute("class", "hidden")

}

//Función para mostrar "mapScreen":
function mapScreenON() {


    startGameScreen.setAttribute("class", "hidden")
    mapScreen.removeAttribute("class")
    fightScreen.setAttribute("class", "hidden")

}

//Función para mostrar "fightScreen":
function fightScreenON() {
    startGameScreen.setAttribute("class", "hidden")  //Primero, escondemos (le asignamos la clase "hidden") a las pantallas "startGameScreen" y "mapScreen" del DOM.
    mapScreen.setAttribute("class", "hidden")
    fightScreen.removeAttribute("class") //y mostramos (quitamos clase "hidden") a la pantalla "fightScreen"

    //Primer mensaje que se ve en el div "newMessage"
    newMessage.innerText = "Has encontrado un " + enemy.name + "...\n ¿Qué quieres hacer?"

    //Asignamos valores al "enemyStatus":
    enemyName.innerText = enemy.name
    enemyLevel.innerText = "Lv. " + enemy.level
    enemyHealth.innerText = enemy.health
    enemyPP.innerText = enemy.pp

    //Y también le asignamos valores al "playerStatus":
    playerName.innerText = player.name
    playerLevel.innerText = "Lv." + player.level
    playerHealth.innerText = player.health
    playerPP.innerText = player.pp

    //Aparece el menú "FIGHT-RUN" después de 2 segundos:
    setTimeout(function () {
        fightRunOptionMenu.setAttribute("class", "emergent-menu")
    }, 2000)

    //Función para mostrar los "AttackButtons":
    function showAttackButtons() {
        attackButtonsDiv.removeAttribute("class")
    }

    function hideAttackButtons() {
        attackButtonsDiv.setAttribute("class", "hidden")
    }

    //Si elegimos la opción "FIGHT"...
    fightOptionButton.addEventListener("click", function () {
        fightRunOptionMenu.setAttribute("class", "hidden")  //Se esconde el menú de "FIGHT-RUN"
        newMessage.innerText = "Has elegido a " + player.name + "!!!"
        playerImg.removeAttribute("class")   //Se muestra la imagen del "player" (se le elimina la clase "hidden")
        playerStatus.removeAttribute("class")  //y se muestra el "playerStatus" (se le elimina la clase "hidden")
        setTimeout(function () {
            newMessage.innerText = "Empieza la batalla!!!"  //Pasados 2 segundos se meustra este mensaje...
            showAttackButtons()   //y se muestran los "AttackButtons".
        }, 2000)

        //Se le añaden los respectivos ataques a cada Pokemons:
        player.addAttacks()
        enemy.addAttacks()
        //y se añaden los nombres de cada ataque a los "attackButtons":
        attackButton1.innerText = player.attackList[0].attackName
        attackButton2.innerText = player.attackList[1].attackName
        attackButton3.innerText = player.attackList[2].attackName
        attackButton4.innerText = player.attackList[3].attackName
    })

    //Si elegimos la opción "RUN"...
    runOptionButton.addEventListener("click", function () {
        newMessage.innerText = "CORRE COBARDEEEEE!!!"    //pasados 2 segundos aparece este mensaje en pantalla...
        fightRunOptionMenu.setAttribute("class", "hidden")   //y se oculta el menú "FIGHT-RUN"
        setTimeout(mapScreenON, 2000)

    })

    //Función que checkea el estado de la batalla:
    function checkBattleStatus() {
        if (player.health <= 0) {
            setTimeout(function () {
                newMessage.innerText = "GAME OVER \n *" + enemy.name + "* te ha derrotado...\n ¿Qué quieres hacer?"
                gameOverOptionMenu.setAttribute("class", "emergent-menu")
                //newPlayer.collisionSwitch = false
            }, 3000)
        } else if (enemy.health <= 0) {
            clearTimeout(timerEnemyAttack)
            setTimeout(function () {
                newMessage.innerText = "Has derrotado a *" + enemy.name + "*! \n ¿Qué quieres hacer?"
                winOptionMenu.setAttribute("class", "emergent-menu")
                //newPlayer.collisionSwitch = false
            }, 3000)

        }
    }

    //FUNCIÓN DE ATAQUE!!!:
    function battleAttack(attackIndex) {
        if (player.pp >= player.attackList[attackIndex].ppMinus) {  //Sólo si el "player" tiene suficientes puntos PP puede atacar...
            player.attack(enemy, attackIndex)   //"player" ataca a "enemy", seleccionando un ataque u otro en función del "attackButton" clicado, 
            newMessage.innerText = player.attackInfo    //se muestra en pantalla el ataque elegido, 
            playerPP.innerText = player.pp //y se actualiza el valor de "playerPP" en pantalla. 
            hideAttackButtons()  //Se esconden los botones de ataque justo después de atacar. 
            enemy.checkHealth()    //Se chequea la salud del "enemy" para que nunca pueda < 0...
            enemyHealth.innerText = enemy.health    //y se actualiza el valor la salud del "enemy" mostrado en pantalla. 
            //Luego, pasados 3 segundos (3000 msg.) se ejecuta el ataque del "enemy":
            timerEnemyAttack = setTimeout(function () {
                enemy.attackRandom(player) //"enemy" ataca a "player", usando un ataque random.
                newMessage.innerText = enemy.attackInfo  //se muestra en pantalla el ataque elegido,
                enemyPP.innerText = enemy.pp  //y se actualiza el valor de "enemyPP" en pantalla. 
                player.checkHealth()  //Se chequea la salud del "player" para que nunca pueda < 0...
                playerHealth.innerText = player.health  //y se actualiza el valor la salud del "player" mostrado en pantalla. 
                checkBattleStatus()   //Al final del ataque de "enemy", se chequea el estado de la batalla para ver si alguno ha ganado. 
                //y después de 3 segundos (lo que dura el ataque del "enemy") si "player" aún sigue con vida, se vuelven a habilitar los botones de ataque:
                setTimeout(function () {
                    if (player.health > 0) {
                        newMessage.innerText = "Es tu turno. \n Puedes volver a atacar!!!"
                        showAttackButtons()
                    }
                }, 3000)
            }, 3000)
        } else {  //En caso de que "player" no pueda lanzar un ataque por no tener suficiente "PP", evita se para el ataque hasta que seleccione uno que sí pueda lanzar:
            newMessage.innerText = "No tienes suficiente PP \n para lanzar el ataque \n *" + player.attackList[attackIndex].attackName + "*...\n Elige otro ataque!"
        }
        checkBattleStatus()  //Y al final de todo el ataque chequeaemos la batalla para ver si alguno ha ganado. 
    }

    //Eventos para los botones de "AttackButtons":
    attackButton1.addEventListener("click", function () {
        battleAttack(0)
    })
    attackButton2.addEventListener("click", function () {
        battleAttack(1)
    })
    attackButton3.addEventListener("click", function () {
        battleAttack(2)
    })
    attackButton4.addEventListener("click", function () {
        battleAttack(3)
    })

    //UNA VEZ TERMINA LA BATALLA TENDREMOS 2 OPCIONES:
    //Botón RETURN-TO-MAP:
    returnToMapOptionButton.addEventListener("click", function () {
        mapScreenON()
    })
    //Botón RESTART-GAME (WIN):
    restartGameOptionButton.addEventListener("click", function () {
        startGameScreenON()
    })

    //Botón RESTART-GAME (GAME-OVER):
    restartGameOverOptionButton.addEventListener("click", function () {
        startGameScreenON()
    })
}

//Encendemos pantalla "START-GAME" (Comienza el juego):
startGameScreenON()

//Botón START-GAME:
let timerIdMapScreen;
startGameButton.addEventListener("click", function () {

    let createLoadingDiv = document.createElement("div")
    createLoadingDiv.setAttribute("id","loading-animation-start-screen")
    startGameScreen.appendChild(createLoadingDiv)

    timerIdMapScreen = setTimeout(function () {
        mapScreenON()
    }, 3000)


})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////BORRAR ESTE BOTÓN. SUSTITUIRLO POR EL EVENTO QUE SE DA AL ENCONTRAR UN NUEVO POKEMON EN EL MAPA///////////////
startFightScreenButton.addEventListener("click", function () {
    fightScreenON()
})
/////////BORRAR ESTE BOTÓN. SUSTITUIRLO POR EL EVENTO QUE SE DA AL ENCONTRAR UN NUEVO POKEMON EN EL MAPA///////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//EVENTOS DE APARICIÓN POKEMON.

let leafZone = new MapElement("Zona1")
leafZone.insertMapElement(150, 500, mapScreen);
leafZone.height = 100;
leafZone.width = 200;

// Como metemos a bulbasur y a pikachu???

let waterZone = new MapElement("Zona2")
waterZone.insertMapElement(797, 303, mapScreen);
waterZone.height = 100;
waterZone.width = 100;

// Como metemos a squirtle ???

// let leafZone = [bulbasaurEvent];
// let waterZone = [squirtleEvent];

let pokeEvents = [leafZone, waterZone];

//CREACIÓN DEL PLAYER EN EL MAP:
let newPlayer = new PlayerMap("Player", obstaclesArr, pokeEvents)
newPlayer.insertPlayer(560, 670, mapScreen)

//EJE X

////// INTENTO DE EVENTO AL ENCONTRARNOS UN POKEMON.

let timerFightTransition;

function checkPokeEvent() {
    if (newPlayer.collisionSwitch === true) {

        transitionScreen.removeAttribute('class');
        mapScreen.setAttribute('class', 'hidden')

        timerFightTransition = setTimeout(function () {

            transitionScreen.setAttribute('class', 'hidden')
            fightScreenON()
            newPlayer.collisionSwitch = false

        }, 5000)

    }

}

//Variables con los "timerID" del movimiento del Player por el MAP:
let playerTimerY;
let playerTimerX;

//Necesario crear este boolean para evitar el delay de las teclas cuando se dejan pulsadas:
let keyIsPressed = false

//Movimiento del personaje:
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionX = -1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerLeft.png)'
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
                checkPokeEvent()

            }
            break
        case "ArrowRight":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionX = 1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerRight.png)'
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
                checkPokeEvent()
            }
            break
        case "ArrowUp":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = -1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerUp.png)'
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
                checkPokeEvent()
            }
            break
        case "ArrowDown":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = 1
                // newPlayer.sprite.style.backgroundColor = "green"
                newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerDown.png)'
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
                checkPokeEvent()
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