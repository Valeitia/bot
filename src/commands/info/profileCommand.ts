import { RunFunction } from "../../interfaces/command";

import { Message } from "discord.js";

export const run: RunFunction = async (client, message) => {
  const msg: Message = await message.channel.send(
    client.embed({ description: "Fetching User Profile.." }, message)
  );
  
  const data = {
    discord_id: message.author.id,
  };

  await client
    .post("api/user/profile", data)
    .then((res) => {
        console.log(res.data);
        msg.edit(
            client.embed(
              {
                fields: [
                    {
                        name: 'Info',
                        value: `Level ${res.data.data.level} | ${res.data.data.exp} EXP \n
                                💰 ${res.data.data.gold} Gold \n
                                ❤️ ${res.data.data.health} / 100 Health \n
                                ⚡ ${res.data.data.energy} / 100 Energy
                                `,
                        inline: true,
                    },
                    {
                        name: 'Combat Stats',
                        value: `💪 ${res.data.data.strength} Strength
                                ✨ ${res.data.data.intelligence} Intelligence
                                🏃 ${res.data.data.dexterity} Dexterity
                                `,
                        inline: true,
                    }
                ],
                thumbnail: {
                    url: message.author.displayAvatarURL({ format: "png", dynamic: true })
                }
              },
              message
            )
        );
    })
    .catch((err) => {
      console.log(err);
    });

};

export const name: string = "profile";
