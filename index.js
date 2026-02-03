const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Merhaba 👋 Bot çalışıyor");
});

console.log("Bot ayakta");
bot.onText(/\/market/, (msg) => {
  const chatId = msg.chat.id;

  const market = `
🛒 BUGÜNKÜ MARKET

🔫 Vandal – Reaver
🔫 Phantom – Oni
🔫 Sheriff – Ion
🔫 Spectre – Prime
  `;

  bot.sendMessage(chatId, market);
});
