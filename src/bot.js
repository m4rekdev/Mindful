import { Client } from 'discord.js';

const bot = new Client();

bot.on('ready', () => console.log('Ready!'));
bot.on('message', async (msg) => {
    if (msg.author.bot) return;

    await msg.reply('Hi');
});

bot.login('ODY5MjUzMjAzOTE5NzczNzA3.YP7hIQ.cceyMcSANaWSRhoKUT-ZOmkmydw');