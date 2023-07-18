//Función constructora de Pokemon: 
function Pokemon(name, type, level) {
    this.name = name
    this.type = type
    this.level = level
    this.health = 100 //Añadir un número
    this.strength = 20  //Añadir número

    this.attack1 = function (Pokemon) {
        Pokemon.health -= this.strength
    }

    this.attackBonus = function (Pokemon){
        Pokemon.health -= this.strength*2
    }

    /*this.attack2= function(Pokemon){
        console.log(this.name + " ataca a " + Pokemon.name)
        Pokemon.health -= this.strength
    }
    this.attack3 = function(Pokemon){
        console.log(this.name + " ataca a " + Pokemon.name)
        Pokemon.health -= this.strength
    }
    this.attack4 = function(Pokemon){
        console.log(this.name + " ataca a " + Pokemon.name)
        Pokemon.health -= this.strength
    }
*/
    this.receiveDamage = function (Pokemon) {
        console.log(this.name + " ha recibido un ataque de " + Pokemon.name)

    }

}

let ataquesPlayer = {
    nombreAtaque: "Llamarada!!!",
    dañoBonus: 15,
    tipo: "Fuego"
}

let ataquesEnemy = {
    nombreAtaque: "Hoja Afilada!!!",
    dañoBonus: 12,
    tipo: "Hoja"
}

let player = new Pokemon("Charmander", "Fuego", 10)
let enemy = new Pokemon("Bulbasur", "Hoja", 20)

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
                playerBackground.style.backgroundImage = "url(./IMG/Rayo.gif)"
                attackAvailable = true;
            }
        }, 5000)
    } 
})

//Ataque Bonus:
let attackButton2 = document.getElementById("attackButton2")

attackButton2.addEventListener("click", function(){
    attackButton2.addEventListener("click", function () {
        if (enemy.health > 0 && attackAvailable === true) {
            player.attackBonus(enemy)
            attackAvailable = false
            messageBox.innerText = player.name + " ataca a " + enemy.name + "\n y le causa " + player.strength*2 + " puntos de daño!!!"
            enemyHealth.innerText = enemy.health
            enemyBackground.style.backgroundImage = "url(./IMG/Fuego.gif)"
            playerBackground.style.backgroundImage = ""
    
            timerEnemyAttack = setTimeout(function () {
                if (enemy.health <= 0) {
                    clearTimeout(timerEnemyAttack)
                    messageBox.innerText = player.name + " ha matado a " + enemy.name + "!!!"
                } else {
                    enemy.attackBonus(player)
                    playerHealth.innerText = player.health
                    messageBox.innerText = enemy.name + " ataca a " + player.name + "\n y le causa " + enemy.strength*2 + " puntos de daño!!!"
                    enemyBackground.style.backgroundImage = ""
                    playerBackground.style.backgroundImage = "url(./IMG/Rayo.gif)"
                    attackAvailable = true;
                }
            }, 1000)
    
        } 
            
    })

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
