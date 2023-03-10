export interface IStar {
    id: number,
    x: number,
    y: number,
    z: number,
    /** The star's apparent visual magnitude */
    magnitude: number,
    officialName?: string,
    colorIndex?: number
    /** The star's distance in parsecs */
    distance: number,
    /** The star's ID in the Henry Draper catalog, if known */
    hd?: number,
    /** The star's ID in the Harvard Revised catalog, which is the same as its number in the Yale Bright Star Catalog */
    hr?: number,
}