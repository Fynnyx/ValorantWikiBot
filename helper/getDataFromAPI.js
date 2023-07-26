const axios = require('axios'); 
const { setTimeout } = require("discord.js")
    
exports.getAgents = async () => {
    const response = await axios.get("https://valorant-api.com/v1/agents", { params: { isPlayableCharacter: true, language: "en-US" } });
    return response.data.data;
}

exports.getMaps = async () => {
    const response = await axios.get("https://valorant-api.com/v1/maps", { params: { language: "en-US" } });
    return response.data.data;
}

exports.getWeapons = async () => {
    const response = await axios.get("https://valorant-api.com/v1/weapons", { params: { language: "en-US" } });
    return response.data.data.sort((a, b) => a.shopData?.cost - b.shopData?.cost || a.displayName?.localeCompare(b.displayName));
}