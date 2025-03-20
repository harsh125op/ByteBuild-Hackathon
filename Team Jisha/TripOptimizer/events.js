import { get_iter, display_cards, DESTINATION, init } from "./get_data.js";

let currentAppliedFilters = []

export async function addFilter(filterName, event) {
    if (filterName in currentAppliedFilters) {
        removeFilter(filterName, element)
        return;
    }
    // element.className += ' selected-filter'
    currentAppliedFilters.push(filterName)
    await refreshPage()
}


export async function removeFilter(filterName, event) {
    if (!(filterName in currentAppliedFilters)) {
        addFilter(filterName, element)
        return;
    }
    // element.className.replace(' selected-filter', '')
    currentAppliedFilters.removeItem(filterName)
    await refreshPage()
}

export async function refreshPage() {
    console.log('Filters: ' + currentAppliedFilters)
    let all_attractions = await get_iter(DESTINATION)
    let filtered_attractions = []
    for (let attraction of all_attractions) {
        if(attraction.placeType in currentAppliedFilters) {
            filtered_attractions.push(attraction)
        }
    }
    console.log('Filtered Attrs: ' + filtered_attractions)
    display_cards(filtered_attractions)
}

export async function fetchPlaces(event) {
    console.log(event)
}

export function markFavorite(element, event, cost) {
    if (element.className.includes(' filled')) {
        unMarkFavorite(element, event)
    }
    element.className.replace(' unfilled', ' filled')
    document.getElementById('pricePerPerson').value += cost
    console.log(element.className)
    console.log(document.getElementById('pricePerPerson').value)
}

export function unMarkFavorite(element, event) {
    if (element.className.includes(' unfilled')) {
        markFavorite(element, event)
    }
    element.className.replace(' filled', ' unfilled')
    document.getElementById('pricePerPerson').value -= cost
}

document.getElementById('destination').addEventListener('change', async (event) => {
    // DESTINATION = event.target.value
    await init(event.target.value)
})