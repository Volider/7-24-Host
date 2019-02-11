const Discord = require("discord.js");
var Jimp = require('jimp');

exports.run = async (client, message, args) => {
   
    
    var user = message.mentions.users.first() || message.author;

    if (!message.guild) user = message.author;
        
  
    message.channel.send(`:timer: Bu Biraz zaman alabilir / Lütfen Bekleyin.`).then(m => m.delete(1000));

Jimp.read(user.avatarURL, (err, image) => {
    image.resize(315, 310)
    Jimp.read("https://cdn.discordapp.com/attachments/540158363523219456/540901118125932544/loser.png",(err, avatar) => {
        avatar.resize(315, 310)
        image.composite(avatar, 0, 0).write(`./img/loser/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
              message.channel.send(new Discord.Attachment(`./img/loser/${client.user.id}-${user.id}.png`));
            
                   
    
           
        }, 1000);
    });

});
    
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'loser',
    description: 'Loser damgası :3',
    usage: 'loser <@kullanıcı>'
  };