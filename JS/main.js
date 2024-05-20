//Importamos diferentes clases:
import { Player } from "./playerFightConstructor.js"
import { Enemy } from "./enemyConstructor.js"
import { MapElement } from "./mapConstructor.js"
import { PlayerMap } from "./playerMapConstructor.js"
import { obstaclesArr } from "./mapGenerator.js"
import { pokeEvents } from "./mapGenerator.js"

//AUDIOS:
let openingAudio = new Audio("./AUDIO/originalOpening.mp3")
let pokemonIntro3 = new Audio("./AUDIO/pokemonIntro3.mp3")
let startGameAudio = new Audio("./AUDIO/pokemon-opening.mp3")
let mapScreenAudio = new Audio("./AUDIO/walkingMainAudio.mp3")
let transitionFightScreenAudio = new Audio("./AUDIO/audioTransCombat.mp3")
let chatBoxClickAudio = new Audio("./AUDIO/conversationClick.mp3")
let pokeCenterAudio = new Audio("./AUDIO/pokeCenter.mp3")
let doorOpeningSound = new Audio("./AUDIO/doorSound.mp3")
let pokemonRecoveryAudio = new Audio("./AUDIO/pokemon-recovery.mp3")

//DOM principales SCREENS:
let startGameScreen = document.getElementById("start-game-screen")
let mapScreen = document.getElementById("map-screen")
let fightScreen = document.getElementById("fight-screen")

//DOM secondary SCREENS: 

let pokeCenterScreen = document.getElementById("poke-center-screen");
let pokeCenterChatBox = document.getElementById("poke-center-chatBox");
let curarButton = document.getElementById("boton-curar-pokemon");
let salirButton = document.getElementById("boton-salir-nurse");
let textoPokeNurse = document.getElementById("texto-pokeNurse");

//DOM Elementos eventos del Mapa:
let snorlaxEvent = document.getElementById("snorlax-event")
let snorlaxMessageBox = document.getElementById("snorlax-general-messageBox")
let snorlaxMessageBoxText = document.getElementById("snorlax-messageBox-text")
let snorlaxMessageBoxButton = document.getElementById("snorlax-messageBox-exitButton")

//DOM Elementos de "startGameScreen":
let startGameButton = document.getElementById("start-game-button")
let startGameAudioButton = document.getElementById("start-game-audio-button")

//Botón play para la música de startGameScreen:
startGameAudioButton.addEventListener("click", function () {
    pokemonIntro3.volume = 0.07
    pokemonIntro3.play()
    pokemonIntro3.loop = true
    // openingAudio.play()

    // setTimeout(function () {
    //     startGameAudio.volume = 0.1;
    //     startGameAudio.play();
    //     startGameAudio.loop = true;

    // }, 61000)

    // pokemonItro2.volume = 0.07;
    // pokemonItro2.play();
    // pokemonItro2F.loop = true;

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

//Variable random que elegirá un Pokemon al azar del "enemiesArr" en la Zona1:
let randomPokeEvent;

//Creación e inserción del objeto "newPlayer" en el mapScreen:
let newPlayer = new PlayerMap("Player", obstaclesArr, pokeEvents)
newPlayer.insertPlayer(560, 670, mapScreen)

//Función que traslada a newPlayer a la posición inicial:
function initialPosition() {
    newPlayer.insertPlayer(560, 670, mapScreen)
    newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashUp.png)';  //mirando hacia arriba
}

//Funciones de curar a pokemon del jugador y pokemon enemigos: 

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

//Timer ids del movimiento del Player por el MAP:
let playerTimerY;
let playerTimerX;

///////////Movimiento animado del sprite///////////////

//lapso 0 para el primer paso // 
let playerSpriteFirstStepUp;
let playerSpriteFirstStepDown;
let playerSpriteFirstStepLeft;
let playerSpriteFirstStepRight;

// intervalo movimiento animado estandar //
let playerSpriteDirUp;
let playerSpriteDirDown;
let playerSpriteDirLeft;
let playerSpriteDirRight;

//Movimientos animados del sprite arriba
function animationUp() {

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashUp1.png)'

    }, 0)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashUp.png)'

    }, 100)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashUp2.png)'

    }, 200)


    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashUp.png)'

    }, 300)

}
function animatedMoveUp() {
    clearTimeout(playerSpriteFirstStepUp); // Limpiar timeout previo si existe
    clearInterval(playerSpriteDirUp); // Limpiar intervalo previo si existe
    playerSpriteFirstStepUp = setTimeout(animationUp, 0);
    playerSpriteDirUp = setInterval(animationUp, 300);
}

//Movimientos animados del sprite abajo
function animationDown() {

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashDown1.png)'

    }, 0)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashDown.png)'

    }, 100)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashDown2.png)'

    }, 200)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashDown.png)'

    }, 300)

}
function animatedMoveDown() {

    playerSpriteFirstStepDown = setTimeout(animationDown, 0)
    playerSpriteDirDown = setInterval(animationDown, 300)

}
//Movimientos animados del sprite izquierda
function animatedLeft() {

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashLeft1.png)'

    }, 0)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashLeft.png)'

    }, 100)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashLeft2.png)'

    }, 200)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashLeft.png)'

    }, 300)
}
function animatedMoveLeft() {

    playerSpriteFirstStepLeft = setTimeout(animatedLeft, 0);
    playerSpriteDirLeft = setInterval(animatedLeft, 300)

}
//Movimientos animados del sprite derecha
function animatedRight() {

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashRight1.png)'

    }, 0)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashRight.png)'

    }, 100)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashRight2.png)'

    }, 200)

    setTimeout(function () {

        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashRight.png)'

    }, 300)
}
function animatedMoveRight() {

    playerSpriteFirstStepRight = setTimeout(animatedRight, 0);
    playerSpriteDirRight = setInterval(animatedRight, 300)

}

//////////!Movimientos animados del sprite////////////////

//Necesario crear este boolean para evitar el delay de las teclas cuando se dejan pulsadas:
let keyIsPressed = false

//Movimiento del personaje (ArrowKeys):
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            if (!keyIsPressed) {
                animatedMoveLeft();
                keyIsPressed = true
                newPlayer.directionX = -1
                newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashLeft.png)'
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
                checkPokeEvent()
                checkGeneralEvent()
            }
            break
        case "ArrowRight":
            if (!keyIsPressed) {
                animatedMoveRight();
                keyIsPressed = true
                newPlayer.directionX = 1
                newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashRight.png)'
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
                checkPokeEvent()
                checkGeneralEvent()
            }
            break
        case "ArrowUp":
            if (!keyIsPressed) {
                animatedMoveUp();
                keyIsPressed = true
                newPlayer.directionY = -1
                newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashUp.png)'
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
                checkPokeEvent()
                checkGeneralEvent()
            }
            break
        case "ArrowDown":
            if (!keyIsPressed) {
                animatedMoveDown();
                keyIsPressed = true
                newPlayer.directionY = 1
                newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashDown.png)'
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
                checkPokeEvent()
                checkGeneralEvent()
            }
            break
    }
})

window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            clearTimeout(playerSpriteFirstStepLeft)
            clearInterval(playerSpriteDirLeft)
            clearInterval(playerTimerX)
            newPlayer.directionX = 0
            keyIsPressed = false
            break
        case "ArrowRight":
            clearTimeout(playerSpriteFirstStepRight)
            clearInterval(playerSpriteDirRight)
            clearInterval(playerTimerX)
            newPlayer.directionX = 0
            keyIsPressed = false
            break
        case "ArrowUp":
            clearTimeout(playerSpriteFirstStepUp)
            clearInterval(playerSpriteDirUp)
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
            keyIsPressed = false;
            break
        case "ArrowDown":
            clearTimeout(playerSpriteFirstStepDown)
            clearInterval(playerSpriteDirDown)
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
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

var healthBar = document.getElementById('enemy-health-bar');
var playerHealthBar = document.getElementById('player-health-bar');
let playerstatus = document.getElementById('player-status');

//Timer id para el ataque de "enemy":
let timerEnemyAttack;

//FUNCIONES:

//funciones de sonidos ambientales y de casas basicos: 

function doorSoundON() {

    doorOpeningSound.volume = 0.08
    doorOpeningSound.play();

}

function clickSound() {

    chatBoxClickAudio.volume = 0.25;
    chatBoxClickAudio.play();

}

function pokemonRecoverySound() {

    pokemonRecoveryAudio.volume = 0.12;
    pokemonRecoveryAudio.play();

}

//funciones estructurales: 
//Mostrar "startGameScreen":

function startGameScreenON() {

    document.body.style.overflow = 'hidden';
    //Audios:
    // openingAudio.pause()
    pokemonIntro3.pause()
    mapScreenAudio.pause()
    transitionFightScreenAudio.pause()

    startGameScreen.removeAttribute("class")   //elimina la clase "hidden" a startGameScreen (la muestra)
    mapScreen.setAttribute("class", "hidden")
    fightScreen.setAttribute("class", "hidden")
}

//Mostrar "mapScreen":
function mapScreenON() {
    //Audios: 
    restoreEnemyHealthBar()
    openingAudio.pause()
    pokemonIntro3.pause()
    startGameAudio.pause()
    transitionFightScreenAudio.pause()
    pokeCenterAudio.pause()
    mapScreenAudio.play()
    mapScreenAudio.volume = 0.08;
    mapScreenAudio.loop = true;

    newPlayer.activatePPaletaCollisions = true;

    newPlayer.sprite.style.height = "22px";
    newPlayer.sprite.style.width = "22px";

    startGameScreen.setAttribute("class", "hidden")
    mapScreen.removeAttribute("class")
    fightScreen.setAttribute("class", "hidden")
}

function checkGeneralEvent() {

    ///////Si hay colisión con Snorlax, nos aparece un chatBox tipo bocadillo. 
    // if (newPlayer.sucesoSnorlax === true) {

    //     snorlaxEvent.removeAttribute("class")

    //     clickSound();
    //     newPlayer.sucesoSnorlax = false

    //     setTimeout(function () {

    //         snorlaxEvent.setAttribute("class", "hidden");
    //         newPlayer.sucesoSnorlax = false

    //     }, 5000)

    //     newPlayer.sucesoSnorlax = false

    //     snorlaxMessageBox.removeAttribute("class")
    //     snorlaxMessageBoxText.innerText = "Vaya, no podemos seguir por aqui. Me pregunto donde podremos encontrar una Pokeflauta...";

    //     snorlaxMessageBoxButton.addEventListener("click", function () {

    //         snorlaxMessageBox.setAttribute("class", "hidden")
    //         newPlayer.sucesoSnorlax = false

    //     })
    //     window.addEventListener("keyup", function (event) {
    //         if (event.key === "Escape") {

    //             snorlaxMessageBox.setAttribute("class", "hidden")
    //             newPlayer.sucesoSnorlax = false

    //         }
    //     })

    // }
    ////// Acceso a pantalla de PokeCenter a través de colisión con la puerta
    if (newPlayer.sucesoPuerta1 === true) {

        doorSoundON();
        newPlayer.activatePPaletaCollisions = false;
        newPlayer.sucesoPuerta1 = false;
        mapScreenAudio.pause();
        mapScreen.setAttribute("class", "hidden");

        pokeCenterAudio.play();
        pokeCenterAudio.volume = 0.08
        pokeCenterAudio.loop = true;
        pokeCenterScreen.removeAttribute("class");
        newPlayer.insertPlayer(177, 196, pokeCenterScreen)
        newPlayer.activatePokeCenterCollisions = true;

        newPlayer.sprite.style.height = "50px";
        newPlayer.sprite.style.width = "50px";

    }
    ////// Salida del pokeCenter 
    if (newPlayer.sucesoPuerta1Exit === true) {

        console.log("funciona el método también");

        doorSoundON();
        pokeCenterScreen.setAttribute("class", "hidden");
        mapScreenON();
        newPlayer.insertPlayer(354, 380, mapScreen)
        newPlayer.sprite.style.backgroundImage = 'url(./IMG/MAP/playerSprite/ashDown.png)'
        newPlayer.sucesoPuerta1Exit = false;
        newPlayer.activatePokeCenterCollisions = false;
    }
    /////// Enfermera Pokemon
    if (newPlayer.nurseCollision === true) {

        clickSound();
        pokeCenterChatBox.removeAttribute("class")
        newPlayer.nurseCollision = false;
        textoPokeNurse.innerText = "Welcome to the PokeCenter in Pallet Town, what can I do for you?"

        curarButton.addEventListener("click", function () {

            console.log("boton de curar pulsado")
            pokeCenterAudio.pause();
            pokemonRecoverySound();
            restorePlayerHealth();
            restorePlayerHealthBar();
            newPlayer.nurseCollision = false;
            textoPokeNurse.innerText = "Please wait a few seconds..."

            setTimeout(function () {
                pokeCenterAudio.play();
                pokeCenterAudio.loop = true;
                textoPokeNurse.innerText = "Your Pokemon have been healed and are ready to battle. Come back soon!"

            }, 4000)


        })

        salirButton.addEventListener("click", function () {

            pokeCenterChatBox.setAttribute("class", "hidden")
            newPlayer.nurseCollision = false;

        })

        window.addEventListener("keyup", function (event) {
            if (event.key === "Escape") {

                pokeCenterChatBox.setAttribute("class", "hidden")
                newPlayer.nurseCollision = false;

            }
        })


    }

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
        transitionFightScreenAudio.loop = true;

        transitionScreen.removeAttribute('class')    //mostramos la pantalla de transición....
        mapScreen.setAttribute('class', 'hidden')    //ocultamos la pantalla de MAP....
        timerFightTransition = setTimeout(function () {   //y pasados 5 segundos...

            transitionScreen.setAttribute('class', 'hidden')  //ocultamos la pantalla de transición...
            enemy = enemiesArr[randomPokeEvent]               //le asignamos a la variable "enemy" el valor de un elemento al azar del array "enemiesArr"...
            combatBackGround.style.backgroundImage = "url(./IMG/OTROS/Fondo.jpeg)"  //cambiamos el fondo a Zona1 (fondo "hierba"):

            fightScreenON()  //INICIAMOS LA BATALLA CON ESE POKEMON....

            newPlayer.collisionSwitchZone1 = false  //y desactivamos el "collisionSwitchZone1" para evitar volver a colisionar al terminar la batalla.

        }, 5000)
    }

    else if (newPlayer.collisionSwitchZone2 === true && enemySquirtle.health > 0) {   //Lo mismo para la Zona2 ("waterZone")....
        //Audios:
        mapScreenAudio.pause()
        transitionFightScreenAudio.load()
        transitionFightScreenAudio.play()
        transitionFightScreenAudio.volume = 0.08;
        transitionFightScreenAudio.loop = true;

        transitionScreen.removeAttribute('class');
        mapScreen.setAttribute('class', 'hidden')
        timerFightTransition = setTimeout(function () {

            transitionScreen.setAttribute('class', 'hidden')
            enemy = enemySquirtle    //Pero aquí pelearemos únicamente con "enemySquirtle".
            combatBackGround.style.backgroundImage = "url(./IMG/OTROS/waterBackground2.png)"
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

    playerStatus.style.display = "flex"
    fightRunOptionMenu.setAttribute("class", "hidden")  //Se esconde el menú de "FIGHT-RUN"
    newMessage.innerText = "You chose " + player.name + "!"
    playerImg.removeAttribute("class")                  //Se muestra la imagen del "player" (se le elimina la clase "hidden")
    playerStatus.removeAttribute("class")               //y se muestra el "playerStatus" (se le elimina la clase "hidden")
    //y se añaden los nombres de cada ataque a los "attackButtons":
    attackButton1.innerText = player.attackList[0].attackName
    attackButton2.innerText = player.attackList[1].attackName
    attackButton3.innerText = player.attackList[2].attackName
    attackButton4.innerText = player.attackList[3].attackName

    setTimeout(function () {

        newMessage.innerText = "The battle Begins!"  //Pasados 2 segundos se meustra este mensaje...
        showAttackButtons()                             //y se muestran los "AttackButtons".
    }, 2000)

})

//Botón "RUN"...
runOptionButton.addEventListener("click", function () {

    newMessage.innerText = "You fled the battle..."       //pasados 2 segundos aparece este mensaje en pantalla...
    fightRunOptionMenu.setAttribute("class", "hidden")  //y se oculta el menú "FIGHT-RUN"
    setTimeout(
        mapScreenON, 2000)   //pasados 2 segundos mostramos "mapScreen"

})


//Mostrar "fightScreen":
function fightScreenON() {
    //Audios:
    openingAudio.pause()
    pokemonIntro3.pause()
    startGameAudio.pause()

    startGameScreen.setAttribute("class", "hidden")  //Primero, escondemos (le asignamos la clase "hidden") a las pantallas "startGameScreen" y "mapScreen" del DOM.
    mapScreen.setAttribute("class", "hidden")
    fightScreen.removeAttribute("class")            //y mostramos (quitamos clase "hidden") a la pantalla "fightScreen"

    //Primer mensaje que se ve en el div "newMessage"
    newMessage.innerText = "You found a wild " + enemy.name + "...\n ¿What should we do next?"

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


        setTimeout(function () {    //y 6 segundos después (8000-2000), aparecerá nuevamente "fightScreen" con el mensaje "GAME-OVER....":

            gameOverScreen.setAttribute("class", "hidden")    //Escondemos la pantalla "GAME-OVER"....
            fightScreen.removeAttribute("class")                //y mostramos la pantalla "fightScreen" con el siguiente mensaje:
            newMessage.innerText = "GAME OVER \n *" + enemy.name + "* has defeated you...\n ¿What should we do next?"
            gameOverOptionMenu.setAttribute("class", "emergent-menu")     //Se muestra el menú GAME-OVER

        }, 15000)

    } else if (enemy.health <= 0) {    //Si ganamos....

        clearTimeout(timerEnemyAttack)  //"enemy" no nos devuelve el ataque (paramos el timerID que contrla su ataque).

        setTimeout(function () {     //y 3 segundos después....

            newMessage.innerText = "You won the battle! \n What should we do next?"    //Mostramos este mensaje.
            winOptionMenu.setAttribute("class", "emergent-menu")       //Mostramos el menú "WIN"
            enemiesArr.splice(randomPokeEvent, 1)        //Y eliminamos el Pokemon que hemos derrotado del array de enemigos (para no volver a encontrarlo)

        }, 5000)

        // setTimeout(function () {
        //     restoreEnemyHealthBar()
        // }, 20000)

    }

}

function restoreEnemyHealthBar() {
    healthBar.style.width = '100%';
}
function restorePlayerHealthBar() {
    playerHealthBar.style.width = '100%';
}

function updateHealthBar(enemy) {
    if (enemy.health <= 0) {
        enemy.health = 0

    }
    var healthPercentage = (enemy.health / 200) * 100;
    console.log("healthPercentage: " + healthPercentage)
    healthBar.style.width = healthPercentage + '%';
}


function updateHealthBarPlayer(player) {
    if (player.health <= 0) {
        player.health = 0

    }
    var healthPercentage = (player.health / 300) * 100;
    console.log("healthPercentage: " + healthPercentage)
    playerHealthBar.style.width = healthPercentage + '%';
}


//Función de ATAQUE:
function battleAttack(attackIndex) {

    if (player.pp >= player.attackList[attackIndex].ppMinus) {      //Sólo si el "player" tiene suficientes puntos PP puede atacar...
        player.attack(enemy, attackIndex)                           //"player" ataca a "enemy", seleccionando un ataque u otro en función del "attackButton" clicado, 
        newMessage.innerText = player.attackInfo                    //se muestra en pantalla el ataque elegido, 
        playerPP.innerText = player.pp
        updateHealthBar(enemy)                                       //y se actualiza el valor de "playerPP" en pantalla. 
        hideAttackButtons()                                         //Se esconden los botones de ataque justo después de atacar. 
        enemy.checkHealth()                                         //Se chequea la salud del "enemy" para que nunca pueda < 0...
        enemyHealth.innerText = enemy.health                        //y se actualiza el valor la salud del "enemy" mostrado en pantalla. /////////////////////////////

        timerEnemyAttack = setTimeout(function () {        //Luego, pasados 3 segundos (3000 msg.) se ejecuta el ataque del "enemy":
            enemy.attackRandom(player)                     //"enemy" ataca a "player", usando un ataque random.
            newMessage.innerText = enemy.attackInfo        //se muestra en pantalla el ataque elegido,
            enemyPP.innerText = enemy.pp
            updateHealthBarPlayer(player)                   //y se actualiza el valor de "enemyPP" en pantalla. 
            player.checkHealth()                           //Se chequea la salud del "player" para que nunca pueda < 0...
            playerHealth.innerText = player.health         //y se actualiza el valor la salud del "player" mostrado en pantalla. 

            checkBattleStatus()                         //Al final del ataque de "enemy", se chequea el estado de la batalla para ver si alguno ha ganado. 

            setTimeout(function () {                    //y después de 3 segundos (lo que dura el ataque del "enemy")  

                if (player.health > 0) {                //si "player" aún sigue con vida,

                    newMessage.innerText = "It's your turn to attack."
                    showAttackButtons()                 //se vuelven a habilitar los botones de ataque:
                }
            }, 5000)
        }, 5000)

    } else {          //En caso de que "player" no pueda lanzar un ataque por no tener suficiente "PP":
        newMessage.innerText = "You havent got enough PP \n to lauch \n *" + player.attackList[attackIndex].attackName + "*...\n "
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
    gameOverOptionMenu.setAttribute("class", "hidden");
    restorePlayerHealth()  //iniciamos la "health" y "pp" de "player" a los valores iniciales.
})

//Encendemos pantalla "START-GAME" (Comienza el juego):
startGameScreenON()






