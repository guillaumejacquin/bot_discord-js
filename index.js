const Discord = require('discord.js')
const bot = new Discord.Client()
const GphApiClient = require("giphy-js-sdk-core");
const giphy = GphApiClient("fFgr63OWgA5JJnG7Xd7dd0TowZrpcykQ");

bot.on('ready', function () {
    console.log("Je suis connecté !")
})


bot.on('message', message => {
    if (message.content === 'slap') {
        giphy.search("gifs", { q: "slap" }).then(response => {
        var totalResponse = response.data.length;
        var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponse;
        var responseFinal = response.data[responseIndex];
        message.channel.send(
        {
        files: [responseFinal.images.fixed_height.url]
        }
        );
    })
    }
    if(message.content === 'ping') {
        console.log("Je recois 1 mesg")

        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var botPing = Math.round(bot.pi);

            m.edit(`**:ping_pong: Pong! Your Ping Is:-**\n  ${ping}ms`);
        });
    }
})
bot.login("NzUyMDgwMDEyNzk0MDAzNTI5.X1SbGA.ABgJnR8F5ql5X_swC00tRtiFb9s")