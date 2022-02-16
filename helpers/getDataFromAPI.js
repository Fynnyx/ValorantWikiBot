const axios = require('axios'); 
const { setTimeout } = require("discord.js")
    
exports.getAgents = async () => {
    const response = await axios.get("https://valorant-api.com/v1/agents", { params: { isPlayableCharacter: true, language: "en-US" } });
    return response.data.data;
}