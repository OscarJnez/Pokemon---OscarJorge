//Función constructora de PLAYER:
function Player(name, type, level) {
    this.name = name
    this.type = type
    this.level = level
    this.health = this.level * 10
    this.strength = this.level * 2
    this.attacklist  //propiedad con la lista de ataques que tendrá cada Pokemon creado.
    this.pp = this.level * 2
    //DIV del Player:
    this.playerImg = document.getElementById("player-img")
    this.playerImg.style.backgroundImage = "url(../IMG/PLAYER/CharmanderGif.gif)"
    this.playerBackImg = document.getElementById("player-background-img")
    this.playerHealth = document.getElementById("player-health")

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
        attackName: "Volcán",
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

    let leafAttacks = [{
        attackName: "'Galletassso'",
        bonusDamage: this.strength,
        ppMinus: 3,
        attackImage: 'url(./IMG/OTROS/SlapPlacaje.gif)'
    }, {

        attackName: "Hoja venenosa",
        bonusDamage: this.strength * 2,
        ppMinus: 5,
        attackImage: 'url(./IMG/ENEMY/HojaVenenosa.gif)'

    },

    {
        attackName: "Agua Chirri",
        bonusDamage: this.strength * 3,
        ppMinus: 10,
        attackImage: 'url(./IMG/ENEMY/AguaChirri.webp)'

    },

    {
        attackName: "Explosión Verde",
        bonusDamage: this.strength * 4,
        ppMinus: 20,
        attackImage: 'url(./IMG/ENEMY/ExplosionVerde.gif)'
    }];

    //Función que añade los ataques a cada Pokemon dependiendo de su "type":
    this.addAttacks = function () {
        //Implementar un "switch" para poder ampliar las opciones....
        switch (this.type) {
            case "Fire":
                this.attackList = fireAttacks
                break
            case "Electric":
                this.attackList = electricAttacks
                break
            case "Leaf":
                this.attackList = leafAttacks
                break
        }
    }

    //Función para checkear la salud y no permitir que baje de 0:
    this.checkHealth = function () {
        if (this.health > 0) {
            this.health = this.health
        } else {
            this.health = 0
        }
    }

    //Función genérica de ataque del Player:
    this.attack = function (Enemy, index) {
        Enemy.health -= this.attackList[index].bonusDamage
        this.pp -= this.attackList[index].ppMinus
        Enemy.enemyBackImg.style.backgroundImage = this.attackList[index].attackImage
        setTimeout(function () {
            Enemy.enemyBackImg.style.backgroundImage = ""
        }, 3000)
        this.attackInfo = this.name + " lanza ataque *" + this.attackList[index].attackName + "* a " + Enemy.name + " y le causa -" + this.attackList[index].bonusDamage + " puntos de daño!!!"

    }


}


export { Player }