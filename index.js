const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function () {
    console.log("Je suis connecté !")
})

bot.on('message', message => {
    if (message.content === 'ping') {
        // message.reply('pong !')
        message.channel.send('pong')
    }
})


bot.on('message', message => {

    if (message.content.startsWith('!play')) {
        // On récupère le premier channel audio du serveur
        let voiceChannel = message.guild.channels
            .filter(function (channel) { return channel.type === 'voice' })
            .first()
        // On récupère les arguments de la commande 
        // il faudrait utiliser une expression régulière pour valider le lien youtube
        let args = message.content.split(' ')
        // On rejoint le channel audio
        voiceChannel
            .join()
            .then(function (connection) {
                // On démarre un stream à partir de la vidéo youtube
                let stream = YoutubeStream(args[1])
                stream.on('error', function () {
                    message.reply("Je n'ai pas réussi à lire cette vidéo :(")
                    connection.disconnect()
                })
                // On envoie le stream au channel audio
                // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
                connection
                    .playStream(stream)
                    .on('end', function () {
                        connection.disconnect()
                    })
            })
    }

    bot.login("NzQ3NDc4MTU2NDc0MTg3OTA2.X0PdRw.TSjwQ2eJD2tjLlH_tMUDL7yKv0U")

