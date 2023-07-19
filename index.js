//DOM ACCESING ELEMENTS. 
let messageBox = document.getElementById("attack-message")

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

let attackButton1 = document.getElementById("attackButton1")
let attackButton2 = document.getElementById("attackButton2")
let attackButton3 = document.getElementById("attackButton3")
let attackButton4 = document.getElementById("attackButton4")
let randomNum;

//DOM ACCESING ELEMENTS. 


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
    //Elementos del Enemy:
    this.spriteEnemy = document.getElementById("img-enemy")
    this.spriteEnemyBackground = document.getElementById("img-enemy-background")

    //ATAQUE GENERICO COMPARTIDO POR TODOS LOS POKEMON. 

    // this.attackList;

    //DEFINIMOS LOS ATAQUES DE NUESTROS POKEMON EN ARRAY DE OBJETOS

    let fireAttacks = [{
        attackName: "'Galletassso'",
        bonusDamage: this.strength * 2,
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
        ppMinus: 20,
        attackImage: 'url(./IMG/PLAYER/Volcano.gif)'

    }];


    let electricAttacks = [{
        attackName: "'Galletassso'",
        bonusDamage: this.strength * 2,
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


    //DEFINIMOS LOS ATAQUES DE NUESTROS POKEMON EN ARRAY DE OBJETOS

    this.addAttacks = function () {

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

    }

    //ATAQUE ALEATORIO DEL ENEMIGO. 

    this.attackRandom = function (Pokemon) {
        randomNum = Math.floor(Math.random() * this.attackList.length)
        Pokemon.health -= this.attackList[randomNum].bonusDamage
        this.pp -= this.attackList[randomNum].ppMinus
    }


}
//-----SE CIERRA EL CONSTRUCTOR. 

let player = new Pokemon("Charmander", "Fire", 10)
let enemy = new Pokemon("Pikachu", "Electric", 20)

player.addAttacks();
enemy.addAttacks();


function checkBattle() {

    if (player.health <= 0) {

        messageBox.innerText = "Oh no! " + player.name + " \n.......ha muerto."
        attackAvailable = false;
        clearTimeout(timerEnemyAttack);
        setTimeout(function () {
            alert(enemy.name + " ha muerto!")
        }, 6000)

    }
    else if (enemy.health <= 0) {

        messageBox.innerText = "Hemos conseguido derrotar a \n" + enemy.name + ". El combate ha terminado. "
        attackAvailable = false;
        clearTimeout(timerEnemyAttack);
        setTimeout(function () {
            alert(enemy.name + " ha muerto!")
        }, 6000)

    }

}

// Cambiamos el texto de los botones por los ataques del player. 

attackButton1.innerText = player.attackList[0].attackName;
attackButton2.innerText = player.attackList[1].attackName;
attackButton3.innerText = player.attackList[2].attackName;
attackButton4.innerText = player.attackList[3].attackName;


console.log(player)
console.log(enemy)

//DOM ACCESING ACCESING TO THE SPECIFIC OBJECT. 

playerName.innerText = player.name
playerLevel.innerText = "Lv." + player.level
playerHealth.innerText = player.health
playerPP.innerText = "PP: " + player.pp

enemyName.innerText = enemy.name
enemyLevel.innerText = "Lv." + enemy.level
enemyHealth.innerText = enemy.health

let attackAvailable = true
let timerEnemyAttack;

//Ataque 1: 

attackButton1.addEventListener("click", function () {
    if (enemy.health > 0 && attackAvailable === true && player.pp >= player.attackList[0].ppMinus) {
        player.attack(enemy, 0)
        attackAvailable = false
        enemyBackground.style.backgroundImage = player.attackList[0].attackImage;
        playerBackground.style.backgroundImage = ""
        enemyHealth.innerText = enemy.health
        playerPP.innerText = "PP: " + player.pp
        messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[0].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[0].bonusDamage + "'" + " puntos de daño!!!"
        checkBattle()
    }
    else if (attackAvailable === true && player.pp < 3) {
        messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[0].attackName + "'!!!"
    }
    //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

    timerEnemyAttack = setTimeout(function () {
        if (enemy.health > 0) {
            enemy.attackRandom(player)
            playerHealth.innerText = player.health
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
        player.attack(enemy, 0)
        attackAvailable = false
        enemyBackground.style.backgroundImage = player.attackList[1].attackImage;
        playerBackground.style.backgroundImage = ""
        enemyHealth.innerText = enemy.health
        playerPP.innerText = "PP: " + player.pp
        messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[1].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[1].bonusDamage + "'" + " puntos de daño!!!"
        checkBattle()
    }
    else if (attackAvailable === true && player.pp < 3) {
        messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[1].attackName + "'!!!"
    }
    //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

    timerEnemyAttack = setTimeout(function () {
        if (enemy.health > 0) {
            enemy.attackRandom(player)
            playerHealth.innerText = player.health
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
        player.attack(enemy, 0)
        attackAvailable = false
        enemyBackground.style.backgroundImage = player.attackList[2].attackImage;
        playerBackground.style.backgroundImage = ""
        enemyHealth.innerText = enemy.health
        playerPP.innerText = "PP: " + player.pp
        messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[2].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[2].bonusDamage + "'" + " puntos de daño!!!"
        checkBattle()
    }
    else if (attackAvailable === true && player.pp < 3) {
        messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[2].attackName + "'!!!"
    }
    //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

    timerEnemyAttack = setTimeout(function () {
        if (enemy.health > 0) {
            enemy.attackRandom(player)
            playerHealth.innerText = player.health
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
        player.attack(enemy, 0)
        attackAvailable = false
        enemyBackground.style.backgroundImage = player.attackList[3].attackImage;
        playerBackground.style.backgroundImage = ""
        enemyHealth.innerText = enemy.health
        playerPP.innerText = "PP: " + player.pp
        messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.attackList[3].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.attackList[3].bonusDamage + "'" + " puntos de daño!!!"
        checkBattle()

    } else if (attackAvailable === true && player.pp < 3) {
        messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.attackList[3].attackName + "'!!!"
    }
    //TERMINA DE ATACAR EL PLAYER Y ATACA EL ENEMIGO iA.

    timerEnemyAttack = setTimeout(function () {
        if (enemy.health > 0) {
            enemy.attackRandom(player)
            playerHealth.innerText = player.health
            messageBox.innerText = enemy.name + " lanza ataque \n" + "'" + enemy.attackList[randomNum].attackName + "'" + " a " + player.name + "\n y le causa " + "'" + player.attackList[randomNum].bonusDamage + "'" + " puntos de daño!!!"
            console.log(enemy.pp)
            enemyBackground.style.backgroundImage = ""
            playerBackground.style.backgroundImage = enemy.attackList[randomNum].attackImage
            checkBattle()
            attackAvailable = true;

        }
    }, 5000)
})
