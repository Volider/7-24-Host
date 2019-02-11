const Discord = require('discord.js');

exports.run = function(client, message, args) {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let guild = message.guild
  let [link, ad] = args.join(" ").split(" ");
  if (!link) return message.channel.send(`Bir link yazmalısın. Doğru kullanım: **-emojioluştur <link> <isim>**`)
  if (!ad) return message.channel.send(`Bir isim yazmalısın. Doğru kullanım: **-emojioluştur <link> <isim>**`)
  
  guild.createEmoji(link, ad)
    .then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`))
    .catch(console.error);
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'emojioluştur',
  description: 'Belirttiğiniz link ve isimde emoji yükler.',
  usage: 'emojioluştur <link> - <isim>'
};