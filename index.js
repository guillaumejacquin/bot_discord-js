const Discord = require('discord.js')
const bot = new Discord.Client()
const GphApiClient = require("giphy-js-sdk-core");
const giphy = GphApiClient("fFgr63OWgA5JJnG7Xd7dd0TowZrpcykQ");
const token = process.env.TOKEN;

bot.on('ready', function () {
    console.log("Je suis connecté !")
})

bot.on('message', message => {
    if (message.content == 'slap') {
        giphy.random('gifs', {tag: 'slap'})
            .then((response) => {
                message.channel.send(
                    {
                        files: [response["data"]["images"]["original"]["gif_url"]]
                    }
                )
            })
            .catch((err) => {
                message.channel.send("Error...");
            })
    }
    if(message.content === 'ping') {
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;

            m.edit(`**:ping_pong: Pong! Your Ping Is:-**\n  ${ping}ms`);
        });
    }
})

bot.login(token)
