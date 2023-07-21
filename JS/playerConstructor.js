//Función constructora de "Player":
function Player(name, obstacle) {
    let self = this;
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
    this.sprite.style.backgroundColor = "blue";

    //Atributo para rastrear colisiones:
    this.isColliding = false;

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

    // Métodos de movimiento del personaje en el eje X e Y:
    this.movePlayerX = function () {
        self.checkCollision();
        if (!self.isColliding) {
            let newX = self.x + self.speed * self.directionX;
            if (newX >= 0 && newX + self.width <= 500) {
                self.x = newX;
                self.sprite.style.left = self.x + "px";
            }
        }
    };

    this.movePlayerY = function () {
        self.checkCollision();
        if (!self.isColliding) {
            let newY = self.y + self.speed * self.directionY;
            if (newY >= 0 && newY + self.height <= 500) {
                self.y = newY;
                self.sprite.style.top = self.y + "px";
            }
        }
    };

    this.checkCollision = function () {
        // Comprueba la colisión solo si el movimiento está disponible
        if (
            self.y + self.height >= obstacle.y &&
            self.y <= obstacle.y + obstacle.height &&
            self.x + self.width >= obstacle.x &&
            self.x <= obstacle.x + obstacle.width
        ) {
            self.isColliding = true;
        } else {
            self.isColliding = false;
        }
    }
}

export { Player }