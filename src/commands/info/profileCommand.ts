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
        msg.edit(
            client.embed(
              {
                fields: [
                    {
                        name: 'Info',
                        value: `Level ${res.data.data.user.level} | ${res.data.data.user.exp} / ${25 * (res.data.data.user.level + 1) * (res.data.data.user.level + 1) - 25 * (res.data.data.user.level + 1)} EXP \n
                                💰 ${res.data.data.user.gold} Gold
                                ❤️ ${res.data.data.user.health} / 100 Health
                                ⚡ ${res.data.data.user.energy} / 100 Energy
                                `,
                        inline: true,
                    },
                    {
                      name: '\u200b',
                      value: '\u200b',
                      inline: true,
                    },
                    {
                        name: 'Stats',
                        value: `💪 ${res.data.data.user.strength} Strength
                                🧠 ${res.data.data.user.intelligence} Intelligence
                                🏃 ${res.data.data.user.dexterity} Dexterity
                                🌱 ${res.data.data.user.gathering} Gathering
                                🍀 ${res.data.data.user.luck} Luck
                                `,
                        inline: true,
                    },
                    {
                      name: 'Helmet',
                      value: res.data.data.helmet != null ? `#${res.data.data.helmet.inv.id} | ${res.data.data.helmet.item.name}` : "None",
                      inline: true,
                    },
                    {
                      name: '\u200b',
                      value: '\u200b',
                      inline: true,
                    },
                    {
                      name: 'Chestplate',
                      value: res.data.data.chestplate != null ? `#${res.data.data.chestplate.inv.id} | ${res.data.data.chestplate.item.name}` : "None",
                      inline: true,
                    },
                    {
                      name: 'Leggings',
                      value: res.data.data.leggings != null ? `#${res.data.data.leggings.inv.id} | ${res.data.data.leggings.item.name}` : "None",
                      inline: true,
                    },
                    {
                      name: '\u200b',
                      value: '\u200b',
                      inline: true,
                    },
                    {
                      name: 'Boots',
                      value: res.data.data.boots != null ? `#${res.data.data.boots.inv.id} | ${res.data.data.boots.item.name}` : "None",
                      inline: true,
                    },
                    {
                      name: 'Weapon',
                      value: res.data.data.weapon != null ? `#${res.data.data.weapon.inv.id} | ${res.data.data.weapon.item.name}` : "None",
                      inline: true,
                    },
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
