const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('guildCreate', guild => {
  const owner = guild.owner
  const mrb = guild.systemChannel
  if (!mrb) return;
  let merhaba = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setAuthor(guild.name, guild.iconURL)
  .addField('Koruma Modüllerimi Yükledim!', `Güvenlik Başlatıldı...`)
  .addField('Orcal Defender İle Sunucun Daha Güvenli!', `**${prefix}yardım** Komutuyla Bilgiler Kazanabilirsiniz!`)
  .addField('-Orcal Defender Bot-', `Created By Derpy Hooves - Developer By Rainbow Dash`)
  mrb.send(merhaba);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sik') {
    msg.delete()
    msg.reply('**Küfür Etmemelisin...**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'göt') {
    msg.delete()
    msg.reply('**Küfür Etmemelisin...**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
    msg.delete()
    msg.reply('**Küfür Etmemelisin...**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'piç') {
    msg.delete()
    msg.reply('**Küfür Etmemelisin...**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'anan') {
    msg.delete()
    msg.reply('**Küfür Etmemelisin...**');
  }
});




  client.on("message", msg => {

    const embedlul = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setDescription(":crown: " + msg.author + " Reklam Algıladı! Bunu Kes..:crown:")
    .setTitle("**Yetkililere Haber Verildi!**")

    const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yaptı!")
        .setColor(0x00AE86)
    .addField("Kullanıcının reklam mesajı:", "**" + msg.content + "**")
  

 
    if (msg.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
      if(msg.member.hasPermission('BAN_MEMBERS')){
      return;
      } else {
        msg.delete(30).then(deletedMsg => {
         deletedMsg.channel.send(embedlul)
       msg.guild.owner.send(embedlulz).catch(e => {
                console.error(e);
              });
            }).catch(e => {
              console.error(e);
            });
          };
        };
        })

  
      

      client.on('message', msg => {  
        if (msg.content.toLowerCase() === 'sa') {
           msg.react("🇦")
           msg.react("🇸")
        }
     });

     client.on("message", (message) => {
      var etiket = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
      if (etiket.some(word => message.content.includes(word))) {
          message.reply("**Çalışıyorum Merak Etme :3**");
      }
  });


   

    

client.login(ayarlar.token);