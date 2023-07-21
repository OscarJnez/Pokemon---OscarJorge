
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




export {Pokemon};
export {randomNum};