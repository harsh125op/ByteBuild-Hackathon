export class Destination {
    constructor(name, attractions) {
        this.name = name;
        this.attractions = attractions
    }

    getAttractionNames() {
        let name = []
        for (let attraction of this.attractions) {
            name.push(attraction.name)
        }
        return name
    }

    getAttractionProperties(name) {
        for (let attraction of this.attractions) {
            if (attraction.name.equals(name)) {
                return attraction
            }
        }
    }
}