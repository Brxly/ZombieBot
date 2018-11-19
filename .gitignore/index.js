const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const fs = require('fs');

const PREFIX = "+";

client.login(process.env.TOKEN)
                

                      // PING //

client.on('message', message => { 
    if (message.content === PREFIX + 'ping') {
         message.channel.send('Pong ! :ping_pong:');         
    }

                          // KICK //

    if(message.content.startsWith(PREFIX + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"));
         return message.channel.send("***:x: Vous n'avez pas la permission pour kick cet utilisateur !***");

        if(message.mentions.users.size === 0) {
            return message.channel.send("***:x: Vous devez mentionnez une personne pour kick !***")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("***:x: L'utilisateur est introuvable !***")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")); {
            return message.channel.send("***:x: Je n'ai pas la permission de kick cet utilisateur !***")
        }

        kick.kick().then(member => {
            message.channel.send(`***:white_check_mark: ${member.user.username} a été kick avec succés !***`)
        });
    }

                          // BAN //

    if(message.content.startsWith(PREFIX + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")); return message.channel.send("***:x: Vous n'avez pas la permission pour ban cet utilisateur !***");

        if(message.mentions.users.size === 0) {
            return message.channel.send("***:x: Vous devez mentionnez une personne pour ban !***")
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("***:x: L'utilisateur est introuvable !***")
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("***:x: Je n'ai pas la permission de ban cet utilisateur !***")
        }

        ban.ban().then(member => {
            message.channel.send(`***:white_check_mark: ${member.user.username} a été ban avec succés !***`)
        });
    }

                      // CLEAR //

    if(message.content.startsWith(PREFIX + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("***:x: Vous n'avez pas la permission.***")

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("***:x:Tu dois préciser un nombre de message à supprimer !***")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`***:white_check_mark: ${args[0]} message ont été supprimé avec succés.***`)

        })
    }

    const réponse = JSON.parse(fs.readFileSync('./eightball.json', "utf8"));

    if (message.content.startsWith(PREFIX + "8ball")) {

        var args = message.content.split(' ').join(' ');

        if(!args) return message.channel.send("***:x: Tu dois me posez une question !***")
        
        var ball_embed = new RichEmbed()
        .setColor(0xFF0000)
        .setTitle('8ball')
        .addField('Question :', `${args}`)
        .addField('Réponse :', réponse[Math.round(Math.random() * réponse.lenght)])
        .setFooter('8ball')
        .setTimestamp()
        message.channel.send(ball_embed);       

    }

    let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(PREFIX + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("***:x: Vous n'avez mentionnée aucun utilisateur***");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("***:x: Erreur mauvais usage: "+PREFIX+"warn <user> <raison>***");
 
          }
 
        } else {
 
          message.channel.send("***:x: Erreur mauvais usage: "+PREFIX+"warn <user> <raison>***");
 
        }
 
      } else {
 
        message.channel.send("***:x: Erreur mauvais usage: "+PREFIX+"warn <user> <raison>***");
 
      }
 
    } else {
 
      message.channel.send("***:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur***");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(PREFIX +"voirwarns")||message.content === PREFIX +"voirwarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("***:x: Erreur mauvais usage: "+prefix+"seewarns <user> <raison>***");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("***:x: Erreur mauvais usage: "+prefix+"seewarns <user> <raison>***");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(PREFIX +"effacewarns")||message.content=== PREFIX + "effacewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`***:white_check_mark: Le warn de ${mentioned.tag}\': ${args[1]} a été enlevé avec succès!***`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`***:white_check_mark: Les warns de ${mentioned.tag} a été enlevé avec succès !***`);
 
            return;
 
          } else {
 
            message.channel.send("*** :x: Erreur mauvais usage: "+PREFIX+"effacewarns <utilisateur> <nombre>***");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+PREFIX+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+PREFIX+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("***:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur***");
 
    }
 
  }
                    // INVITE //

  if (message.content === PREFIX + 'invite') {
       message.channel.send('**:white_check_mark: Lien pour inviter le bot :https://discordapp.com/oauth2/authorize?client_id=512288418823405579&scope=bot&permissions=8 **');
       }

                  // SUPPORT //

  if (message.content === PREFIX + 'support') {
       message.channel.send('**:white_check_mark: Lien officiel de notre serveur: https://discord.gg/zPQWSTA**');
       }

});

           // SET ACTIVITY //

client.on('ready', () => {
    client.user.setActivity("+help | Menu d'aide ")
    console.log('I am ready!');
  });
  
             // HELP //

  client.on('message', message => {
    if (message.content === PREFIX + 'help') {
      const embed = new RichEmbed()
        .setTitle('Voici La Liste Des Commandes :')
        .addField('`+avatar`', 'Te donne ton avatar')
        .addField('`+ping`', 'Jouez ping pong avec un zombie !')
        .addField('`+support`', 'Nous vous invitons à rejoindre notre serveur !')
        .addField('`+invite`', 'Nous vous invitons à inviter notre bot dans votre serveur !')
        .addField('`+kick`', 'Kick une personne apart si vous avez la permission **KICK_MEMBER**')
        .addField('`+ban`', 'ban une personne à part si vous avez la permission **BAN_MEMBER** ')
        .addField('`+clear`', "Supprime le message avec le nombre que vous voulez supprimé a part si vous avez la permission **MANAGE_MESSAGES**")
        .addField('`+warn`', 'avertis une personne ')
        .setColor(0xFF0000)
        .setFooter('Zombie | Aide ')

      message.channel.send(embed);
    }
  });

             // MESSAGE DE BIENVENUE //

  client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'bienvenue-aurevoir');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Pseudo : ', `${member}`)
        .addField(':microphone2: | Bienvenue !', `Bienvenue dans le serveur, ${member}`)
        .addField(':id: | User :', "**" + `${member.id}` + "**")
        .addField('👤 | Tu es le membre N°', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on('guildMemberAdd', member => {

    console.log(`${member}`, "a rejoin" + `${member.guild.name}`)

});

           // MESSAGE DE BYE BYE //

client.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'bienvenue-aurevoir');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed() 
        .setColor(0xFF0000)
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Pseudo :', `${member}`)
        .addField(':wave: | Bye Bye :(',' Tu nous manque déjà ;(')
        .addField(':arrows_counterclockwise: | Le serveur est maintenant à', `${member.guild.memberCount}` + " membres...")
        .setFooter(`${member.guild.name}`)
        .setTimestamp()
        channel.sendEmbed(embed);
});

client.on('guildMemberRemove', member => {
    console.log(`${member}` + "a quitter" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});
