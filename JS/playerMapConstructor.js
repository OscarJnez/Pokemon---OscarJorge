import { MapElement } from "./mapConstructor.js";

//Función constructora de "Player":
function PlayerMap(name, obstacle, pokeEvents) {

    let self = this;
    this.collisionSwitch = false;
    this.name = name;
    this.height = 30;
    this.width = 30;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 5;
    this.sprite = document.createElement("div");
    this.sprite.setAttribute("id", "player");
    this.sprite.style.height = this.height + "px";
    this.sprite.style.width = this.width + "px";
    this.sprite.style.backgroundImage = "url(./IMG/MAP/playerUp.png)"
    this.sprite.style.backgroundSize = "80%";
    this.sprite.style.backgroundRepeat = "no-repeat";
    // this.sprite.style.backgroundColor = "blue";
    this.sprite.style.backgroundImage

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

        for (let i = 0; i < obstacle.length; i++) {

            if (
                self.y + self.height >= obstacle[i].y &&
                self.y <= obstacle[i].y + obstacle[i].height &&
                newX + self.width >= obstacle[i].x &&
                newX <= obstacle[i].x + obstacle[i].width) {

                return true;
            }
        }

    }

    this.checkCollisionY = function (newY) {

        for (let i = 0; i < obstacle.length; i++) {

            if (
                newY + self.height >= obstacle[i].y &&
                newY <= obstacle[i].y + obstacle[i].height &&
                self.x + self.width >= obstacle[i].x &&
                self.x <= obstacle[i].x + obstacle[i].width) {

                return true;

            }

        }

    }

    ////// Método para comprobar la colisión del "PlayerMap" con "MapElement" tipo Pokemon (EjeX):
    this.checkPokemonCollisionX = function (newX) {

        let randomNum = Math.floor(Math.random() * 50)
        console.log(self.collisionSwitch)
        if
            (randomNum === 5 &&
            self.y + self.height >= pokeEvents[0].y &&
            self.y <= pokeEvents[0].y + pokeEvents[0].height &&
            newX + self.width >= pokeEvents[0].x &&
            newX <= pokeEvents[0].x + pokeEvents[0].width) {
            self.collisionSwitchZone1 = true;
        }

        // Para hacerlo escalable podemos crear otro 'RandomNum para que se eligan los pokemon que 
        // en cada zona, de forma aleatoria. Este random num sería el 'indice' de posición en cada pokeEvents
        // En lugar de pokeEvents Generico podemos poner un tipo de evento por
        // cada Zona. Aunque tal y como lo tenemos hecho ahora, habría que pasarle un constructor 
        // nuevo con otro array de otra zona, o anidar los arrays de los tipos de zonas en el array 
        // generico 'pokeEvents'. 
        
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

export { PlayerMap }