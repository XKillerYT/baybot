const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const Canvas = require('canvas')
const jimp = require('jimp')
const mysql = require("mysql");
const mmss = require('ms');
const client = new Discord.Client();
const ar = JSON.parse(fs.readFileSync(`AutoRole.json`, `utf8`))
const voice = JSON.parse(fs.readFileSync("./voiceState.json", "utf8"));
const temp = JSON.parse(fs.readFileSync('./temp.json', 'utf8'));
const id = JSON.parse(fs.readFileSync("./id/rank.json", "utf8"));
const pics = JSON.parse(fs.readFileSync('./pics.json' , 'utf8'));
const rc = JSON.parse(fs.readFileSync('./ReportsChannels.json' , 'utf8'));
const prefix = "="

////////////////////////////////////////////////////////////////////////////////////

const channel = new Set();
const guild = new Set();
const oldChannel = new Set();
const guildSettings = new Set();
const message = new Set();
const userId = new Set();
const points = new Set();
const msg = new Set();
const p = new Set();
const roles = new Set();

////////////////////////////////////////////////////////////////////////////////////

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});

//code

client.on('message', message => {
  var sender = message.author
 
if(!message.guild) return
  if(!ar[message.guild.id]) ar[message.guild.id] = {
  onoff: 'Off',
  role: 'Member'
  }
 
    if (message.content.toLowerCase() === prefix + "autorole") {
         
  let perms = message.member.hasPermission(`MANAGE_ROLES`)
 
  if(!perms) return message.reply(`You don't have permissions, required permission : Manage Roles.`)
 let args = message.content.split(" ").slice(1)
 if(!args.join(" ")) return message.reply(`${prefix}autorole toggle / set [ROLE NAME]`)
 let state = args[0]
 if(!state.trim().toLowerCase() == 'toggle' || !state.trim().toLowerCase() == 'setrole') return message.reply(`Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`)
   if(state.trim().toLowerCase() == 'toggle') {
    if(ar[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Autorole Is __𝐎𝐍__ !**`), ar[message.guild.id].onoff = 'On']
    if(ar[message.guild.id].onoff === 'On') return [message.channel.send(`**The Autorole Is __𝐎𝐅𝐅__ !**`), ar[message.guild.id].onoff = 'Off']
   }
  if(state.trim().toLowerCase() == 'set') {
  let newRole = message.content.split(" ").slice(2).join(" ")
  if(!newRole) return message.reply(`${prefix}autorole set [ROLE NAME]`)
    if(!message.guild.roles.find(`name`,newRole)) return message.reply(`I Cant Find This Role.`)
   ar[message.guild.id].role = newRole
    message.channel.send(`**The AutoRole Has Been Changed to ${newRole}.**`)
  }
        }
    if (message.content.toLowerCase() === prefix + "info") {
   let perms = message.member.hasPermission(`MANAGE_GUILD`)
   if(!perms) return message.reply(`You don't have permissions.`)
    var embed = new Discord.RichEmbed()
 
.addField(`Autorole : :sparkles:  `, `
State : __${ar[message.guild.id].onoff}__
Role : __${ar[message.guild.id].role}__`)
 
 
        .setColor('#000000').setColor('#36393e')
    message.channel.send({embed})
  }
 
 
    fs.writeFile("./AutoRole.json", JSON.stringify(ar), (err) => {
    if (err) console.error(err)
  });
 
 
});

client.on("message", message => {

            if (message.content.startsWith(prefix + "bc")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' '); 
  message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
 m.send(`${argresult}\n ${m}`);
})
 message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'online').size}\` : عدد الاعضاء المستلمين`); 
 message.delete(); 
};     
});


client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Desert Bot- Script By : Diamond Codes`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : Diamond Codes ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`RMS System | =help `)//حقوق دايموند كودز
client.user.setStatus("online")

});

client.on('message', message => {
  if (message.content === 'السلام عليكم') {      
    message.channel.send("وعليكـم الســلام ورحمة الله وبركاتـه")
  }
});





client.on('message', message => {
        if (message.content.toLowerCase() === prefix + "invite") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setTitle(`:small_orange_diamond: Click Here To Invite | أضغط لدعوة البوت :small_orange_diamond: `)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=497018270789140490&permissions=2080374975&scope=bot`)
     message.channel.sendEmbed(embed);
       }
   });
client.on('message', function(message) {
    if(message.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
        .setColor('#000000').setColor('#36393e')
      .setThumbnail(message.guild.iconURL)
      .setTitle(`Showing Details Of  **${message.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${message.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${message.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${message.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${message.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${message.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${message.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${message.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${message.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',message.guild.createdAt.toLocaleString())
      message.channel.send({embed:embed});
    }
  });

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help") {
     message.channel.send('**تم ارسال رسالة في الخاص**');




 message.author.sendMessage(`
 **
[❖═════ General Commands ═══════❖]
『${prefix}server / يعرض لك معلومات عن السيرفر』
『${prefix}id / يعرض لك معلومات عنك』
『${prefix}link / لمعمل انفايت ( دعوة ) لشخص』
『${prefix}inv / لدعوة البوت الى سيرفرك』
『${prefix}count / لرؤية عدد الاعضاء بالسيرفر』
『${prefix}avatar / لرؤية صورة شخص 』
『${prefix}bot / لرؤية معلومات عن البوت 』
『${prefix}user / لرؤية تاريخ انشاء حسابك ودخولك للسيرفر وعدد الدعوات 』
『${prefix}sug / لاقتراح فكرة على السيرفر』

[❖═════ Administrator Commands ═══════❖]

『${prefix}clear / لحذف الشات 』
『${prefix}mc / لقفل الشات  』
『${prefix}unmc / لفتح الشات 』
『${prefix}bc / لارسال رسالة لجميع اعضاء السيرفر 』
『${prefix}kick / لطرد شخص من الدسكورد 』
『${prefix}ban / لاعطاء شخص باند من الدسكورد 』
『${prefix}ct / لانشاء روم كتابي 』
『${prefix}cv / لانشاء روم صوتي 』
『${prefix}temp on / لتشغيل الرومات المؤقتة 』
『${prefix}temp off / لاطفاء الرومات المؤقتة 』
『${prefix}c-count / لانشاء روم يكون بعدد اعضاء السيرفر 』
『${prefix}infoMedia / لمعرفة معلومات روم الصور 』
『${prefix}setSug / لجعل روم للاقتراحات』
『${prefix}toggleMedia / لتشغيل او ايقاف روم الصور فقط 』
『${prefix}setMedia / لتحديد روم الصور  』
『${prefix}mute / لاعطاء شخص ميوت 』
『${prefix}unmute / لازالة ميوت من شخص 』
 
[❖═════ Games Commands ═══════❖]

『${prefix}لعبة صراحة / صراحة 』
『${prefix}لعبة كت تويت / كت تويت 』
『${prefix}لعبة لو خيروك / لو خيروك』
『${prefix}rps / لعبة حجرة ورقة مقص 』
『${prefix}اسئلة للعبة فورت نايت /  فورت نايت 』
『${prefix}لعبة نكت / نكت 』
『${prefix}لعبة رسم / رسم 』
『${prefix}cmind / لكتابة اي شيء تقوله داخل صورة』

[❖═════ Other ═══════❖]

『${prefix}invite / لدعوة البوت الى سيرفرك』
『${prefix}support / سيرفر المساعدة』

 **`);

    }
});

client.on('message', message => {

  if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "kick") {
               if(!message.channel.guild) return;
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(message => message.delete(5000));
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
 
  if (message.mentions.users.size < 1) return message.reply("منشن شخص");
  if(!reason) return message.reply ("اكتب سبب الطرد");
  if (!message.guild.member(user)
  .bannable) return message.reply("لايمكنني طرد شخص اعلى من رتبتي");
 
  message.guild.member(user).kick(7, user);
 
  const banembed = new Discord.RichEmbed()
  .setAuthor('Kicked !', user.displayAvatarURL)
        .setColor('#000000').setColor('#36393e')
  .setTimestamp()
  .addField("User:",  `[ + ${user.tag} + ]`)
  .addField("By:", `[  + ${message.author.tag} +  ]`)
  .addField("Reason:", `[ + ${reason} +  ]`)
  client.channels.get("492583022982463500").send({embed : banembed})
}
});
client.on('message' , message => {
    ;
    let user = message.mentions.users.first()|| client.users.get(message.content.split(' ')[1])
    if(message.content.startsWith(prefix + 'unban')) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك رتبة`**');
        if(!user) return  message.channel.send(`Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`);
        message.guild.unban(user);
        message.guild.owner.send(`لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`)
        var embed = new Discord.RichEmbed()
        .setThumbnail(message.author.avatarURl)
        .setColor('#000000').setColor('#36393e')
        .setTitle('**●Unban** !')
        .addField('**●User Unban :** ', `${user}` , true)
        .addField('**●By :**' ,       ` <@${message.author.id}> ` , true)
        .setAuthor(message.guild.name)
        message.channel.sendEmbed(embed)
    }
});

client.on('message', message => {
    let args = message.content.split(" ");
    let command = args[0];

    if(command === prefix + 'ban') {
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('انت لا تملك الصلاحيات اللازمة').then(message => {
        message.delete(3500);
        message.delete(3500);
      });

      if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply('انا لا املك الصلاحيات اللازمة. يحب توفر صلاحيات `Ban Members , Embed Links`').then(message => {
        message.delete(3500);
        message.delete(3500);
      });
      let mention = message.mentions.members.first();
      if(!mention) return message.reply('**منشن عضو لطرده**').then(message => {
        message.delete(3500);
        message.delete(3500);
      });
      if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.reply('**لا يمكنك طرد شخص رتبته اعلى منك**').then(message => {
        message.delete(3500);
        message.delete(3500);
      });
      if(mention.highestRole.positon >= message.guild.member(client.user).highestRole.positon) return message.reply('**لا يمكنني طرد شخص رتبته اعلى مني**').then(message => {
        message.delete(3500);
        message.delete(3500);
      });
      if(mention.id === message.author.id) return message.reply('**لا يمكنك طرد  نفسك**').then(message => {
        message.delete(3500);
        message.delete(3500);
      });

       let duration = args[2];
       if(!duration) return message.reply('**حدد وقت زمني لفك البان عن الشخص**').then(message => {
         message.delete(3500);
         message.delete(3500);
       });
       if(isNaN(duration)) return message.reply('**حدد وقت زمني صحيح**').then(message => {
         message.delete(3500);
         message.delete(3500);
       });

       let reason = message.content.split(" ").slice(3).join(" ");
       if(!reason) reason = 'غير محدد';

       let thisEmbed = new Discord.RichEmbed()
       .setAuthor(mention.user.username , mention.user.avatarURL)
       .setTitle('لقد تبندت من سيرفر')
       .setThumbnail(mention.avatarURL)
       .addField('# - السيرفر:',message.guild.name,true)
       .addField('# - تم طردك بواسطة',message.author,true)
       .addField('# - السبب',reason)
               .setColor('#000000').setColor('#36393e')
       .setFooter(message.author.tag,message.author.avatarURL);
       mention.send(thisEmbed).then(() => {
       mention.ban({
         reason: reason,
       });
       message.channel.send(`**:white_check_mark: ${mention.user.username} banned from the server ! :airplane: **  `)
       setTimeout(() => {
         if(duration === 0) return;
         message.guild.unban(mention);
       },duration * 60000);
     });
   }
});

client.on('message', message => {
  if(message.content.startsWith(prefix + "mc")) {
                        if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("تم تقفيل الشات ✅ ")
           });
             }
  if(message.content.startsWith(prefix + "unmc")) {
    if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("تم فتح الشات✅")
           });
             }



});

client.on('message', message => {
  if (message.content === 'discord.gg') {
   message.delete(30)
    message.reply('ممنوع النشر !!');
  }
});


client.on("message", (message) => {
  if(message.content.startsWith(prefix + "cv")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'voice');
    message.channel.sendMessage('تـم إنـشاء روم صـوتي')
    
}
});
client.on("message", (message) => {
  if(message.content.startsWith(prefix + "ct")) {
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
        let args = message.content.split(" ").slice(1);
    message.guild.createChannel(args.join(' '), 'text');
message.channel.sendMessage('تـم إنـشاء روم كـتابـي')

}
});
client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`:rose:  ولكم نورت السيرفر:rose: 
:crown:اسم العضو  ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `) 
}).catch(console.error)
})

client.on("message", message => {
              
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === prefix + "servavatar"){ 
          const embed = new Discord.RichEmbed()
  
      .setTitle(`This is  ** ${message.guild.name} **  Photo !`)
  .setAuthor(message.author.username, message.guild.iconrURL)
        .setColor('#000000').setColor('#36393e')
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
                    .setTimestamp()

   message.channel.send({embed});
      }
  });


client.on('message', message => {
    if (message.content.startsWith("-avatar")) {
        if (message.author.bot) return
        var mentionned = message.mentions.users.first();
    var omar;
      if(mentionned){
          var omar = mentionned;
      } else {
          var omar = message.author;
          
      }
        const embed = new Discord.RichEmbed()
        .setColor('#000000').setColor('#36393e')
        .setAuthor('Avatar Link :')
        .setTitle('Click Here')
        .setURL(`${omar.avatarURL}`)
        .setImage(`${omar.avatarURL}`)
        .setFooter('BayBot',client.user.avatarURL) 
      message.channel.sendEmbed(embed);
    }
});

 client.on('message', message => {
    if (message.content.startsWith("-link")) {
        message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 3600,
    }).then(invite =>
      message.channel.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor('#000000').setColor('#36393e')
          .setDescription("تم ارسال الرابط ")
           .setAuthor(client.user.username, client.user.avatarURL)
                 .setAuthor(client.user.username, client.user.avatarURL)
                .setFooter('طلب بواسطة: ' + message.author.tag)

      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor('#000000').setColor('#36393e')
        
    .setDescription("** مدة الرابط : ساعه | عدد استخدامات الرابط : 100 **")
      message.channel.sendEmbed(Embed11)
    }
});
client.on('message', message => {
  if(message.content.startsWith(prefix + "c-count")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **لا تملك الصلاحيات**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return message.reply('❌ **البوت لا يمتلك صلاحية**');
  message.guild.createChannel(`يتم تحضير الروم :[]` , 'voice').then(time => {
    time.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
  setInterval(() => {
      var currentTime = new Date(),
Year = currentTime.getFullYear(),
Month = currentTime.getMonth() + 1,
Dat = currentTime.getDate()
      time.setName(`Members : ◤ → ${client.users.size} ← ◢`);
 },1000);
  });
  }
 
});


client.on('message' , message => {
  ;
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "ping")) {
 message.channel.send('Pong...').then((message) => {
      message.edit(`\`\`\`javascript\nTime taken: ${message.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);
 })
  }  
 });

client.on('message', message => {
            if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('-1bc')){
 if (message.author.id !== '383606619671494659') return message.reply('** متقدر ( فقط لصاحب البوت ) كيلر **')
message.channel.sendMessage('** تم ارسال الرسالة **')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});
client.on('message', message => {
  if (message.content === 'السعودية') {      
    message.channel.send("🇸🇦")
  }
});

client.on('message', message => {
  if (message.content === 'مصر') {      
    message.channel.send("🇪🇬")
  }
});

client.on('message', message => {
  if (message.content === 'المغرب') {      
    message.channel.send("🇲🇦")
  }
});

client.on('message', message => {
  if (message.content === 'العراق') {      
    message.channel.send("🇮🇶")
  }
});

client.on('message', message => {
  if (message.content === 'الجزائر') {      
    message.channel.send("🇩🇿")
  }
});

client.on('message', message => {
  if (message.content === 'الامارات') {      
    message.channel.send("🇦🇪")
  }
});

client.on('message', message => {
  if (message.content === 'تونس') {      
    message.channel.send("🇹🇳")
  }
});

client.on('message', message => {
  if (message.content === 'سوريا') {      
    message.channel.send("🇸🇾")
  }
});

client.on('message', message => {
  if (message.content === 'ليبيا') {      
    message.channel.send("🇱🇾")
  }
});

client.on('message', message => {
  if (message.content === 'قطر') {      
    message.channel.send("🇶🇦")
  }
});

client.on('message', message => {
  if (message.content === 'الصومال') {      
    message.channel.send("🇸🇴")
  }
});

client.on('message', message => {
  if (message.content === 'عمان') {      
    message.channel.send("🇴🇲")
  }
});

client.on('message', message => {
  if (message.content === 'موريتانيا') {      
    message.channel.send("🇲🇷")
  }
});
client.on('message', message => {
  if (message.content === 'فلسطين') {      
    message.channel.send(":flag_ps:")
  }
});

client.on('message', message => {
 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    let args = message.content.split(" ").slice(1);
 
      if(command === "clear") {
          const emoji = client.emojis.find("name", "wastebasket")
      let textxt = args.slice(0).join("");
      if(message.member.hasPermission("MANAGE_MESSAGES")) {
      if (textxt == "") {
          message.delete().then
          message.channel.bulkDelete(1000).then(m => m.delete(3000));
  } else {
      message.delete().then
      message.delete().then
      message.channel.bulkDelete(textxt);
          message.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
          }    
      }
  }
  });

client.on("message", message => {
	;
	var args = message.content.split(' ').slice(1); 
	var message = message.content.toLowerCase();
	if( !message.guild ) return;
	if( !message.startsWith( prefix + 'role' ) ) return;
	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__ليس لديك صلاحيات__**');
	if( message.toLowerCase().startsWith( prefix + 'roleremove' ) ){
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد سحب منه الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );
		var role = message.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().removeRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البشريين رتبة**');
		} 	
	} else {
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
		var role = message.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().addRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البشريين رتبة**');
		} 
	} 
});

client.on('message', message => {
     if (message.content === (prefix + "bot")) {
         if(!message.channel.guild) return;
     let embed = new Discord.RichEmbed()
        .setColor('#000000').setColor('#36393e')
  .addField("** ✅ Servers: **" , client.guilds.size)
  .addField("** ✅ Users: **" , client.users.size)
  .addField("** ✅ Channels: **" , client.channels.size)
    .addField("** 🚀 Ping **" , Date.now() - message.createdTimestamp)
    .setTimestamp()
  message.channel.sendEmbed(embed);
    }
});

client.on('message', function(message) {
    if(message.content.startsWith(prefix + 'roll')) {
        let args = message.content.split(" ").slice(1);
        if (!args[0]) {
            message.channel.send('**حط رقم معين يتم السحب منه**');
            return;
            }
    message.channel.send(Math.floor(Math.random() * args.join(' ')));
            if (!args[0]) {
          message.edit('1')
          return;
        }
    }
});

client.on('message', message => {
     if(message.channel.type === "dm") return;
  if(message.author.bot) return;
  if(message.content.startsWith(p + "setstats")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **go play minecraft**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return message.reply('❌ **البوت لا يمتلك صلاحية**');
  var ggg= message.guild.createChannel('SERVER STATS', 'category').then(kk => {
           var ccc =message.guild.createChannel('SERVER STATS', 'voice').then(al => {
                var aa =message.guild.createChannel('SERVER STATS', 'voice').then(alp => {
                   var aaa =message.guild.createChannel('SERVER STATS', 'voice').then(alph => {
       al.setParent(kk);
       alp.setParent(kk);
       alph.setParent(kk);
       
     al.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
     alp.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
     alph.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
  setInterval(() => {
      var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
Seconds = currentTime.getSeconds(),
Year = currentTime.getFullYear(),
Month = currentTime.getMonth() + 1,
Dat = currentTime.getDate()
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
     al.setName(`Voice Online :[ ${message.guild.members.filter(m => m.voiceChannel).size} ]`);
      alp.setName(`Time :[${hours} : ${minutes} : ${Seconds} ${suffix}]`);
        alph.setName(`[ Date : [${Year} - ${Month} - ${Dat} ]`);
 },1000);
                   })
    
                })
           })
  })
           
  }
 
});


const Sra7a = [
    'صراحه  |  صوتك حلوة؟',
    'صراحه  |  التقيت الناس مع وجوهين؟',
    'صراحه  |  شيء وكنت تحقق اللسان؟',
    'صراحه  |  أنا شخص ضعيف عندما؟',
    'صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟',
    'صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟',
    'صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟',
    'صراحه  |  كيفية الكشف عن من يكمن عليك؟',
    'صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟',
    'صراحه  |  أشجع شيء حلو في حياتك؟',
    'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
    'صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟',
    'صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟',
    'صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟',
    'صراحه  |  نظرة و يفسد الصداقة؟',
    'صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟',
    'صراحه  |  شخص معك بالحلوه والمُره؟',
    'صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟',
    'صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟',
    'صراحه  |  وش تتمنى الناس تعرف عليك؟',
    'صراحه  |  ابيع المجرة عشان؟',
    'صراحه  |  أحيانا احس ان الناس ، كمل؟',
    'صراحه  |  مع مين ودك تنام اليوم؟',
    'صراحه  |  صدفة العمر الحلوة هي اني؟',
    'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
    'صراحه  |  صفة تحبها في نفسك؟',
    'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
    'صراحه  |  تصلي صلواتك الخمس كلها؟',
    'صراحه  |  ‏تجامل أحد على راحتك؟',
    'صراحه  |  اشجع شيء سويتة بحياتك؟',
    'صراحه  |  وش ناوي تسوي اليوم؟',
    'صراحه  |  وش شعورك لما تشوف المطر؟',
    'صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟',
    'صراحه  |  ما اكثر شي ندمن عليه؟',
    'صراحه  |  اي الدول تتمنى ان تزورها؟',
    'صراحه  |  متى اخر مره بكيت؟',
    'صراحه  |  تقيم حظك ؟ من عشره؟',
    'صراحه  |  هل تعتقد ان حظك سيئ؟',
    'صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟',
    'صراحه  |  كلمة تود سماعها كل يوم؟',
    'صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟',
    'صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟',
    'صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟',
    'صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟',
    '‏صراحه | هل جرحت شخص تحبه من قبل ؟',
    'صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟',
    '‏صراحه | هل تحب عائلتك ام تكرههم؟',
    '‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟',
    '‏صراحه  |  هل خجلت من نفسك من قبل؟',
    '‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟',
    '‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟',
    '‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟',
     '‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟',
    '‏صراحه  |  ماذا تختار حبيبك أم صديقك؟',
    '‏صراحه  | هل حياتك سعيدة أم حزينة؟',
    'صراحه  |  ما هي أجمل سنة عشتها بحياتك؟',
    '‏صراحه  |  ما هو عمرك الحقيقي؟',
    '‏صراحه  |  ما اكثر شي ندمن عليه؟',
    'صراحه  |  ما هي أمنياتك المُستقبلية؟‏',
]
  client.on('message', message => {
  if(message.content.startsWith(prefix + "صراحة")) {
    if(!message.channel.guild) return message.reply('** This command only for servers **');
 var client= new Discord.RichEmbed()
 .setTitle("لعبة صراحة ..")
        .setColor('#000000').setColor('#36393e')
 .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)
 .setImage("https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png")
                 .setTimestamp()
 
  message.channel.sendEmbed(client);
  message.react("??")
}
});

const cuttweet = [
     'كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟',
     'كت تويت | أكثر شيء يُسكِت الطفل برأيك؟',
     'كت تويت | الحرية لـ ... ؟',
     'كت تويت | قناة الكرتون المفضلة في طفولتك؟',
     'كت تويت ‏| كلمة للصُداع؟',
     'كت تويت ‏| ما الشيء الذي يُفارقك؟',
     'كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟',
     'كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟',
     'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
     'كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟',
     '‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟',
     'كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟',
     '‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟',
     '‏كت تويت | وش يفسد الصداقة؟',
     '‏كت تويت | شخص لاترفض له طلبا ؟',
     '‏كت تويت | كم مره خسرت شخص تحبه؟.',
     '‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟',
     '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
     '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
     '‏كت تويت |أقوى كذبة مشت عليك ؟',
     '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
     'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
     '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟',
     '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟',
     '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
     '‏كت تويت | مطلبك الوحيد الحين ؟',
     '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
]
 
 client.on('message', message => {
   if(message.content.startsWith(prefix + "كت تويت")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
        .setColor('#000000').setColor('#36393e')
   .setThumbnail(message.author.avatarURL)
 .addField('لعبه كت تويت' ,
  `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});

const secre = [
  "**لو خيروك بين العيش وحدك في جزيرة كبيرة منعزلة مع أكبر درجات الرفاهية وبين العيش في مكان قديم ولكن مع أصدقائك المقربين**.",
  "**لو خيروك بين فقدان ذاكرتك والعيش مع أصدقائك وأقربائك أو بقاء ذاكرتك ولكن العيش وحيد**.",
  "**للو خيروك بين تناول الخضار والفاكهة طوال حياتك أو تناول اللحوم**.",
  "**لو خيروك بين رؤية الأشباح فقط أو سماع صوتها فقط**.",
  "**لو خيروك بين القدرة على سماع أفكار الناس أو القدرة على العودة في الزمن للخلف**.",
  "**لو خيروك بين القدرة على الاختفاء أو القدرة على الطيران**.",
  "**لو خيروك بين أن تعيش 5 دقائق في الماضي أو أن تعيشها في المستقبل**.",
  "**لو خيروك بين 5 ملايين دولار أو 5 ملايين لحظة سعادة حقيقيةا**.",
  "**لو خيروك بين الاعتذار عن خطأ اقترفته أو أن يقدم لك شخص أخطأ في حقق اعتذار**.",
  "**لو خيروك بين الحقد أو المسامحة**.",
  "**لو خيروك بين إنقاذ نفسك أو إنقاذ شخص وقد يعرضك ذلك للأذى**.",
  "**لو خيروك بين أن تعيش في القرن الرابع عشر أو القرن الحالي**.",
  "**لو خيروك بين امتلاك سرعة الفهد أو دهاء الثعلب**.",
  "**لو خيروك بين أن تحصل على درجة كاملة في كامل اختباراتك القادمة والسابقة أو أن تسافر إلى بلد تحبه**.",
  "**لو خيروك بين العيش بجانب الجبال والحدائق والأشجار أو العيش بجانب البحر**.",
  "**لو خيروك بين تحقيق 3 أمنيات (لا تتعلق بأشخاص) أو اختيار 3 أشخاص للعيش معهم طوال حياتك**.",
  "**لو خيروك بين النوم في غابة مظلمة أو على ظهر سفينة في يوم عاصف**.",
  "**لو خيروك بين المال أو الجمال**.",
  "**لو خيروك بين المال أو الذكاء**.",
  "**لو خيروك بين المال أو الصحة**.",
  "**لو خيروك بين الجمال أو الذكاء**.",
  "**لو خيروك بين الذكاء أو الصحة**.",
  "**لو خيروك بين إرسال رسالة صوتية لأمك مدة دقيقة كاملة لا تحتوي إلا على صراخك وخوفك، أو كسر بيضة نيئة على رأسك**.",
]
 
 
 client.on('message', message => {
   if(message.content.startsWith(prefix + "لو خيروك")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
        .setColor('#000000').setColor('#36393e')
 
   .setThumbnail(message.author.avatarURL)
 .addField('لعبه لو خيروك' ,
  `${secre[Math.floor(Math.random() * secre.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});

client.on("message", function(message) {
	;
   if(message.content.startsWith(prefix + "rps")) {
    let messageArgs = message.content.split(" ").slice(1).join(" ");
    let messageRPS = message.content.split(" ").slice(2).join(" ");
    let arrayRPS = ['**# - Rock**','**# - Paper**','**# - Scissors**'];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatarURL)
    .addField("Rock","ً🥌",true)
    .addField("Paper","ً📜",true)
    .addField("Scissors","✂¸",true)
            .setColor('#000000').setColor('#36393e')
    message.channel.send(RpsEmbed).then(message => {
        message.react('🥌')
        message.react("ً📜")
        message.react("ً✂")
.then(() => message.react('ً🥌'))
.then(() =>message.react('ً📜'))
.then(() => message.react('ً✂'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === 'ً🥌·' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === 'ً📜¸' && user.id === message.author.id;
let reaction3Filter = (reaction, user) => reaction.emoji.name === 'ً✂' && user.id === message.author.id;
let reaction1 = message.createReactionCollector(reaction1Filter, { time: 12000 });
	    
let reaction2 = message.createReactionCollector(reaction2Filter, { time: 12000 });
let reaction3 = message.createReactionCollector(reaction3Filter, { time: 12000 });
reaction1.on("collect", r => {
        message.channel.send(result)
})
reaction2.on("collect", r => {
        message.channel.send(result)
})
reaction3.on("collect", r => {
        message.channel.send(result)
})

    })
}
});


      const pubg = [
        'Fortnite | ما هو اقوي سلاح برائيك ؟',
        'Fortnite | ما هي افضل منطقة تنزل بها برايك ؟',
        'Fortnite | كم عدد فوزاتك ؟',
        'Fortnite | كم هو عدد اكثر قتلات لك ؟ ',
        'Fortnite | كم عدد اصدقائك ؟ ',
        'Fortnite | كم عدد سكناتك ؟ ',
        'Fortnite | من هو افضل لاعب اجنبي حسب رايك ؟ ',
        'Fortnite | من هو افضل لاعب عربي حسب رايك ؟ ',
        'Fortnite | ما هو افضل طور حسب رايك ؟ ',
        'Fortnite | هل انت محترف ام نوب ؟ ',
        'Fortnite | ما هما افضل سلاحين مع بعض حسب رايك ؟ ',
        'Fortnite | هل تفضل السكار الصامت او ام سكس تين ازرق ؟ ',
        'Fortnite | هل تفضل البومب الازرق او الدابل بارل ؟ ',
        'Fortnite | تفضل الهانتنق او البولت اكشن ؟ ',
        'Fortnite | تفضل البولت اكشن او الهيفي سنايبر ؟ ',
        'Fortnite | تلعب على سوني او اكس بوكس او بيسي ؟ ',
        'Fortnite | تفضل تلعب دو مع راكان او ميثك ؟ ',
        'Fortnite | تفضل تلعب دو مع تيفو او نينجا ؟ ',
        'Fortnite | اذا جاتك هدية من فورت نايت 10 الاف في بوكس او حساب فيه كل السكنات تختار ايش ؟ ',
        'Fortnite | اذا فورت نايت قررت تعوضك باي عدد في بوكس كم تختار ؟ ',
 
]
   client.on('message', message => {
       if (message.author.bot) return;
if (message.content.startsWith(prefix + "فورت نايت")) {
     if(!message.channel.guild) return message.reply('** This command only for servers **');
  var client= new Discord.RichEmbed()
   .setTitle("لعبه اسئله فورت نايت")
  .setColor('#000000').setColor('#36393e')
  .setDescription(`${pubg[Math.floor(Math.random() * pubg.length)]}`)
  .setThumbnail('https://d.top4top.net/p_1083a4btc1.jpg')
                  .setTimestamp()
 
   message.channel.sendEmbed(client);
   message.react("??")
 }
});
    client.on('message', message => {
;
var cats = ["http://palestine-kitchen.ps/wp-content/uploads/2017/12/%D9%86%D9%83%D8%AA-%D8%AF%D8%A8%D8%A7%D9%86%D8%A9.png","http://www.i7lm.com/wp-content/uploads/2017/04/136769797816.jpg","https://4.bp.blogspot.com/-p62zmDIDXmI/WKzqNt9smaI/AAAAAAAAC4Q/sW_bSIB8OaQhwOYFeplc3uzz8PBN7l3YACEw/s1600/13602501135.jpg","https://www.universemagic.com/images/2016/03/7938-2-or-1457539273.jpg","https://1.bp.blogspot.com/-yFk-FzHSyE8/WR9fmPcsCUI/AAAAAAAAE6c/AmvjLadOiLY9GiCqMLHgA121bY2RS_dCwCLcB/s1600/%25D9%2586%25D9%2583%25D8%25AA%2B%25D9%2585%25D8%25B6%25D8%25AD%25D9%2583%25D8%25A9%2B1.jpg","https://l7zaat.com/wp-content/uploads/2018/02/423.jpg","https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg","http://www.shuuf.com/shof/uploads/2018/02/08/jpg/shof_97d686082bdb0a2.jpg"];
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'نكت')) {
         var cat = new Discord.RichEmbed()
.setImage(cats[Math.floor(Math.random() * cats.length)])
message.channel.sendEmbed(cat);
    }
});




client.on("message", message => {
    if (message.author.bot) return;
      if(!message.channel.guild) return;
  if (message.content.startsWith(prefix + "profile")) {
                                 let user = message.mentions.users.first();
           var men = message.mentions.users.first();
              var heg;
              if(men) {
                  heg = men
              } else {
                  heg = message.author
              }
            var mentionned = message.mentions.members.first();
               var h;
              if(mentionned) {
                  h = mentionned
              } else {
                  h = message.member
              }
              var ment = message.mentions.users.first();
              var getvalueof;
              if(ment) {
                getvalueof = ment;
              } else {
                getvalueof = message.author;
              }
     var mentionned = message.mentions.users.first();
   
      var client;
        if(mentionned){
            var client = mentionned;
        } else {
            var client = message.author;
   
        }
  if (!profile[getvalueof.id]) profile[getvalueof.id] = {points: 0,reps: "NOT YET",credits: 1, level: 1,tite: "BayBot", rep: 0, lastDaily: "NOT COLLECTED"};
              let Image = Canvas.Image,
              canvas = new Canvas(300, 300),
              ctx = canvas.getContext('2d');
              fs.readFile("profile.png", function (err, Background) { //امتداد الصورة
              if (err) return console.log(err);
              let BG = Canvas.Image;
              let ground = new Image;
              ground.src = Background;
              ctx.drawImage(ground, 0, 0, 300, 300); // حجم الصورة
   
  })
   
   
   
                  let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                  jimp.read(url, (err, ava) => {
                      if (err) return console.log(err);
                      ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                          if (err) return console.log(err);
   
                          //ur name
                          ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                          ctx.fontSize = '40px'; // عرض الخط
                          ctx.fillStyle = "#000000"; // لون الخط
                          ctx.textAlign = "center"; // محاذا ة النص
                          ctx.fillText(`${getvalueof.username}`, 153, 173) // احداثيات اسمك
   
                          //ur name
                          ctx.font = 'bold 16px kathen'; // حجم الخط و نوعه
                          ctx.fontSize = '40px'; // عرض الخط
                          ctx.fillStyle = "#f1f1f1"; // لون الخط
                          ctx.textAlign = "center"; // محاذا ة النص
                          ctx.fillText(`${getvalueof.username}`, 151, 171) // احداثيات اسمك
   
                          //credit
                          ctx.font = "bold 12px kathen" // نوع الخط وحجمه
                          ctx.fontSize = '10px'; // عرض الخط
                          ctx.fillStyle = "#f1f1f1" // لون الخط
                          ctx.textAlign = "center"; // محاذا ة النص
                          ctx.fillText(`$${profile[getvalueof.id].credits}`, 81, 159) // احداثيات المصاري
   
                          //poits
                          ctx.font = "bold 12px kathen" // ن
                          ctx.fontSize = '10px'; // عرض الخطوع الخط وحجمه
                          ctx.fillStyle = "#f1f1f1" // لون الخط
                          ctx.textAlign = "center"; // محاذا ة النص
                          ctx.fillText(`${profile[getvalueof.id].points}`, 221, 159) // احداثيات النقاط
   
                          //Level
                          ctx.font = "bold 27px kathen" // نوع الخط و حجمه
                          ctx.fontSize = '10px'; // عرض الخط
                          ctx.fillStyle = "#f1f1f1" // لون الخط
                          ctx.textAlign = "center"; // محاذا ة النص
                          ctx.fillText(`${profile[getvalueof.id].level}`, 221, 118) // احداثيات اللفل
   
                           //info
                          ctx.font = "bold 12px kathen" // ن
                          ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                          ctx.fillStyle = "#000000" // لون الخط
                          ctx.textAlign = "center"; // محاذا ة النص
                          ctx.fillText(`${profile[getvalueof.id].tite}`, 150, 199) // احداثيات النقاط
   
                          //info
                          ctx.font = "bold 12px kathen" // ن
                          ctx.fontSize = '15px'; // عرض الخطوع الخط وحجمه
                          ctx.fillStyle = "#f1f1f1" // لون الخط
                          ctx.textAlign = "center"; // محاذا ة النص
                          ctx.fillText(`${profile[getvalueof.id].tite}`, 150, 197) // احداثيات النقاط
   
                          // REP
                          ctx.font = "bold 26px  kathen";
                          ctx.fontSize = "50px";
                          ctx.fillStyle = "#f1f1f1";
                          ctx.textAlign = "center";
                          ctx.fillText(`+${profile[getvalueof.id].rep}`, 80,117)
   
                          let Avatar = Canvas.Image;
                          let ava = new Avatar;
   
  ava.src = buf;
                          ctx.beginPath();
                          ctx.arc(75, 100, 780, 0, Math.PI*2, true);
                          ctx.closePath();
                          ctx.clip();
                          ctx.drawImage(ava, 116, 82, 72, 72);
   
  message.channel.startTyping()
  message.channel.sendFile(canvas.toBuffer())
  message.channel.stopTyping()
  })
  })
  }
  });

var con = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "ebrahim.2007", //باس وورد الما سكل حق
  database: 'baybot' 
});

con.connect(e => {
  if(e) return console.log(e);
  console.log(`First SQL is Running`);
});
client.on('message', message =>{
  if(message.author.bot) return

let xpadd = Math.floor(Math.random() * (30 - 20 + 1));

  con.query(`SELECT * FROM users_data WHERE userID = '${message.author.id}'
  ORDER BY userXP`, (err , rows)=>{
    if(err) return console.log(err);

    if(!rows || !rows[0] || rows.length < 1){
      con.query(`INSERT INTO users_data (userID , userXP) VALUES ('${message.author.id}', ${0})`);
      console.log(`VALUES add to ${message.author.tag}`);
    } else {
      con.query(`UPDATE users_data SET userXP = ${Math.floor(rows[0].userXP + xpadd)} WHERE userID = '${message.author.id}'`); 
    };
  
  })

});
 
client.on('message', message => {
if(message.author.bot) return;
if (message.channel.guild) {
if (message.content === '-myV') {
message.channel.send(`Your XP : ${voice[message.member.id].xp}
Your Level : ${voice[message.member.id].level}`);
      fs.writeFile('./voiceState.json', JSON.stringify(voice, null, 4), (e) => {
        if(e) console.log(e);
      });
}}});


 

client.on('message', message => {
     let command = message.content.split(" ")[0];
   command = command.slice(prefix.length);
 
   let args = message.content.split(" ").slice(1);
 
 
 if(command == "رسم") {
     var Canvas = require('canvas')
   , Image = new Canvas.Image
   , canvas = new Canvas(450, 170)
   , ctx = canvas.getContext('2d');
   ctx.font = '30px Impact';
   let args = message.content.split(" ").slice(1);
   
 Image.src = canvas.toBuffer();
 
     console.log(Image);
 ctx.drawImage(Image, 0, 0, Image.width / 470, Image.height / 170);
 ctx.fillText(args.join("  "),110, 70);
 
 
 ctx.beginPath();
 ctx.lineTo(50, 102);
 ctx.stroke();
 
 message.channel.sendFile(canvas.toBuffer());
 }
 
 });



client.on("message",(message) => {
    if (message.channel.type !== "text") return;
    if (!message.content.startsWith(prefix)) return;
        if(message.content.startsWith(prefix + "temp on")) {
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("** You Don't Have Permission `Manage channels` To Do This Command");
            temp[message.guild.id] = {
                work : true,
                channel : "Not Yet"
            };
            message.guild.createChannel("اضغط لصنع روم مؤقت", 'voice').then(c => {
                c.setPosition(1);
                temp[message.guild.id].channel = c.id
                message.channel.send("** Done.**");
            });
        if(message.content.startsWith(prefix + "temp off")) {
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("** You Don't Have Permission `Manage channels` To Do This Command");
        message.guild.channels.get(temp[message.guild.id]).delete();
            temp[message.guild.id] = {
                work : false,
                channel : "Not Yet"
            };
        message.channel.send("** Done.**");
    };
}})
client.on("voiceStateUpdate", (o,n) => {
    if (!temp[n.guild.id]) return;
    if (temp[n.guild.id].work == false) return;
    if (n.voiceChannelID == temp[n.guild.id].channel) {
        n.guild.createChannel(n.user.username, 'voice').then(c => {
            n.setVoiceChannel(c);
            c.overwritePermissions(n.user.id, {
                CONNECT:true,
                SPEAK:true,
                MANAGE_CHANNEL:true,
                MUTE_MEMBERS:true,
                DEAFEN_MEMBERS:true,
                MOVE_MEMBERS:true,
                VIEW_CHANNEL:true  
            });
        })
    };
    if (!o.voiceChannel) return;
    if (o.voiceChannel.name == o.user.username) {
        o.voiceChannel.delete();
    };
    fs.writeFile('./temp.json', JSON.stringify(temp), (err) => {
        if (err) console.error(err);
        })
        });

client.on("message", message => {
  if (message.author.bot) return;
fs.writeFile('./id/rank.json', JSON.stringify(id), (err) => {
if (err) console.error(err);
});
});
      client.on('message', message => {
          if(!id[message.author.id]) id[message.author.id] ={
              textrank: 1,
              points: 1
          };
          if(message.author.bot) return;
          id[message.author.id].points = Math.floor(id[message.author.id].points+4);
          if(id[message.author.id].points > 10) {
              id[message.author.id].points = 10;
              id[message.author.id].level = Math.floor(id[message.author.id].level+4);
          }
          fs.writeFile('./id/rank.json', JSON.stringify(id), (err) => {
if (err) console.error(err);
});
    
    client.on("message", message => {
  if (message.author.bot) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + "rank")) {
                               let user = message.mentions.users.first();
         var human = message.mentions.users.first();
            var author;
            if(human) {
                author = human;
            } else {
                author = message.author;
            }
          var mentionned = message.mentions.members.first();
             var ah;
            if(mentionned) {
                ah = mentionned;
            } else {
                ah = message.member;
            }
            var ment = message.mentions.users.first();
            var getvalueof;
            if(ment) {
              getvalueof = ment;
            } else {
              getvalueof = message.author;
            }
   var mentionned = message.mentions.users.first();
 
    var client;
      if(mentionned){
          var client = mentionned;
      } else {
          var client = message.author;
 
      }
if (!id[getvalueof.id]) id[getvalueof.id] = {textrank: 0,points: 1};
            let Image = Canvas.Image,
            canvas = new Canvas(400, 200),
            ctx = canvas.getContext('2d');
            fs.readFile("./id/rank.png", function (err, Background) {
            if (err) return console.log(err);
            let id = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 400, 200);
 
});
 
 
 
                let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
 
                        // N A M E  |  S H A D O W
                        ctx.font = 'bold 18px Arial';
                        ctx.fontSize = '18px';
                        ctx.fillStyle = "#000000";
                        ctx.textAlign = "center";
                        ctx.fillText(`${getvalueof.username}`, 253, 79);
 
                        // N A M E
                        ctx.font = 'bold 18px Arial';
                        ctx.fontSize = '18px';
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`${getvalueof.username}`, 253, 77);
 

                        // T E X T  R A N K
                        ctx.font = "bold 12px Arial";
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`${id[getvalueof.id].textrank}`, 252, 124); 
 
                        // P O I N T S
                        ctx.font = "bold 12px Arial";
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`${id[getvalueof.id].points}`, 253, 171);
 
 
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
 
ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(75, 100, 780, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 26, 69, 93, 93);
                        
message.channel.sendFile(canvas.toBuffer());

});
});
}
});
});




client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "support") {
     message.channel.send('** تم ارسال الرابط بالخاص **');
 message.author.sendMessage(`
https://discord.gg/rKgwdEq
 `);
    }
});

client.on('message', message => {
          

  if (message.content.startsWith(prefix + "user")) {
   
   if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات ❌`);

       message.guild.fetchInvites().then(invs => {
let member = client.guilds.get(message.guild.id).members.get(message.author.id);
let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
var moment = require('moment');
var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
var heg;
if(men) {
heg = men
} else {
heg = message.author
}
var mentionned = message.mentions.members.first();
var h;
if(mentionned) {
h = mentionned
} else {
h = message.member
}
moment.locale('ar-TN');
var id = new  Discord.RichEmbed()

        .setColor('#000000').setColor('#36393e')
.setThumbnail(message.author.avatarURL)
.addField(': تاريخ دخولك للديسكورد',` \`${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} \`**\n ${moment(heg.createdTimestamp).fromNow()}**` ,true) 
.addField(': تاريخ دخولك لسيرفرنا', `\`${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')}  \` **\n ${moment(h.joinedAt).fromNow()} **`, true)
.addField(` :لقد قمت بدعوة `, ` ${inviteCount} `)


.setFooter(message.author.username, message.author.avatarURL)  
message.channel.sendEmbed(id);
})
}



});

        client.on('message', message => {
            let muteReason = message.content.split(" ").slice(3).join(" ");
            let mutePerson = message.mentions.users.first();
            let messageArray = message.content.split(" ");
            let muteRole = message.guild.roles.find("name", "Muted");
            let time = messageArray[2];
            if(message.content.startsWith(prefix + "mute")) {
                if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send('**Sorry But You Dont Have Permission** `MUTE_MEMBERS`' );
                if(!mutePerson) return message.channel.send('**Mention Someone**')
                if(mutePerson === message.author) return message.channel.send('**You Cant Mute Yourself**');
                if(mutePerson === client.user) return message.channel.send('**You Cant Mute The Bot**');
                if(message.guild.member(mutePerson).roles.has(muteRole.id)) return message.channel.send('**This Person Already Tempmuted !**');
                if(!muteRole) return message.guild.createRole({ name: "Muted", permissions: [] });
                if(!time) return message.channel.send("**Type The Duration**");
                if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**The Bot Not Support This Time**');
                if(!muteReason) return message.channel.send('Please Type The Reason')
                message.guild.member(mutePerson).addRole(muteRole);
                message.channel.send(`**:white_check_mark: ${mutePerson} has been muted ! :zipper_mouth: **`)
                message.delete()
                let muteEmbed = new Discord.RichEmbed()
                .setTitle(`New Temp Muted User`)
                .setThumbnail(message.guild.iconURL)
                .addField('Muted By:',message.author,true)
                .addField('Muted User:', `${mutePerson}`)
                .addField('Reason:',muteReason,true)
                .addField('Duration:',`${mmss(mmss(time), {long: true})}`)
                .setFooter(message.author.username,message.author.avatarURL);
                let logchannel = message.guild.channels.find(`name`, "log");
                if(!logchannel) return message.channel.send("Can't find log channel.");
                logchannel.sendEmbed(muteEmbed)
                mutePerson.send(`**You Are has been temp muted in ${message.guild.name} reason: ${muteReason}**`)
                .then(() => { setTimeout(() => {
                   message.guild.member(mutePerson).removeRole(muteRole);
               }, mmss(time));
            });
            }
        });

//code

client.login(process.env.BOT_TOKEN);
