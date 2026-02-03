const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const API_KEY = process.env.RIOT_API_KEY; // Riot API key

const REGION = "na"; // Bölge örnek, TR için "emea" olabilir
const PUUID = "kendi_puuid"; // Valorant puuid

bot.onText(/\/profile/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    // Örnek endpoint: Rank bilgisi
    const rankRes = await axios.get(`https://americas.api.riotgames.com/val/ranked/v1/entries/by-puuid/${PUUID}`, {
      headers: { "X-Riot-Token": API_KEY }
    });

    const rankData = rankRes.data[0]; // En son season
    const message = `
👤 Oyuncu: Gölge
🏆 Rank: ${rankData.currenttierpatched}
⏱️ Matchmaking rating: ${rankData.rankedRating}
🎮 Top ajan: Jett
    `;

    bot.sendMessage(chatId, message);
  } catch (err) {
    console.error(err.message);
    bot.sendMessage(chatId, "❌ Profil bilgisi alınamadı.");
  }
});

console.log("Bot ayakta");
