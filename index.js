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

let randomNum;

//Función constructora de Pokemon: 
function Pokemon(name, type, level) {
    this.name = name
    this.type = type
    this.level = level
    this.health = 10 * this.level
    this.strength = 2 * this.level
    this.pp = 2 * this.level
    //Elementos del Player:
    this.spritePlayer = document.getElementById("img-player")
    this.spritePlayerBackground = document.getElementById("img-player-background")
    this.playerHealth = document.getElementById("vida-player")
    //Elementos del Enemy:
    this.spriteEnemy = document.getElementById("img-enemy")
    this.spriteEnemyBackground = document.getElementById("img-enemy-background")
    this.enemyHealth = document.getElementById("vida-enemy")

    //DEFINIMOS LOS ATAQUES DE NUESTROS POKEMON EN ARRAY DE OBJETOS
    let fireAttacks = [{
        attackName: "'Galletassso'",
        bonusDamage: this.strength,
        ppMinus: 3,
        attackImage: 'url(./IMG/OTROS/SlapPlacaje.gif)'
    },
    {
        attackName: "Llamarada",
        bonusDamage: this.strength * 2,
        ppMinus: 5,
        attackImage: 'url(./IMG/PLAYER/Fuego.gif)'
    },

    {
        attackName: "Incendio",
        bonusDamage: this.strength * 3,
        ppMinus: 10,
        attackImage: 'url(./IMG/PLAYER/Fuego2.gif)'

    },

    {
        attackName: "Volcan",
        bonusDamage: this.strength * 4,
        ppMinus: 50,
        attackImage: 'url(./IMG/PLAYER/Volcano.gif)'

    }];


    let electricAttacks = [{
        attackName: "'Galletassso'",
        bonusDamage: this.strength,
        ppMinus: 3,
        attackImage: 'url(./IMG/OTROS/SlapPlacaje.gif)'
    }, {

        attackName: "Rayo",
        bonusDamage: this.strength * 2,
        ppMinus: 5,
        attackImage: 'url(./IMG/ENEMY/RayoBien.gif)'

    },

    {
        attackName: "Circulo de Rayos",
        bonusDamage: this.strength * 3,
        ppMinus: 10,
        attackImage: 'url(./IMG/ENEMY/CirculoRayos.gif)'

    },

    {
        attackName: "Tormenta de Rayos",
        bonusDamage: this.strength * 4,
        ppMinus: 20,
        attackImage: 'url(./IMG/ENEMY/TormentaNube.gif)'
    }];


    //Función que añade los ataques a cada Pokemon dependiendo de su "type":
    this.addAttacks = function () {
        //Implementar un "switch" para poder ampliar las opciones....
        if (this.type === "Fire") {
            this.attackList = fireAttacks;
        }
        else if (this.type === "Electric") {
            this.attackList = electricAttacks;
        }
    }

    // FUNCION GENERICA PARA ATACAR. 
    this.attack = function (Pokemon, index) {
        Pokemon.health -= this.attackList[index].bonusDamage
        this.pp -= this.attackList[index].ppMinus
        //Reformular este método para hacerlo más genérico y ahorrar código más abajo...
        // enemyBackground.style.backgroundImage = player.attackList[0].attackImage;
        // playerBackground.style.backgroundImage = ""
        // enemyHealth.innerText = enemy.health
        // playerPP.innerText = "PP: " + player.pp
        // messageBox.innerText = this.name + " lanza ataque \n" + "'" + this.attackList[index].attackName + "'" + " a " + Pokemon.name + "\n y le causa " + "'" + this.attackList[index].bonusDamage + "'" + " puntos de daño!!!"
        //
    }

    //ATAQUE ALEATORIO DEL ENEMIGO. 
    this.attackRandom = function (Pokemon) {
        randomNum = Math.floor(Math.random() * this.attackList.length)
        Pokemon.health -= this.attackList[randomNum].bonusDamage
        this.pp -= this.attackList[randomNum].ppMinus
    }
    //Método checkEnemyHealth:
    this.checkEnemyHealth = function () {
        if (this.health > 0) {
            this.enemyHealth.innerText = this.health
        } else {
            this.enemyHealth.innerText = 0
        }
    }
    //Método checkPlayerHealth:
    this.checkPlayerHealth = function () {
        if (this.health > 0) {
            this.playerHealth.innerText = this.health
        } else {
            this.playerHealth.innerText = 0
        }
    }
}
//-----SE CIERRA EL CONSTRUCTOR. 

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

let fightButton = document.getElementById("fight-button")
fightButton.addEventListener("click", function () {
    // Cambiamos el texto de los botones por los ataques del player. 
    attackButton1.innerText = player.attackList[0].attackName;
    attackButton2.innerText = player.attackList[1].attackName;
    attackButton3.innerText = player.attackList[2].attackName;
    attackButton4.innerText = player.attackList[3].attackName;
   
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

})

attackButton2.addEventListener("click", function () {
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
})


attackButton3.addEventListener("click", function () {
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
})


attackButton4.addEventListener("click", function () {
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
})


