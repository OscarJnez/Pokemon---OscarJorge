import { Pokemon } from "./pokemonConstructor.js"
import { randomNum } from "./pokemonConstructor.js"
import { MapElement } from "./mapConstructor.js"

let mapElementPARENT = document.getElementById("main")
let mapScreen

function enableMap (){
    mapScreen = document.createElement("div")
    mapScreen.setAttribute("id", "map-screen")
    mapScreen.innerHTML = 
    `

    `
    mapElementPARENT.appendChild(mapScreen)

}

function enableFightScreen(){
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
    mapElementPARENT.appendChild(fightScreen)
}

enableFightScreen()


// enableMap()
// let obstacles = []
// let arbol1 = new MapElement("Tree")
// arbol1.insertMapElement(0, 0, mapScreen)
// let arbol2 = new MapElement("Tree")
// arbol2.insertMapElement(0, 30, mapScreen)
// let arbol3 = new MapElement("Tree")
// arbol3.insertMapElement(0, 60, mapScreen)
// let arbol4 = new MapElement("Tree")
// arbol4.insertMapElement(0, 90, mapScreen)
// let arbol5 = new MapElement("Tree")
// arbol5.insertMapElement(0, 120, mapScreen)
// let arbol6 = new MapElement("Tree")
// arbol6.insertMapElement(0, 150, mapScreen)
// let arbol7 = new MapElement("Tree")
// arbol7.insertMapElement(0, 180, mapScreen)
// let arbol8 = new MapElement("Tree")
// arbol8.insertMapElement(0, 210, mapScreen)

/*
obstacles.push(arbol1,arbol2,arbol3,arbol4)
if(obstacles[i].y && obstacles[i].x)
*/


//DOM ACCESING ELEMENTS. 
let messageBox = document.getElementById("attack-message")

let playerName = document.getElementById("nombre-player")
let playerLevel = document.getElementById("nivel-player")
//let playerHealth = document.getElementById("vida-player")
let playerPP = document.getElementById("pp-player")

let playerDiv = document.getElementById("img-player")
let playerBackground = document.getElementById("img-player-background")

let enemyName = document.getElementById("nombre-enemy")
let enemyLevel = document.getElementById("nivel-enemy")
//let enemyHealth = document.getElementById("vida-enemy")

let enemyDiv = document.getElementById("img-enemy")
let enemyBackground = document.getElementById("img-enemy-background")

let attackButton1 = document.getElementById("attackButton1")
let attackButton2 = document.getElementById("attackButton2")
let attackButton3 = document.getElementById("attackButton3")
let attackButton4 = document.getElementById("attackButton4")

let player = new Pokemon("Cubone", "Fire", 30)
let enemy = new Pokemon("Pikachu", "Electric", 30)

//Opciones al inicio de la batalla:
let fightRunMenu = document.createElement("div")
fightRunMenu.setAttribute("id", "fight-run-menu")
fightRunMenu.innerHTML =
    `
<button id= "fight-button"> FIGHT </button>
<button id= "run-button"> RUN </button>
`

//Opciones al final de la batalla:
let gameOverDiv = document.createElement("div")
gameOverDiv.setAttribute("id", "game-over-div")
gameOverDiv.innerHTML =
    `
<button> EXIT GAME </button>
<button> RESTART GAME </button>
`

//Función para iniciar la batalla:
function battleStart() {
    messageBox.innerText = "Has encontrado un \n" + enemy.name + "... ¿Qué vas a hacer?"
    messageBox.appendChild(fightRunMenu)
}

//Ejecutamos la función "battleStart":
battleStart()

//Añadimos los respectivos ataques a cada Pokemon:
player.addAttacks();
enemy.addAttacks();

let enableButtons = false;

let fightButton = document.getElementById("fight-button")
fightButton.addEventListener("click", function () {
    // Cambiamos el texto de los botones por los ataques del player. 
    attackButton1.innerText = player.attackList[0].attackName;
    attackButton2.innerText = player.attackList[1].attackName;
    attackButton3.innerText = player.attackList[2].attackName;
    attackButton4.innerText = player.attackList[3].attackName;
    enableButtons = true;
})

//Función para comprobar el estado de la batalla:
function checkBattle() {
    if (player.health <= 0) {
        messageBox.innerText = "Oh no! " + player.name + " \n.......ha muerto."
        attackAvailable = false;
        clearTimeout(timerEnemyAttack);
        setTimeout(function () {
            messageBox.innerText = "GAME OVER.... \n tu Pokemon está demasiado débil \n como para seguir luchando \n ¿Qué desea hacer a continuación?"
            messageBox.appendChild(gameOverDiv)
        }, 6000)
    }
    else if (enemy.health <= 0) {
        messageBox.innerText = "Hemos conseguido derrotar a \n" + enemy.name + ". El combate ha terminado. "
        attackAvailable = false;
        clearTimeout(timerEnemyAttack);
        setTimeout(function () {
            messageBox.innerText = "Ganaste la batalla contra " + enemy.name
        }, 6000)
    }

}

console.log(player)
console.log(enemy)

//DOM ACCESING ACCESING TO THE SPECIFIC OBJECT. 
playerName.innerText = player.name
playerLevel.innerText = "Lv." + player.level
player.playerHealth.innerText = player.health
playerPP.innerText = "PP: " + player.pp

enemyName.innerText = enemy.name
enemyLevel.innerText = "Lv." + enemy.level
enemy.enemyHealth.innerText = enemy.health

let attackAvailable = true
let timerEnemyAttack;


//Ataque 1: 
attackButton1.addEventListener("click", function () {

    if (enableButtons === true) {
        if (enemy.health > 0 && attackAvailable === true && player.pp >= player.attackList[0].ppMinus) {
            player.attack(enemy, 0)
            enemy.checkEnemyHealth()
            enemyBackground.style.backgroundImage = player.attackList[0].attackImage;
            playerBackground.style.backgroundImage = ""
            playerPP.innerText = "PP: " + player.pp
            messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[0].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[0].bonusDamage + "'" + " puntos de daño!!!"
            checkBattle()
            attackAvailable = false
        }
        else if (attackAvailable === true && player.pp < 3) {
            messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[0].attackName + "'!!!"
        }
        //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

        timerEnemyAttack = setTimeout(function () {
            if (enemy.health > 0) {
                enemy.attackRandom(player)
                player.checkPlayerHealth()
                messageBox.innerText = enemy.name + " lanza ataque \n" + "'" + enemy.attackList[randomNum].attackName + "'" + " a " + player.name + "\n y le causa " + "'" + player.attackList[randomNum].bonusDamage + "'" + " puntos de daño!!!"
                console.log(enemy.pp)
                enemyBackground.style.backgroundImage = ""
                playerBackground.style.backgroundImage = enemy.attackList[randomNum].attackImage;
                checkBattle()
                attackAvailable = true;
            }
        }, 2000)

    }
})
attackButton2.addEventListener("click", function () {
    if (enableButtons === true) {
        if (enemy.health > 0 && attackAvailable === true && player.pp >= player.attackList[1].ppMinus) {
            player.attack(enemy, 1)
            enemy.checkEnemyHealth()
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
                player.checkPlayerHealth()
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
            enemy.checkEnemyHealth()
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
                player.checkPlayerHealth()
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
            enemy.checkEnemyHealth()
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
                player.checkPlayerHealth()
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

