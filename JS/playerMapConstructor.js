import { MapElement } from "./mapConstructor.js";

//Función constructora de "Player":
function PlayerMap(name, obstacle, pokeEvents) {

    let self = this;
    this.collisionSwitch = false;
    this.name = name;
    this.height = 22;
    this.width = 22;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 5;
    this.sprite = document.createElement("div");
    this.sprite.setAttribute("id", "player");
    this.sprite.style.height = this.height + "px";
    this.sprite.style.width = this.width + "px";
    this.sprite.style.backgroundImage = "url(./IMG/MAP/playerUp.png)"
    this.sprite.style.backgroundPosition = "center center";
    this.sprite.style.backgroundSize = "100%";
    this.sprite.style.backgroundRepeat = "no-repeat";
    this.sprite.style.backgroundImage;
    // this.sprite.style.border = "1px solid black";

    // acceso a properties del objeto Obstacle en mapGenerator. 

    this.obstaclesGenPuebloPaleta = obstacle.obstaclesGenPuebloPaleta;
    this.obstaclesEventsPuebloPaleta = obstacle.obstaclesEventsPuebloPaleta;
    this.obstaclesPokeCenterPuebloPaleta = obstacle.obstaclesPokeCenterPuebloPaleta;
    this.obstaclesSalidaPokeCenterPuebloPaleta = obstacle.obstaclesSalidaPokeCenterPuebloPaleta;
    this.obstacleEventoPokeCenterPuebloPaleta = obstacle.obstacleEventoPokeCenterPuebloPaleta; 
    
    // variables switch para activación de colisiones según pantallas.
    this.activatePPaletaCollisions = true;
    this.activatePokeCenterCollisions = false;

    // variables switch activadoras de eventos en pueblo paleta

    this.sucesoSnorlax = false;
    this.sucesoPuerta1 = false;

    // variables switch activadoras de eventos en POKECENTER de Pueblo paleta 

    this.sucesoPuerta1Exit = false;
    this.nurseCollision = false; 

    //Atributo para rastrear colisiones:

    this.movementSwitch = true;

    // Método para insertar al personaje en unas coordenadas concretas del tablero ("parent"):
    this.insertPlayer = function (x, y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        parent.appendChild(this.sprite);
        this.sprite.style.position = "absolute";
        this.sprite.style.left = this.x + "px";
        this.sprite.style.top = this.y + "px";
    };

    // Métodos de movimiento del personaje en el eje X
    this.movePlayerX = function () {
        let newX = self.x + self.speed * self.directionX;

        if (!self.checkCollisionX(newX) && newX >= 0 && newX + self.width <= 900) {
            self.x = newX;
            self.sprite.style.left = self.x + "px";
            ///////Añadimos función para comprobar colisión con Pokemon (EjeX):
            self.checkPokemonCollisionX(newX)
        }

    }

    // Métodos de movimiento del personaje en el eje Y 
    this.movePlayerY = function () {
        let newY = self.y + self.speed * self.directionY;
        if (!self.checkCollisionY(newY) && newY >= 0 && newY + self.height <= 700) {
            self.y = newY;
            self.sprite.style.top = self.y + "px";
            ///////Añadimos función para comprobar colisión con Pokemon (EjeY):
            self.checkPokemonCollisionY(newY)
        }
    }

    this.checkCollisionX = function (newX) {

        if (this.activatePPaletaCollisions === true) {

            for (let i = 0; i < self.obstaclesGenPuebloPaleta.length; i++) {

                if (
                    self.y + self.height >= self.obstaclesGenPuebloPaleta[i].y &&
                    self.y <= self.obstaclesGenPuebloPaleta[i].y + self.obstaclesGenPuebloPaleta[i].height &&
                    newX + self.width >= self.obstaclesGenPuebloPaleta[i].x &&
                    newX <= self.obstaclesGenPuebloPaleta[i].x + self.obstaclesGenPuebloPaleta[i].width) {

                    return true;
                }
                else if (

                    self.y + self.height >= self.obstaclesGenPuebloPaleta[50].y &&
                    self.y <= self.obstaclesGenPuebloPaleta[50].y + self.obstaclesGenPuebloPaleta[50].height &&
                    newX + self.width >= self.obstaclesGenPuebloPaleta[50].x &&
                    newX <= self.obstaclesGenPuebloPaleta[50].x + self.obstaclesGenPuebloPaleta[50].width) {

                    console.log("un snorlax!!!")
                    self.sucesoSnorlax = true;

                }

            }

        }

        else if (this.activatePokeCenterCollisions === true) {

            for (let i = 0; i < self.obstaclesPokeCenterPuebloPaleta.length; i++) {

                if (
                    self.y + self.height >= self.obstaclesPokeCenterPuebloPaleta[i].y &&
                    self.y <= self.obstaclesPokeCenterPuebloPaleta[i].y + self.obstaclesPokeCenterPuebloPaleta[i].height &&
                    newX + self.width >= self.obstaclesPokeCenterPuebloPaleta[i].x &&
                    newX <= self.obstaclesPokeCenterPuebloPaleta[i].x + self.obstaclesPokeCenterPuebloPaleta[i].width) {

                    console.log("colision con obstaculo por ejeX")
                    return true;
                }


            }

        }

    }

    this.checkCollisionY = function (newY) {

        // Si está activado el mapa de pueblo paleta, actiivamos sus colisiones y ... 
        if (this.activatePPaletaCollisions === true) {

            // Recorremos el array de obstaculos del mapa de pueblo paleta. 
            for (let i = 0; i < self.obstaclesGenPuebloPaleta.length; i++) {

                if (
                    newY + self.height >= self.obstaclesGenPuebloPaleta[i].y &&
                    newY <= self.obstaclesGenPuebloPaleta[i].y + self.obstaclesGenPuebloPaleta[i].height &&
                    self.x + self.width >= self.obstaclesGenPuebloPaleta[i].x &&
                    self.x <= self.obstaclesGenPuebloPaleta[i].x + self.obstaclesGenPuebloPaleta[i].width) {

                    return true;

                }
                else if (

                    newY + self.height >= self.obstaclesGenPuebloPaleta[50].y &&
                    newY <= self.obstaclesGenPuebloPaleta[50].y + self.obstaclesGenPuebloPaleta[50].height &&
                    self.x + self.width >= self.obstaclesGenPuebloPaleta[50].x &&
                    self.x <= self.obstaclesGenPuebloPaleta[50].x + self.obstaclesGenPuebloPaleta[50].width) {

                    console.log("un snorlax!!!")
                    this.sucesoSnorlax = true;

                }
                // Recorremos el array de obstaculos que desencadenan eventos del mapa de pueblo paleta. 
                // NO ESTÁ HACIENDO COLISIÓN CON LA PUERTA POKECENTER.
                else if (

                    newY + self.height >= self.obstaclesEventsPuebloPaleta[0].y &&
                    newY <= self.obstaclesEventsPuebloPaleta[0].y + self.obstaclesEventsPuebloPaleta[0].height &&
                    self.x + self.width >= self.obstaclesEventsPuebloPaleta[0].x &&
                    self.x <= self.obstaclesEventsPuebloPaleta[0].x + self.obstaclesEventsPuebloPaleta[0].width) {

                    console.log("colision con Puerta PokeCenter")
                    this.sucesoPuerta1 = true;

                }

            }

        }

        // Si está activada la pantalla del pokecenter activamos las colisiones del pokecenter
        else if (this.activatePokeCenterCollisions === true) {

            for (let i = 0; i < self.obstaclesPokeCenterPuebloPaleta.length; i++) {

                if (
                    newY + self.height >= self.obstaclesPokeCenterPuebloPaleta[i].y &&
                    newY <= self.obstaclesPokeCenterPuebloPaleta[i].y + self.obstaclesPokeCenterPuebloPaleta[i].height &&
                    self.x + self.width >= self.obstaclesPokeCenterPuebloPaleta[i].x &&
                    self.x <= self.obstaclesPokeCenterPuebloPaleta[i].x + self.obstaclesPokeCenterPuebloPaleta[i].width) {

                    return true;

                }

                else if (
                    newY + self.height >= self.obstaclesSalidaPokeCenterPuebloPaleta[0].y &&
                    newY <= self.obstaclesSalidaPokeCenterPuebloPaleta[0].y + self.obstaclesSalidaPokeCenterPuebloPaleta[0].height &&
                    self.x + self.width >= self.obstaclesSalidaPokeCenterPuebloPaleta[0].x &&
                    self.x <= self.obstaclesSalidaPokeCenterPuebloPaleta[0].x + self.obstaclesSalidaPokeCenterPuebloPaleta[0].width) {

                    console.log("colision puerta salida")
                    this.sucesoPuerta1Exit = true;

                }

                else if (

                    newY + self.height >= self.obstacleEventoPokeCenterPuebloPaleta[0].y &&
                    newY <= self.obstacleEventoPokeCenterPuebloPaleta[0].y + self.obstacleEventoPokeCenterPuebloPaleta[0].height &&
                    self.x + self.width >= self.obstacleEventoPokeCenterPuebloPaleta[0].x &&
                    self.x <= self.obstacleEventoPokeCenterPuebloPaleta[0].x + self.obstacleEventoPokeCenterPuebloPaleta[0].width) {

                    console.log("la enfermera entra en accion!")
                    this.nurseCollision = true;

                }

            }

        }
        ////// Método para comprobar la colisión del "PlayerMap" con "MapElement" tipo Pokemon (EjeX):
        this.checkPokemonCollisionX = function (newX) {

            let randomNum = Math.floor(Math.random() * 50)
            if
                (randomNum === 5 &&
                self.y + self.height >= pokeEvents[0].y &&
                self.y <= pokeEvents[0].y + pokeEvents[0].height &&
                newX + self.width >= pokeEvents[0].x &&
                newX <= pokeEvents[0].x + pokeEvents[0].width) {
                self.collisionSwitchZone1 = true;
            }

            else if
                (randomNum === 5 &&
                self.y + self.height >= pokeEvents[1].y &&
                self.y <= pokeEvents[1].y + pokeEvents[1].height &&
                newX + self.width >= pokeEvents[1].x &&
                newX <= pokeEvents[1].x + pokeEvents[1].width) {
                self.collisionSwitchZone2 = true;
            }

        }
        //////// Método para comprobar la colisión del "PlayerMap" con "MapElement" tipo Pokemon (EjeX):

        this.checkPokemonCollisionY = function (newY) {

            let randomNum = Math.floor(Math.random() * 50)
            if
                (randomNum === 5 &&
                newY + self.height >= pokeEvents[0].y &&
                newY <= pokeEvents[0].y + pokeEvents[0].height &&
                self.x + self.width >= pokeEvents[0].x &&
                self.x <= pokeEvents[0].x + pokeEvents[0].width) {

                self.collisionSwitchZone1 = true;
            }

            else if
                (randomNum === 5 &&
                newY + self.height >= pokeEvents[1].y &&
                newY <= pokeEvents[1].y + pokeEvents[1].height &&
                self.x + self.width >= pokeEvents[1].x &&
                self.x <= pokeEvents[1].x + pokeEvents[1].width) {

                self.collisionSwitchZone2 = true;
            }

        }

    }

}

export { PlayerMap }