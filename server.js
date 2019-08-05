import {parseBlacklist} from './csv_reader.js';
import Discord from 'discord.js';
import express from 'express';

const TOKEN = process.env.BOT_TOKEN;
const BLACKLIST = parseBlacklist();
const ZETA_LOGS_CHANNEL_ID = '607440887575740419';

// Necessary to ping bot to avoid downtime
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const content = msg.content.toLowerCase();
  const authorIsBot = msg.author.bot;
  const hasBlacklistedWords = BLACKLIST.some((blacklistedWord) => content.includes(blacklistedWord));
  
  if (!authorIsBot && hasBlacklistedWords) {
    client.channels.get(ZETA_LOGS_CHANNEL_ID)
      .send(`${msg.createdAt.toLocaleString()}, ${msg.content}`, {reply: msg.author})
  }
});

client.login(TOKEN);