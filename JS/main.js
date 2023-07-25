//Importamos las clases que hemos creado:

import { Player } from "./playerFightConstructor.js"
import { Enemy } from "./enemyConstructor.js"
import { MapElement } from "./mapConstructor.js"
import { PlayerMap } from "./playerMapConstructor.js"
import { obstaclesArr } from "./mapGenerator.js"

//AUDIO 
let startGameAudio = new Audio("./AUDIO/pokemon-opening.mp3")
let mapScreenAudio = new Audio("./AUDIO/map1Song.mp3")
// let fightScreenAudio = new Audio("./AUDIO/fightScreenAudio.mp3")
let transitionFightScreenAudio = new Audio("AUDIO/audioTransCombat.mp3")

//DOM Main SCREENS:
let startGameScreen = document.getElementById("start-game-screen")
let mapScreen = document.getElementById("map-screen")
let fightScreen = document.getElementById("fight-screen")

//DOM "startGameScreen" Elements:
let startGameButton = document.getElementById("start-game-button")
let startGameAudioButton = document.getElementById("start-game-audio-button")

//DOM "mapScreen" Elements

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

//Creación de Pokemons: "player" y "enemy"
let player = new Player("Charmander", "Fire", 20)

let enemy;

//Más adelante, "enemy" tomará el valor de alguna de las siguientes variables...
let enemySquirtle = new Enemy("Squirtle", "Water", 20)
let enemyBulbasaur = new Enemy("Bulbasaur", "Leaf", 20)
let enemyCharmander = new Enemy("Charmander", "Fire", 20)
let enemyPikachu = new Enemy("Pikachu", "Electric", 20)
let enemiesArr = [enemyPikachu, enemyCharmander, enemyBulbasaur]  //insertadas en un array: "enemiesArr"
//y esta variable nos permitirá seleccionar un elemento al azar del "enemiesArr":
let randomPokeEvent;

//Variable para controlar el ataque del enemigo:
let timerEnemyAttack;

//DOM "enemy" Elements:
let enemyName = document.getElementById("enemy-name")
let enemyLevel = document.getElementById("enemy-level")
let enemyHealth = document.getElementById("enemy-health-text")
let enemyPP = document.getElementById("enemy-pp-text")
//////////NUEVO
let enemyImg = document.getElementById("enemy-img")

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
let gameOverScreen = document.getElementById("game-over-screen")  ////////FALTA ASIGNAR IMAGEN PARA GAME OVER

//FUNCIONES PARA MOSTRAR DIFERENTES PANTALLAS:

//Función para mostrar "startGameScreen":
function startGameScreenON() {
    //Audios:
    
    mapScreenAudio.pause()
    transitionFightScreenAudio.pause()

    startGameScreen.removeAttribute("class")
    mapScreen.setAttribute("class", "hidden")
    fightScreen.setAttribute("class", "hidden")

}

startGameAudioButton.addEventListener("click", function () {
    startGameAudio.play();
    // startGameAudio.load();
})

//Función para mostrar "mapScreen":
function mapScreenON() {
    //Audios: 

    startGameAudio.pause()
    transitionFightScreenAudio.pause()
    mapScreenAudio.play()

    startGameScreen.setAttribute("class", "hidden")
    mapScreen.removeAttribute("class")
    fightScreen.setAttribute("class", "hidden")
}

//Zonas que contrendrán los eventos de aparición de los Pokemon:
let leafZone = new MapElement("Zona1")
leafZone.insertMapElement(150, 500, mapScreen);
leafZone.height = 100;
leafZone.width = 200;

let waterZone = new MapElement("Zona2")
waterZone.insertMapElement(797, 303, mapScreen);
waterZone.height = 100;
waterZone.width = 100;

let pokeEvents = [leafZone, waterZone] //Metemos ambas zonas dentro de un array (que usará el constructor de "PlayerMap")

//Creación de "newPlayer" en el MAP:
let newPlayer = new PlayerMap("Player", obstaclesArr, pokeEvents)
newPlayer.insertPlayer(560, 670, mapScreen)

//ID del timer que activará la "transitionScreen":
let timerFightTransition;

//Función para crear los eventos de ENCUENTRO con los Pokemon en las distintas zonas:
function checkPokeEvent() {

    randomPokeEvent = Math.floor(Math.random() * enemiesArr.length)

    if (newPlayer.collisionSwitchZone1 === true) {   //Si nos encontramos con un Pokemon en la Zona1 ("leafZone")...
        //Audios:
        mapScreenAudio.pause()  //pausamos el audio de "mapScreenAudio"
        transitionFightScreenAudio.load()  //re-load el audio de "transitionFightScreen"
        transitionFightScreenAudio.play() //y play la música de inicio de pelea:

        transitionScreen.removeAttribute('class')    //mostramos la pantalla de transición....
        mapScreen.setAttribute('class', 'hidden')    //ocultamos la pantalla de MAP....
        timerFightTransition = setTimeout(function () {   //y pasados 5 segundos...



            transitionScreen.setAttribute('class', 'hidden')  //ocultamos la pantalla de transición...
            enemy = enemiesArr[randomPokeEvent]  //le asignamos a la variable "enemy" el valor de un elemento al azar del array "enemiesArr"...
            console.log(enemy)

            fightScreenON()    //INICIAMOS LA BATALLA CON ESE POKEMON....
            newPlayer.collisionSwitchZone1 = false  //y desactivamos el "collisionSwitchZone1" para evitar volver a colisionar al terminar la batalla.
            console.log(enemiesArr)

        }, 5000)
    } else if (newPlayer.collisionSwitchZone2 === true) {   //Lo mismo para la Zona2 ("waterZone")....
        //Audios:
        mapScreenAudio.pause()  //pausamos el audio de "mapScreenAudio"
        transitionFightScreenAudio.load()  //re-load el audio de "transitionFightScreen"
        transitionFightScreenAudio.play() //y play la música de inicio de pelea:

        transitionScreen.removeAttribute('class');
        mapScreen.setAttribute('class', 'hidden')
        timerFightTransition = setTimeout(function () {

            transitionScreen.setAttribute('class', 'hidden')
            enemy = enemySquirtle    //Pero aquí pelearemos únicamente con "enemySquirtle".
            fightScreenON()
            newPlayer.collisionSwitchZone2 = false

        }, 5000)

    }

}

//Función para mostrar "fightScreen":
function fightScreenON() {
    //Audios:

    startGameAudio.pause()

    startGameScreen.setAttribute("class", "hidden")  //Primero, escondemos (le asignamos la clase "hidden") a las pantallas "startGameScreen" y "mapScreen" del DOM.
    mapScreen.setAttribute("class", "hidden")
    fightScreen.removeAttribute("class") //y mostramos (quitamos clase "hidden") a la pantalla "fightScreen"

    //Primer mensaje que se ve en el div "newMessage"
    newMessage.innerText = "Has encontrado un " + enemy.name + "...\n ¿Qué quieres hacer?"

    //Función para reiniciar la "health" y el "pp" del "enemy" a los valores originales al empezar una nueva pelea.
    function restoreEnemyHealth() {

        enemy.health = enemy.level * 10;
        enemy.pp = enemy.level * 2;

    }

    //Función para reiniciar la salud del "player" a los valores originales si se cumple condición "GAME-OVER" y reiniciamos el juego:
    function restorePlayerHealth() {
        player.health = player.level * 10;
        player.pp = player.level * 2;
    }

    //Inicializamos la variable para restaurar la "health" y el "pp " de "player":
    restoreEnemyHealth();
    //Asignamos valores al "enemyStatus":

    enemyImg.style.backgroundImage = `url(../IMG/ENEMY/${enemy.name}Enemy.gif)`
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
            //Tras ser derrotados, 2 segundos después aparecerá la pantalla "GAME-OVER":
            setTimeout(function () {
                gameOverScreen.removeAttribute("class")
                fightScreen.setAttribute("class", "hidden")
            }, 2000)

            //y 6 segundos después (3segs-2segs), aparecerá de nuevo la pantalla "fightScreen" con el mensaje de que "GAME-OVER....":
            setTimeout(function () {
                gameOverScreen.setAttribute("class", "hidden")  //Escondemos la pantalla "GAME-OVER"....
                fightScreen.removeAttribute("class")     //y mostramos la pantalla "fightScreen" con el siguiente mensaje:
                newMessage.innerText = "GAME OVER \n *" + enemy.name + "* te ha derrotado...\n ¿Qué quieres hacer?"
                gameOverOptionMenu.setAttribute("class", "emergent-menu")
            }, 8000)

        } else if (enemy.health <= 0) {
            clearTimeout(timerEnemyAttack)
            setTimeout(function () {
                newMessage.innerText = "Has derrotado a *" + enemy.name + "*! \n ¿Qué quieres hacer?"
                winOptionMenu.setAttribute("class", "emergent-menu")
                enemiesArr.splice(randomPokeEvent, 1)
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

    //UNA VEZ TERMINA LA BATALLA TENDREMOS VARIAS OPCIONES:
    //Si ganamos.... WIN:
    //Botón RETURN-TO-MAP (WIN):
    returnToMapOptionButton.addEventListener("click", function () {
        mapScreenON()
        winOptionMenu.setAttribute("class", "hidden")
        gameOverOptionMenu.setAttribute("class", "hidden")
    })

    //Botón RESTART-GAME (WIN):
    restartGameOptionButton.addEventListener("click", function () {
        startGameScreenON()

    })

    //Si perdemos.... GAME-OVER:
    //Botón RESTART-GAME (GAME-OVER):
    restartGameOverOptionButton.addEventListener("click", function () {
        startGameScreenON()
        restorePlayerHealth()  //iniciamos la "health" y "pp" de "player" a los valores iniciales.
    })
}

//Encendemos pantalla "START-GAME" (Comienza el juego):
startGameScreenON()

//Función que traslada al player a la posición inicial, para cuando volvamos a la pantalla de inicio poder empezar de cero. 
function initialPosition() {
    newPlayer.insertPlayer(560, 670, mapScreen)
    newPlayer.sprite.style.backgroundImage = 'url(../IMG/MAP/playerUp.png)';
}

//ID del Timer que cotrolará el botón de "startGameButton":
let timerIdMapScreen;

//Botón START-GAME:
startGameButton.addEventListener("click", function () {

    loadingImgStartScreen.removeAttribute("class")  //mostramos el div que contiene el "loadingImgStartScreen" (barra de carga...)
    timerIdMapScreen = setTimeout(function () {  //y 3 segundos después....
        mapScreenON()    //Mostramos la pantalla de "MAP"
        initialPosition()   //y volvemos a insertar al "newPlayer" en su posición inicial en el MAPA.
        loadingImgStartScreen.setAttribute("class", "hidden")  //y ocultamos el div "loadingImgStartScreen" para que no vuelva a aparecer si luego volvemos a esta pantalla.

    }, 3000)


})


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