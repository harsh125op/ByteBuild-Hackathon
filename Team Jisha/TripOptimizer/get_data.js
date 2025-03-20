import {addFilter, markFavorite} from './events.js'
// import fs from

export let DESTINATION = 'Agra'

export async function get_iter(destination) {
    let res = await fetch(`http://127.0.0.1:8000/get_iternary/${destination}`, {
        "method": "GET"
    }).then(res => res.json())
    return res;
    // const data = fs.readFileSync('./python/destinations.json', 'utf8');
    // return JSON.parse(data)[destination]

    // return JSON.parse(json_data)[destination]
}

export class CardBuilder {
    
    constructor(attraction) {
        this.attraction = attraction
        this.container = document.createElement('div')
        this.container.className = 'card'
        console.log('Attr from builder: ' + attraction)
    }
 
    setBackground() {
        const image = this.attraction.thumbnail
        this.container.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`
        this.container.style.backgroundSize = 'cover'
        return this
    }

    setThumbnail() {
        const image = this.attraction.thumbnail
        
        const imageElement = document.createElement('img')
        imageElement.src = image
        this.container.appendChild(imageElement)
        return this
    }

    setContent() {
        this.rating = Number(this.attraction.rating)
        let i=0
        let rateText = document.createElement('div')
        rateText.className = 'rate-text material-symbols-outlined'
        rateText.textContent = '|'
        for (i=1; i < this.rating; i+=1) {
            rateText.textContent += "star|"
        }
        if (i < this.rating) {
            rateText.textContent += "star_half|"
        }
        rateText.textContent += ' ' + this.attraction.reviews
        let heading = document.createElement('h2')
        heading.textContent = this.attraction.name
        
        let favorite = document.createElement('span')
        favorite.className = 'favorite material-symbols-outlined unfilled'
        favorite.textContent = 'favorite'
        favorite.addEventListener('click', (event) => {
            markFavorite(favorite, event, this.attraction.estimated_cost)
        })

        let moreInfo = document.createElement('div')
        moreInfo.className = 'more-info'
        moreInfo.textContent += 'Estimated Cost: ' + this.attraction.estimated_cost

        this.container.appendChild(heading)
        this.container.appendChild(favorite)
        this.container.appendChild(rateText)
        this.container.appendChild(moreInfo)
        return this
    }

    build() {
        return this.container
    }


}

export function sort_cards(attractions) {
    return attractions.sort((a,b) => b.rating - a.rating)
}


export function display_cards(attractions) {
    attractions = sort_cards(Array(attractions).slice(0, 10))
    console.log(attractions)
    const container = document.getElementById('iternary-container')
    container.replaceChildren()
    //(attractions)=(attractions).slice()
    attractions[0].forEach(attraction => {
        console.log('Attraction: ' + attraction)
        let card = new CardBuilder(attraction)
            .setThumbnail()
            .setContent()
            .build()
        container.appendChild(card)
    });
    console.log(attractions)
}

export function display_tags(attractions) {
    const container = document.getElementById('interests-container')
    container.replaceChildren()
    let tags = []
    for (let index in attractions) {
        tags.push(attractions[index].category)
    }
    tags = new Set(tags)
    tags.forEach(tag => {
        const child = document.createElement('span')
        child.textContent = tag
        child.addEventListener('click', async (event) => {
            await addFilter(tag, event)
        })
        container.appendChild(child)
    });
} 

export async function init(destination) {
    const attractions = await get_iter(destination).then(res => res['attractions'])
    display_cards(attractions)
    display_tags(attractions)
}

init(DESTINATION)