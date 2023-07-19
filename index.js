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
let randomNum

//Función constructora de Pokemon: 
function Pokemon(name, type, level) {
    this.name = name
    this.type = type
    this.level = level
    this.health = 10 * this.level
    this.strength = 5 * this.level
    this.pp = 2 * this.level
    //Elementos del Player:
    this.spritePlayer = document.getElementById("img-player")
    this.spritePlayerBackground = document.getElementById("img-player-background")
    //Elementos del Enemy:
    this.spriteEnemy = document.getElementById("img-enemy")
    this.spriteEnemyBackground = document.getElementById("img-enemy-background")

    this.basicAttack = [{
        attackName: "Llamarada",       // Todos los pokemon tienen en común el ataque genérico Placaje
        bonusDamage: 37,
        ppMinus: 5,
        attackIMG: "url(./IMG/Fuego.gif)"
    },
    {
        attackName: "Rayo",       // Todos los pokemon tienen en común el ataque genérico Placaje
        bonusDamage: 53,
        ppMinus: 20,
        attackIMG: "url(./IMG/RayoBien.gif)"
    }];

    attackButton1.innerText = this.basicAttack[0].attackName
    attackButton2.innerText
    attackButton3.innerText
    attackButton4.innerText
    //this.typeAttacks = [];

    //DEFINIMOS LOS ATAQUES DE NUESTROS POKEMON EN ARRAY DE OBJETOS
    /*
        let FireAttacks = [{
            attackName: "Bola de Fuego",
            bonusDamage: this.strength*2,
            ppMinus: this.pp - 5,
            backGroundImage: 'url(./IMG/Fuego.gif)'
        },

        {
            attackName: "LLamarada",
            bonusDamage: this.strength*3,
            ppMinus: this.pp - 10

        },

        {
            attackName: "Volcan",
            bonusDamage: this.strength*4,
            ppMinus: this.pp - 20

        }];

        let LeafAttacks = [{
            attackName: "Rayo",
            bonusDamage: this.strength*2,
            ppMinus: this.pp - 5

        },

        {
            attackName: "Lluvia de hojas",
            bonusDamage: this.strength*3,
            ppMinus: this.pp - 10

        },

        {
            attackName: "Lokura",
            bonusDamage: this.strength*4,
            ppMinus: this.pp - 20

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

*/
    this.attack1 = function (Pokemon) {
        Pokemon.health -= this.basicAttack[0].bonusDamage
        this.pp -= this.basicAttack[0].ppMinus

    }


    this.attackRandom = function (Pokemon) {
        randomNum = Math.floor(Math.random() * this.basicAttack.length)
        Pokemon.health -= this.basicAttack[randomNum].bonusDamage
        this.pp -= this.basicAttack[randomNum].ppMinus
    }

    this.attackBonus = function (Pokemon) {
        Pokemon.health -= this.strength * 2
    }

}
    let player = new Pokemon("Charmander", "Fuego", 10)
    let enemy = new Pokemon("Bulbasur", "Hoja", 20)

    // player.addAttacks();
    // enemy.addAttacks();

    console.log(player)
    console.log(enemy)

    //DOM ACCESING ELEMENTS. 
    playerName.innerText = player.name
    playerLevel.innerText = "Lv." + player.level
    playerHealth.innerText = player.health
    playerPP.innerText = "PP: " + player.pp

    enemyName.innerText = enemy.name
    enemyLevel.innerText = "Lv." + enemy.level
    enemyHealth.innerText = enemy.health

    let attackAvailable = true
    let timerEnemyAttack

    //Ataque 1: 
    attackButton1.addEventListener("click", function () {
        if (enemy.health > 0 && attackAvailable === true && player.pp > 2) {
            player.attack1(enemy)
            attackAvailable = false
            enemyBackground.style.backgroundImage = player.basicAttack[0].attackIMG
            playerBackground.style.backgroundImage = ""
            enemyHealth.innerText = enemy.health
            playerPP.innerText = "PP: " + player.pp
            messageBox.innerText = player.name + " lanza ataque \n" + "'" + player.basicAttack[0].attackName + "'" + " a " + enemy.name + "\n y le causa " + "'" + player.basicAttack[0].bonusDamage + "'" + " puntos de daño!!!"
        } else if(attackAvailable === true && player.pp > 2) {
            messageBox.innerText = "No tienes suficiente PP para lanzar\n '" + player.basicAttack[0].attackName + "'!!!"
        }
        timerEnemyAttack = setTimeout(function () {
            if (enemy.health > 0) {
                enemy.attackRandom(player)
                playerHealth.innerText = player.health
                messageBox.innerText = enemy.name + " lanza ataque \n" + "'" + enemy.basicAttack[randomNum].attackName + "'" + " a " + player.name + "\n y le causa " + "'" + player.basicAttack[randomNum].bonusDamage + "'" + " puntos de daño!!!"
                console.log(enemy.pp)
                enemyBackground.style.backgroundImage = ""
                playerBackground.style.backgroundImage = player.basicAttack[randomNum].attackIMG
                attackAvailable = true;
            } else {
                clearTimeout(timerEnemyAttack)
                messageBox.innerText = player.name + " ha matado a " + enemy.name + "!!!"
            }
        }, 3000)
    })
