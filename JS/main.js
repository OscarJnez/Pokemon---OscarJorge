//Importamos diferentes clases:
import { Player } from "./playerFightConstructor.js"
import { Enemy } from "./enemyConstructor.js"
import { MapElement } from "./mapConstructor.js"
import { PlayerMap } from "./playerMapConstructor.js"
import { obstaclesArr } from "./mapGenerator.js"

//AUDIOS:
let startGameAudio = new Audio("./AUDIO/pokemon-opening.mp3")
let mapScreenAudio = new Audio("./AUDIO/map1Song.mp3")
let transitionFightScreenAudio = new Audio("./AUDIO/audioTransCombat.mp3")
let gameOverAudio = new Audio("./AUDIO/gameOverAudio.mp3")

//DOM principales SCREENS:
let startGameScreen = document.getElementById("start-game-screen")
let mapScreen = document.getElementById("map-screen")
let fightScreen = document.getElementById("fight-screen")


//DOM Elementos de "startGameScreen":
    let startGameButton = document.getElementById("start-game-button")
    let startGameAudioButton = document.getElementById("start-game-audio-button")

    //Botón play para la música de startGameScreen:
    startGameAudioButton.addEventListener("click", function () {
        startGameAudio.play();
        startGameAudio.volume = 0.08;
    })

    //ID del Timer que cotrolará el botón de "startGameButton":
    let timerIdMapScreen;

    //Botón START-GAME:
    startGameButton.addEventListener("click", function () {
    
        loadingImgStartScreen.removeAttribute("class")  //mostramos el div que contiene el "loadingImgStartScreen" (barra de carga...)
        timerIdMapScreen = setTimeout(function () {     //y 3 segundos después....
            mapScreenON()                               //Mostramos la pantalla de "MAP"
            initialPosition()                           //y volvemos a insertar al "newPlayer" en su posición inicial en el MAPA.
            loadingImgStartScreen.setAttribute("class", "hidden")  //y ocultamos el div "loadingImgStartScreen" para que no vuelva a aparecer si luego volvemos a esta pantalla.
    
        }, 3000)
    
    })

//DOM Elementos de "mapScreen":
    //Zonas que contrendrán los eventos de aparición de los Pokemon:
    //Zona1:
    let leafZone = new MapElement("Zona1")
    leafZone.insertMapElement(150, 500, mapScreen);
    leafZone.height = 100;
    leafZone.width = 200;

    //Variable random que elegirá un Pokemon al azar del "enemiesArr" en la Zona1:
    let randomPokeEvent;

    //Zona2:
    let waterZone = new MapElement("Zona2")
    waterZone.insertMapElement(797, 303, mapScreen);
    waterZone.height = 100;
    waterZone.width = 100;

    let pokeEvents = [leafZone, waterZone] //Metemos ambas zonas dentro de un array (que usará el constructor de "PlayerMap")
    
    //Creación e inserción del objeto "newPlayer" en el mapScreen:
    let newPlayer = new PlayerMap("Player", obstaclesArr, pokeEvents)
    newPlayer.insertPlayer(560, 670, mapScreen)

    //Función que traslada a newPlayer a la posición inicial:
    function initialPosition() {
        newPlayer.insertPlayer(560, 670, mapScreen)
        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerUp.png)';  //mirando hacia arriba
    }

    //Timer ids del movimiento del Player por el MAP:
    let playerTimerY;
    let playerTimerX;

    //Necesario crear este boolean para evitar el delay de las teclas cuando se dejan pulsadas:
    let keyIsPressed = false

    //Movimiento del personaje (ArrowKeys):
    window.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowLeft":
                if (!keyIsPressed) {
                    keyIsPressed = true
                    newPlayer.directionX = -1
                    // newPlayer.sprite.style.backgroundColor = "green"
                    newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerLeft.png)'
                    playerTimerX = setInterval(newPlayer.movePlayerX, 50)
                    checkPokeEvent()
                }
                break
            case "ArrowRight":
                if (!keyIsPressed) {
                    keyIsPressed = true
                    newPlayer.directionX = 1
                    // newPlayer.sprite.style.backgroundColor = "green"
                    newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerRight.png)'
                    playerTimerX = setInterval(newPlayer.movePlayerX, 50)
                    checkPokeEvent()
                }
                break
            case "ArrowUp":
                if (!keyIsPressed) {
                    keyIsPressed = true
                    newPlayer.directionY = -1
                    // newPlayer.sprite.style.backgroundColor = "green"
                    newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerUp.png)'
                    playerTimerY = setInterval(newPlayer.movePlayerY, 50)
                    checkPokeEvent()
                }
                break
            case "ArrowDown":
                if (!keyIsPressed) {
                    keyIsPressed = true
                    newPlayer.directionY = 1
                    // newPlayer.sprite.style.backgroundColor = "green"
                    newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerDown.png)'
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
 


//DOM Elementos de "transitionScreen": 
let loadingImgStartScreen = document.getElementById("loading-animation-start-screen")
let transitionScreen = document.getElementById("transition-screen")
let gameOverScreen = document.getElementById("game-over-screen") 

    //ID del timer que activará la "transitionScreen":
    let timerFightTransition;



//DOM Elementos de "FightScreen":
    //Pokemons: objetos "player" y "enemy":
    let player = new Player("Charmander", "Fire", 30)
    player.addAttacks();
    let enemy;

    //Más tarde, "enemy" tomará el valor de alguna de las siguientes variables...
    let enemySquirtle = new Enemy("Squirtle", "Water", 20)
    enemySquirtle.addAttacks();  //añadimos los respectivos ataques a cada Pokemon.
    let enemyBulbasaur = new Enemy("Bulbasaur", "Leaf", 20)
    enemyBulbasaur.addAttacks();
    let enemyCharmander = new Enemy("Charmander", "Fire", 20)
    enemyCharmander.addAttacks();
    let enemyPikachu = new Enemy("Pikachu", "Electric", 20)
    enemyPikachu.addAttacks();

    //Insertamos todos los "Enemy" anteriores en un array:
    let enemiesArr = [enemyPikachu, enemyCharmander, enemyBulbasaur] 

    //Mensajes de texto en fightScreen y background image de la pelea:
    let newMessage = document.getElementById("new-message")    
    let combatBackGround = document.getElementById("combat-box")  

    //MENÚS EMERGENTES:
    //Fight-Run Menú:
    let fightRunOptionMenu = document.getElementById("fight-run-option-menu")
    let fightOptionButton = document.getElementById("fight-option-button")
    let runOptionButton = document.getElementById("run-option-button")

    //Win Menú:
    let winOptionMenu = document.getElementById("win-option-menu")
    let returnToMapOptionButton = document.getElementById("return-to-map-option-button")
    let restartGameOptionButton = document.getElementById("restart-game-option-button")

    //GameOver Menú:
    let gameOverOptionMenu = document.getElementById("game-over-option-menu")
    let restartGameOverOptionButton = document.getElementById("restart-game-over-option-button")

    //Attackbuttons:
    let attackButtonsDiv = document.getElementById("attack-buttons")
    let attackButton1 = document.getElementById("attackButton1")
    let attackButton2 = document.getElementById("attackButton2")
    let attackButton3 = document.getElementById("attackButton3")
    let attackButton4 = document.getElementById("attackButton4")

    //fightScreen "enemy" Elements:
    let enemyName = document.getElementById("enemy-name")
    let enemyLevel = document.getElementById("enemy-level")
    let enemyHealth = document.getElementById("enemy-health-text")
    let enemyPP = document.getElementById("enemy-pp-text")
    let enemyImg = document.getElementById("enemy-img")

    //fightScreen "player" Elements:
    let playerName = document.getElementById("player-name")
    let playerLevel = document.getElementById("player-level")
    let playerHealth = document.getElementById("player-health-text")
    let playerPP = document.getElementById("player-pp-text")
    let playerImg = document.getElementById("player-img")
    let playerStatus = document.getElementById("player-status")

    //Timer id para el ataque de "enemy":
    let timerEnemyAttack;



//FUNCIONES:
//Mostrar "startGameScreen":
function startGameScreenON() {
    //Audios:
    mapScreenAudio.pause()
    transitionFightScreenAudio.pause()

    startGameScreen.removeAttribute("class")   //elimina la clase "hidden" a startGameScreen (la muestra)
    mapScreen.setAttribute("class", "hidden")
    fightScreen.setAttribute("class", "hidden")
}


//Mostrar "mapScreen":
function mapScreenON() {
    //Audios: 
    startGameAudio.pause()
    transitionFightScreenAudio.pause()
    mapScreenAudio.play()
    mapScreenAudio.volume = 0.08;

    startGameScreen.setAttribute("class", "hidden")
    mapScreen.removeAttribute("class")
    fightScreen.setAttribute("class", "hidden")
}


//Checkear si "newPlayer" se encuentra con un Pokemon en Zona1 o Zona2 e iniciar la fightScreen:
function checkPokeEvent() {

    randomPokeEvent = Math.floor(Math.random() * enemiesArr.length)

    if (newPlayer.collisionSwitchZone1 === true && enemiesArr.length > 0) {   //Si nos encontramos con un Pokemon en la Zona1 ("leafZone")...
        //Audios:
        mapScreenAudio.pause()  
        transitionFightScreenAudio.load()  
        transitionFightScreenAudio.play() 
        transitionFightScreenAudio.volume = 0.08;

        transitionScreen.removeAttribute('class')    //mostramos la pantalla de transición....
        mapScreen.setAttribute('class', 'hidden')    //ocultamos la pantalla de MAP....
        timerFightTransition = setTimeout(function () {   //y pasados 5 segundos...

            transitionScreen.setAttribute('class', 'hidden')  //ocultamos la pantalla de transición...
            enemy = enemiesArr[randomPokeEvent]               //le asignamos a la variable "enemy" el valor de un elemento al azar del array "enemiesArr"...
            combatBackGround.style.backgroundImage = "url(./IMG/OTROS/Fondo.jpeg)"  //cambiamos el fondo a Zona1 (fondo "hierba"):
            
            fightScreenON()  //INICIAMOS LA BATALLA CON ESE POKEMON....

            newPlayer.collisionSwitchZone1 = false  //y desactivamos el "collisionSwitchZone1" para evitar volver a colisionar al terminar la batalla.

        }, 5000)
    } else if (newPlayer.collisionSwitchZone2 === true && enemySquirtle.health > 0) {   //Lo mismo para la Zona2 ("waterZone")....
        //Audios:
        mapScreenAudio.pause()  
        transitionFightScreenAudio.load()  
        transitionFightScreenAudio.play()
        transitionFightScreenAudio.volume = 0.08;

        transitionScreen.removeAttribute('class');
        mapScreen.setAttribute('class', 'hidden')
        timerFightTransition = setTimeout(function () {

            transitionScreen.setAttribute('class', 'hidden')
            enemy = enemySquirtle    //Pero aquí pelearemos únicamente con "enemySquirtle".
            combatBackGround.style.backgroundImage = "url(./IMG/OTROS/waterBackGround.jpg)"
            
            fightScreenON()
            
            newPlayer.collisionSwitchZone2 = false

        }, 5000)

    }

}


//Mostrar "attackButtons":
function showAttackButtons() {
    attackButtonsDiv.removeAttribute("class")
}

//Ocultar "attackButtons":
function hideAttackButtons() {
    attackButtonsDiv.setAttribute("class", "hidden")
}

//Botón "FIGHT":
fightOptionButton.addEventListener("click", function () {

    fightRunOptionMenu.setAttribute("class", "hidden")  //Se esconde el menú de "FIGHT-RUN"
    newMessage.innerText = "Has elegido a " + player.name + "!!!"
    playerImg.removeAttribute("class")                  //Se muestra la imagen del "player" (se le elimina la clase "hidden")
    playerStatus.removeAttribute("class")               //y se muestra el "playerStatus" (se le elimina la clase "hidden")
    //y se añaden los nombres de cada ataque a los "attackButtons":
    attackButton1.innerText = player.attackList[0].attackName
    attackButton2.innerText = player.attackList[1].attackName
    attackButton3.innerText = player.attackList[2].attackName
    attackButton4.innerText = player.attackList[3].attackName
    
    setTimeout(function () {
        
        newMessage.innerText = "Empieza la batalla!!!"  //Pasados 2 segundos se meustra este mensaje...
        showAttackButtons()                             //y se muestran los "AttackButtons".
    }, 2000)

})

//Botón "RUN"...
runOptionButton.addEventListener("click", function () {

    newMessage.innerText = "CORRE COBARDEEEEE!!!"       //pasados 2 segundos aparece este mensaje en pantalla...
    fightRunOptionMenu.setAttribute("class", "hidden")  //y se oculta el menú "FIGHT-RUN"
    setTimeout(
        mapScreenON, 2000)   //pasados 2 segundos mostramos "mapScreen"

})


//Mostrar "fightScreen":
function fightScreenON() {
    //Audios:
    startGameAudio.pause()

    startGameScreen.setAttribute("class", "hidden")  //Primero, escondemos (le asignamos la clase "hidden") a las pantallas "startGameScreen" y "mapScreen" del DOM.
    mapScreen.setAttribute("class", "hidden")
    fightScreen.removeAttribute("class")            //y mostramos (quitamos clase "hidden") a la pantalla "fightScreen"

    //Primer mensaje que se ve en el div "newMessage"
    newMessage.innerText = "Has encontrado un " + enemy.name + "...\n ¿Qué quieres hacer?"

    //Reiniciar "health" y "pp" de "enemy" a los valores originales al empezar una nueva pelea.
    function restoreEnemyHealth() {

        enemy.health = enemy.level * 10;
        enemy.pp = enemy.level * 4;

    }

    //Reiniciar "health" y "pp" de "player" a los valores originales si se cumple condición "GAME-OVER" y reiniciamos el juego:
    function restorePlayerHealth() {

        player.health = player.level * 10;
        player.pp = player.level * 4;

    }

    //Restauramos "health" y "pp " de "enemy":
    restoreEnemyHealth();
    
    //Asignamos valores al "enemyStatus":
    enemyImg.style.backgroundImage = `url(./IMG/ENEMY/${enemy.name}Enemy.gif)`
    enemyName.innerText = enemy.name
    enemyLevel.innerText = "Lv. " + enemy.level
    enemyHealth.innerText = enemy.health
    enemyPP.innerText = enemy.pp

    //Y también asignamos valores al "playerStatus":
    playerName.innerText = player.name
    playerLevel.innerText = "Lv." + player.level
    playerHealth.innerText = player.health
    playerPP.innerText = player.pp

    //Aparece el menú "FIGHT-RUN" después de 2 segundos:
    setTimeout(function () {
        fightRunOptionMenu.setAttribute("class", "emergent-menu")
    }, 2000)

}


//Función que checkea el estado de la batalla:
function checkBattleStatus() {
    if (player.health <= 0) {
        
        setTimeout(function () {     //Tras ser derrotados, 2 segundos después aparecerá la pantalla "GAME-OVER":
            
            gameOverScreen.removeAttribute("class")
            fightScreen.setAttribute("class", "hidden")
            //Audios:
            transitionFightScreenAudio.pause()
            gameOverAudio.volume = 0.08
            gameOverAudio.play()

        }, 5000)

        
        setTimeout(function () {    //y 10 segundos después (15000-5000), aparecerá nuevamente "fightScreen" con el mensaje "GAME-OVER....":
            gameOverAudio.pause()
            gameOverScreen.setAttribute("class", "hidden")    //Escondemos la pantalla "GAME-OVER"....
            fightScreen.removeAttribute("class")                //y mostramos la pantalla "fightScreen" con el siguiente mensaje:
            newMessage.innerText = "GAME OVER \n *" + enemy.name + "* te ha derrotado...\n ¿Qué quieres hacer?"
            gameOverOptionMenu.setAttribute("class", "emergent-menu")     //Se muestra el menú GAME-OVER

        }, 15000)

    } else if (enemy.health <= 0) {    //Si ganamos....

        clearTimeout(timerEnemyAttack)  //"enemy" no nos devuelve el ataque (paramos el timerID que contrla su ataque).
        
        setTimeout(function () {     //y 5 segundos después....
            
            newMessage.innerText = "Has derrotado a *" + enemy.name + "*! \n ¿Qué quieres hacer?"    //Mostramos este mensaje.
            winOptionMenu.setAttribute("class", "emergent-menu")       //Mostramos el menú "WIN"
            enemiesArr.splice(randomPokeEvent, 1)        //Y eliminamos el Pokemon que hemos derrotado del array de enemigos (para no volver a encontrarlo)
    
        }, 5000)

    }

}

//Función de ATAQUE:
function battleAttack(attackIndex) {
    
    if (player.pp >= player.attackList[attackIndex].ppMinus) {      //Sólo si el "player" tiene suficientes puntos PP puede atacar...
        player.attack(enemy, attackIndex)                           //"player" ataca a "enemy", seleccionando un ataque u otro en función del "attackButton" clicado, 
        newMessage.innerText = player.attackInfo                    //se muestra en pantalla el ataque elegido, 
        playerPP.innerText = player.pp                              //y se actualiza el valor de "playerPP" en pantalla. 
        hideAttackButtons()                                         //Se esconden los botones de ataque justo después de atacar. 
        enemy.checkHealth()                                         //Se chequea la salud del "enemy" para que nunca pueda < 0...
        enemyHealth.innerText = enemy.health                        //y se actualiza el valor la salud del "enemy" mostrado en pantalla. /////////////////////////////
       
        timerEnemyAttack = setTimeout(function () {        //Luego, pasados 5 segundos (5000 msg.) se ejecuta el ataque del "enemy":
            enemy.attackRandom(player)                     //"enemy" ataca a "player", usando un ataque random.
            newMessage.innerText = enemy.attackInfo        //se muestra en pantalla el ataque elegido,
            enemyPP.innerText = enemy.pp                   //y se actualiza el valor de "enemyPP" en pantalla. 
            player.checkHealth()                           //Se chequea la salud del "player" para que nunca pueda < 0...
            playerHealth.innerText = player.health         //y se actualiza el valor la salud del "player" mostrado en pantalla. 
            
            checkBattleStatus()                         //Al final del ataque de "enemy", se chequea el estado de la batalla para ver si alguno ha ganado. 
            
            setTimeout(function () {                    //y después de 5 segundos (lo que dura el ataque del "enemy")  

                if (player.health > 0) {                //si "player" aún sigue con vida,

                    newMessage.innerText = "Es tu turno. \n Puedes volver a atacar!!!"
                    showAttackButtons()                 //se vuelven a habilitar los botones de ataque:
                }
            }, 5000)
        }, 5000)

    } else {          //En caso de que "player" no pueda lanzar un ataque por no tener suficiente "PP":
        newMessage.innerText = "No tienes suficiente PP \n para lanzar el ataque \n *" + player.attackList[attackIndex].attackName + "*...\n Elige otro ataque!"
    }
    
    checkBattleStatus()  //Y al final de todo el ataque chequeaemos la batalla para comprobar si alguno ha ganado. 
}

//Botones "attackButtons":
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
    gameOverOptionMenu.setAttribute("class","hidden");
    restorePlayerHealth()  //iniciamos la "health" y "pp" de "player" a los valores iniciales.
})



//Encendemos pantalla "START-GAME" (Comienza el juego):
startGameScreenON()






