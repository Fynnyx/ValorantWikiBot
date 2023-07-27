
function getWeaponStatTypeString(string) {

    if (!string) return { apiType: string, type: '', value: 'not set' };
    const type = string.split('::')[0];
    const value = string.split('::')[1];

    var returnObject = {
        apiType: type,
        type: '',
        value: value
    }
    switch(type) {
        case 'EEquippableCategory':
            returnObject.type = 'Category'
        case 'EWallPenetrationDisplayType':
            returnObject.type = 'Wall Penetration'
        case 'EWeaponStatsFeature':
            returnObject.type = 'Feature'
        case 'EWeaponFireModeDisplayType':
            returnObject.type = 'Fire Mode'
        case 'EWeaponAltFireDisplayType':
            returnObject.type = 'Alt Fire'
        default:
            returnObject.type = 'Unknown'
    }
    return returnObject;
} 

module.exports = {
    getWeaponStatTypeString
}