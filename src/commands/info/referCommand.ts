import { RunFunction } from "../../interfaces/command";

import { Message } from "discord.js";

export const run: RunFunction = async (client, message, args) => {
    const data = {
        discord_id: message.author.id,
      };
    
      if (!args.length) {
        client
        .post("api/user/refer", data)
        .then((res) => {
          message.channel.send(
            client.embed({ 
                title: `Refer a friend!`,
                description: `Refer someone you know by having them type **!accept ${res.data.data.code}**`,
                fields: [
                    {
                        name: "Your code",
                        value: res.data.data.code,
                        inline: false,
                    },
                    {
                        name: "Your referrals",
                        value: res.data.data.referrals,
                        inline: false,
                    },
                    {
                        name: "How do I get the referrer role?",
                        value: "Obtain three referrals and then type **!refer claim**",
                        inline: false,
                    }
                ]
            }, message)
          );
        })
        .catch((err) => {
          console.log(err);
        });
      }

      if (args[0] === "claim") {
        client
        .post("api/user/refer", data)
        .then((res) => {
          let description = res.data.data.referrals >= 3 ? "You have claimed the referrer role!" : `You need 3 referrals to claim the referrer role, you currently only have ${res.data.data.referrals}`;
          message.channel.send(
            client.embed({ 
                title: `Claim`,
                description: description,
            }, message)
          );

          if (res.data.data.referrals >= 3) {
            let role = message.guild.roles.cache.find(role => role.name === "Referrer")
            message.member.roles.add(role);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
};

export const name: string = "refer";
