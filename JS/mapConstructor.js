//Constructor del MAPA:

function MapElement(elementType, ){
    this.elementType = elementType
    this.height = 30
    this.width = 30
    this.mapElementSprite = document.createElement("div")
    this.mapElementSprite.setAttribute("class", "map-element")
    this.mapElementSprite.style.width = this.width + "px"
    this.mapElementSprite.style.height = this.height + "px"
    
    this.insertMapElement = function(x, y, parent){
        this.x = x
        this.y = y
        this.parent = parent
        parent.appendChild(this.mapElementSprite)
        this.mapElementSprite.style.left = this.x + "px"
        this.mapElementSprite.style.top =  this.y + "px"
    }

    switch(this.elementType){
        case "Tree":
            this.mapElementSprite.style.backgroundImage = 'url(./IMG/MAP/tree2.png)'

    }
    
}

export {MapElement}