let main = document.getElementById("main-board")

//Función constructora de "Player":
function Player(name, pokemonName, height, width) {
    let self = this
    this.name = name
    this.pokemonName = pokemonName
    this.height = height
    this.width = width
    this.directionX = 0
    this.directionY = 0
    this.speed = 5
    this.sprite = document.createElement("div")
    this.sprite.setAttribute("id", "player")
    this.sprite.style.height = this.height + "px"
    this.sprite.style.width = this.width + "px"
    this.sprite.style.backgroundColor = "blue"
    //Creación de "Pikachu":
    this.spriteMini = document.createElement("div")
    this.spriteMini.setAttribute("id", "miniPlayer")
    this.spriteMini.style.height = this.height/2 + "px" //medirá la mitad del div "Player"
    this.spriteMini.style.width = this.width/2+ "px"
    this.spriteMini.style.backgroundColor = "yellow"
    
    //Método para insertar al personaje en unas coordenadas concretas del tablero ("parent"):
    this.insertPlayer = function (x, y, parent) {
        this.x = x
        this.y = y
        this.parent = parent
        parent.appendChild(this.sprite)
        parent.appendChild(this.spriteMini)
        this.sprite.style.position = "absolute";
        this.sprite.style.left = this.x + "px"
        this.sprite.style.top = this.y + "px"
        //Insertar "Pikachu":
        this.spriteMini.style.position = "absolute"
        this.spriteMini.style.left = this.x + this.width/4 + "px"  //Se clocará justo en el medio del div "Player"
        this.spriteMini.style.top = this.y + this.height/4 + "px"
        console.log(this.name + " and his pokemon '"+ this.pokemonName + "' have been inserted!!!") //añadimos su nombre al console.log
    }
    //Métodos de movimiento del personaje en el eje X e Y: 
    this.movePlayerX = function () {
        let newX = self.x + self.speed * self.directionX
        if (newX >= 0 && (newX + self.width) <= 500 ) {
            self.x = newX
            self.sprite.style.left = self.x + "px"
            //cada vez que "Player" se mueva en el ejeX, se reiniciará la posición de "Pikachu" en ejeY:
            self.spriteMini.style.top = self.y + self.height/4 + "px"
        }
        //MovimientoX de Pikachu:
        if(self.directionX > 0){
            //Su posición en ejeX será la misma de "Player" más una distancia fija, que dependerá de si el "Player" va a izqda. o dcha.:
            self.spriteMini.style.left = self.x - (self.width/2 + self.width/4) + "px"
        }else if(self.directionX < 0){
            self.spriteMini.style.left = self.x + (self.width + self.width/4) + "px"
        }
    }

    this.movePlayerY = function () {
        let newY = self.y + self.speed * self.directionY
        if (newY >= 0 && (newY + self.height) <= 500 ) {
            self.y = newY
            self.sprite.style.top = self.y + "px"
            self.spriteMini.style.left = self.x + self.width/4 + "px"
        }
        //MovimientoY de Pikachu:
        if(self.directionY > 0){
             //Su posición en ejeY será la misma de "Player" más una distancia fija, que dependerá de si el "Player" sube o baja:
            self.spriteMini.style.top = self.y - (self.height/2 + self.height/4) + "px"
        }else if(self.directionY < 0){
            self.spriteMini.style.top = self.y + (self.height + self.height/4) + "px"
        }
    }

}

let playerTimerY
let playerTimerX

//Necesario crear este boolean para evitar el delay de las teclas cuando se dejan pulsadas:
let keyIsPressed = false





//Movimiento del personaje:
let botonEjemplo = window.addEventListener("keydown", function (event) {
    console.log(event.key)
    switch (event.key) {
        case "ArrowLeft":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionX = -1
                newPlayer.sprite.style.backgroundColor = "green"
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
            }
            break
        case "ArrowRight":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionX = 1
                newPlayer.sprite.style.backgroundColor = "green"
                playerTimerX = setInterval(newPlayer.movePlayerX, 50)
            }
            break
        case "ArrowUp":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = -1
                newPlayer.sprite.style.backgroundColor = "green"
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
            }
            break
        case "ArrowDown":
            if (!keyIsPressed) {
                keyIsPressed = true
                newPlayer.directionY = 1
                newPlayer.sprite.style.backgroundColor = "green"
                playerTimerY = setInterval(newPlayer.movePlayerY, 50)
            }
            break
    }
})

window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "ArrowLeft":
            clearInterval(playerTimerX)
            newPlayer.directionX = 0
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
        case "ArrowRight":
            clearInterval(playerTimerX)
            newPlayer.directionX = 0
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
        case "ArrowUp":
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false;
            break
        case "ArrowDown":
            clearInterval(playerTimerY)
            newPlayer.directionY = 0
            newPlayer.sprite.style.backgroundColor = "blue"
            keyIsPressed = false
            break
    }
})

export {botonEjemplo} 
export {Player}