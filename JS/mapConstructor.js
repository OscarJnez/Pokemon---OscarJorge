//Constructor de ELEMENTOS DEL MAPA:
function MapElement(elementType) {
    this.elementType = elementType
    this.height = 50
    this.width = 50
    this.mapElementSprite = document.createElement("div")
    this.mapElementSprite.setAttribute("class", "map-element")
    this.mapElementSprite.style.width = this.width + "px"
    this.mapElementSprite.style.height = this.height + "px"

    this.insertMapElement = function (x, y, parent) {
        this.x = x
        this.y = y
        this.parent = parent
        parent.appendChild(this.mapElementSprite)
        this.mapElementSprite.style.left = this.x + "px"
        this.mapElementSprite.style.top = this.y + "px"

    }

    switch (this.elementType) {
        case "Tree":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/tree2.png)'
            break;

        case "PokeBank":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/pokeBank.png)'
            this.mapElementSprite.style.backgroundSize = '100%'
            this.mapElementSprite.style.height = '120px'
            this.mapElementSprite.style.width = '150px'
            // this.mapElementSprite.style.border = '3px solid black'
            break;

        case "PokeBakery":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/pokeBakery.png)'
            this.mapElementSprite.style.backgroundSize = '120%'
            this.mapElementSprite.style.height = '130px'
            this.mapElementSprite.style.width = '150px'
            // this.mapElementSprite.style.border = '3px solid black'
            break;

        case "LakeHouse":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/house.png)'
            this.mapElementSprite.style.backgroundSize = '120%'
            this.mapElementSprite.style.height = '130px'
            this.mapElementSprite.style.width = '150px'
            // this.mapElementSprite.style.border = '3px solid black'
            break;

        case "PokeLibrary":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/pokeLibrary.png)'
            this.mapElementSprite.style.backgroundSize = '120%'
            this.mapElementSprite.style.height = '130px'
            this.mapElementSprite.style.width = '150px'
            // this.mapElementSprite.style.border = '3px solid black'
            break;

        case "SideHouse":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/sideHouse.png)'
            this.mapElementSprite.style.backgroundSize = '100%'
            this.mapElementSprite.style.height = '130px'
            this.mapElementSprite.style.width = '100px'
            this.mapElementSprite.style.backgroundPosition = '20%'
            break;

        case "BackHouse":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/backHouse.png)'
            this.mapElementSprite.style.backgroundSize = '70%'
            this.mapElementSprite.style.height = '130px'
            this.mapElementSprite.style.width = '160px'
            // this.mapElementSprite.style.border = '3px solid black'
            break;

        case "Lake1":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/waterTexture.png)'
            this.mapElementSprite.style.backgroundSize = '100%';
            this.mapElementSprite.style.backgroundRepeat = 'repeat';
            this.mapElementSprite.style.height = '300px';
            this.mapElementSprite.style.width = '200px';
            this.mapElementSprite.style.borderBottom = '3px solid brown';
            this.mapElementSprite.style.borderRight = '3px solid brown';
            this.mapElementSprite.style.borderBottomLeftRadius = '7px';
            break;

        case "Lake2":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/waterTexture.png)'
            this.mapElementSprite.style.backgroundSize = '100%';
            this.mapElementSprite.style.backgroundRepeat = 'repeat';
            this.mapElementSprite.style.height = '100px';
            this.mapElementSprite.style.width = '200px';
            // this.mapElementSprite.style.borderBottom = '3px solid brown';
            this.mapElementSprite.style.borderLeft = '3px solid brown';
            // this.mapElementSprite.style.borderBottom = '5px solid brown';
            this.mapElementSprite.style.borderBottomLeftRadius = '7px';
            break;

        case "Fountain":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/fountain.gif)'
            this.mapElementSprite.style.backgroundSize = '80%';
            this.mapElementSprite.style.height = '80px';
            this.mapElementSprite.style.width = '80px';
            break;

        case "Person":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/entrenadorPokemon.png)'
            this.mapElementSprite.style.backgroundSize = '160%';
            this.mapElementSprite.style.height = '50px';
            this.mapElementSprite.style.width = '50px';
            break;

        case "Snorlax":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/snorlax.png)'
            this.mapElementSprite.style.backgroundSize = '70%';
            this.mapElementSprite.style.height = '80px';
            this.mapElementSprite.style.width = '80px';
            break;

        case "Grass":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/grass.png)'
            break;

        case "Flowers":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/flowers2.png)'
            this.mapElementSprite.style.backgroundSize = '75%';
            break;

        case "Flowers2":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/flowers2.png)'
            this.mapElementSprite.style.backgroundSize = '75%';
            this.mapElementSprite.style.transform = 'rotate(180deg)'
            break;

        case "FlowersSp":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/flowers.png)'
            this.mapElementSprite.style.transform = 'rotate(180deg)'
            break;

        case "FlowersSp2":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/flowers.png)'
            this.mapElementSprite.style.transform = 'rotate(90deg)'
            break;

        case "Rock":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/rock.png)'
            break;

        case "Rock2":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/rock2.png)'
            break;

    }

}

export { MapElement }