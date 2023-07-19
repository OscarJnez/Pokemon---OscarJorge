//Función constructora de Pokemon: 
function Pokemon(name, type, level) {
    this.name = name
    this.type = type
    this.level = level
    this.health = 10 * this.level
    this.strength = 5 * this.level
    this.pp = 2 * this.level

    this.basicAttack = [{
        attackName: "Placaje",       // Todos los pokemon tienen en común el ataque genérico Placaje
        type: "General",
        bonusDamage: this.strength,
        ppMinus: this.pp - 2
    }];

    this.typeAttacks = [];

    //DEFINIMOS LOS ATAQUES DE NUESTROS POKEMON EN ARRAY DE OBJETOS

    let FireAttacks = [{
        attackName: "Bola de Fuego",
        bonusDamage: this.strength,
        ppMinus: this.pp - 2

    },

    {
        attackName: "LLamarada",
        type: "",
        bonusDamage: this.strength,
        ppMinus: this.pp - 2

    },

    {
        attackName: "Volcan",
        type: "",
        bonusDamage: this.strength,
        ppMinus: this.pp - 2

    }];

    let LeafAttacks = [{
        attackName: "Rayo",
        bonusDamage: this.strength,
        ppMinus: this.pp - 2

    },

    {
        attackName: "Lluvia de hojas",
        type: "",
        bonusDamage: this.strength,
        ppMinus: this.pp - 2

    },

    {
        attackName: "Lokura",
        type: "",
        bonusDamage: this.strength,
        ppMinus: this.pp - 2

    }];

    //DEFINIMOS LOS ATAQUES DE NUESTROS POKEMON EN ARRAY DE OBJETOS


    this.addAttacks = function () {

        if (this.type = "Fire") {

            this.typeAttacks.push(FireAttacks)
        }
        else if (this.type = "Leaf") {

            this.typeAttacks.push(LeafAttacks)
        }
    }

    
    this.attack1 = function (Pokemon) {
        Pokemon.health -= this.strength
    }
    this.attackBonus = function (Pokemon) {
        Pokemon.health -= this.strength * 2
    }
    // this.receiveDamage = function (Pokemon) {
    //     console.log(this.name + " ha recibido un ataque de " + Pokemon.name)
    // }


}



let player = new Pokemon("Charmander", "Fire", 10)
let enemy = new Pokemon("Bulbasur", "Leaf", 20)

player.addAttacks();
enemy.addAttacks();

console.log(player)
console.log(enemy)


//DOM ACCESING ELEMENTS. 

let messageBox = document.getElementById("attack-message")

let playerName = document.getElementById("nombre-player")
let playerLevel = document.getElementById("nivel-player")
let playerHealth = document.getElementById("vida-player")
let playerHealthNum = document.getElementById("vida-numero")

let playerDiv = document.getElementById("img-player")
let playerBackground = document.getElementById("img-player-background")


let enemyName = document.getElementById("nombre-enemy")
let enemyLevel = document.getElementById("nivel-enemy")
let enemyHealth = document.getElementById("vida-enemy")

let enemyDiv = document.getElementById("img-enemigo")
let enemyBackground = document.getElementById("img-enemy-background")

//DOM ACCESING ELEMENTS. 


playerName.innerText = player.name
playerLevel.innerText = "Lv." + player.level
playerHealth.innerText = player.health
playerHealthNum.innerText = player.health


enemyName.innerText = enemy.name
enemyLevel.innerText = "Lv." + enemy.level
enemyHealth.innerText = enemy.health

let attackAvailable = true
let timerEnemyAttack

//Ataque 1: 
let attackButton1 = document.getElementById("attackButton1")

attackButton1.addEventListener("click", function () {
    if (enemy.health > 0 && attackAvailable === true) {
        player.attack1(enemy)
        attackAvailable = false
        messageBox.innerText = player.name + " ataca a " + enemy.name + "\n y le causa " + player.strength + " puntos de daño!!!"
        enemyHealth.innerText = enemy.health
        enemyBackground.style.backgroundImage = "url(./IMG/Fuego.gif)"
        playerBackground.style.backgroundImage = ""

        timerEnemyAttack = setTimeout(function () {
            if (enemy.health <= 0) {
                clearTimeout(timerEnemyAttack)
                messageBox.innerText = player.name + " ha matado a " + enemy.name + "!!!"
            } else {
                enemy.attack1(player)
                playerHealth.innerText = player.health
                messageBox.innerText = enemy.name + " ataca a " + player.name + "\n y le causa " + enemy.strength + " puntos de daño!!!"
                enemyBackground.style.backgroundImage = ""
                playerBackground.style.backgroundImage = "url(./IMG/RayoBien.gif)"
                attackAvailable = true;
            }
        }, 3000)
    }
})

//Ataque Bonus:
let attackButton2 = document.getElementById("attackButton2")

attackButton2.addEventListener("click", function () {
    if (enemy.health > 0 && attackAvailable === true) {
        player.attackBonus(enemy)
        attackAvailable = false
        messageBox.innerText = player.name + " ataca a " + enemy.name + "\n y le causa " + player.strength * 2 + " puntos de daño!!!"
        enemyHealth.innerText = enemy.health
        enemyBackground.style.backgroundImage = "url(./IMG/Fuego2.gif)"
        playerBackground.style.backgroundImage = ""

        timerEnemyAttack = setTimeout(function () {
            if (enemy.health <= 0) {
                clearTimeout(timerEnemyAttack)
                messageBox.innerText = player.name + " ha matado a " + enemy.name + "!!!"
            } else {
                enemy.attackBonus(player)
                playerHealth.innerText = player.health
                messageBox.innerText = enemy.name + " ataca a " + player.name + "\n y le causa " + enemy.strength * 2 + " puntos de daño!!!"
                enemyBackground.style.backgroundImage = ""
                playerBackground.style.backgroundImage = "url(./IMG/Hojas1.gif)"
                attackAvailable = true;
            }
        }, 3000)

    }

})

/*
let attackButton3 = document.getElementById("attackButton3")
attackButton3.addEventListener("click", function(){
    messageBox.innerText = "Estamos apretando el botón de ataque 3"

})
let attackButton4 = document.getElementById("attackButton4")
attackButton4.addEventListener("click", function(){
    messageBox.innerText = "Estamos apretando el botón de ataque 4"

})
*/
