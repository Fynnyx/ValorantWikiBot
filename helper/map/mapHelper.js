
async function filterTDMMaps(client, maps) {
    // Remove all maps whoich assetPath includes "HURM"
    maps = maps.filter(map => !map.assetPath.includes("HURM"))
    return maps
}

module.exports = {
    filterTDMMaps
}