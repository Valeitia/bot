import { getConfigFileParsingDiagnostics } from "typescript";
import { RunFunction } from "../../interfaces/command";

export const run: RunFunction = async (client, message) => {
  const data = {
    discord_id: message.author.id
  };

  client
    .post("api/battle/init", data)
    .then((res) => {
      if (res.data.status == 'error') {
        return message.channel.send(
          client.embed({
            description: res.data.message,
          }, message)
        );
      }

      if (res.data.data.battle.health > 0) {
        message.channel.send(
          client.embed({
            description: 
            `You hit the enemy **${res.data.data.enemy.name}** for **${res.data.data.user_damage}** damage! \n
             The enemy **${res.data.data.enemy.name}** hit you for **${res.data.data.enemy_damage}** damage!
            `,
            fields: [
              {
                name: 'Your Stats',
                value: `❤️ ${res.data.data.user.health} / 100 \n 
                        💪 ${res.data.data.user.strength} \n
                        🧠 ${res.data.data.user.intelligence} \n
                        🏃 ${res.data.data.user.dexterity}`,
                inline: true,
              },
              {
                name: `Enemy ${res.data.data.enemy.name}`,
                value: `❤️ ${res.data.data.battle.health} / ${res.data.data.enemy.health} \n
                        💪 ${res.data.data.enemy.strength} \n
                        🧠 ${res.data.data.enemy.intelligence} \n
                        🏃 ${res.data.data.enemy.dexterity}`,
                inline: true,
              },
              {
                name: '\u200b',
                value: '\u200b',
                inline: false,
              },
              {
                name: '⚡ Energy Remaining',
                value: `${res.data.data.user.energy} / 100`,
                inline: true,
              },
            ],
            thumbnail: {
              url: 'https://i.imgur.com/VoYaEJN.png'
            }
          }, message)
        );
      } else {
        message.channel.send(
          client.embed({
            description: 
            `You hit the enemy **${res.data.data.enemy.name}** for **${res.data.data.user_damage}** damage! \n
             The enemy **${res.data.data.enemy.name}** hit you for **${res.data.data.enemy_damage}** damage! \n

             You killed the enemy **${res.data.data.enemy.name}**!
            `,
            fields: [
              {
                name: "Drops",
                value: `💰 ${res.data.data.drops.gold} Gold \n ✨ ${res.data.data.drops.exp} EXP`
              }
            ],
            thumbnail: {
              url: 'https://i.imgur.com/VoYaEJN.png'
            }
          }, message)
        );

        if (res.data.data.level_up) {
          message.channel.send(
            client.embed({
              description: 'You leveled up!',
            }, message)
          );
        }

        if (res.data.data.items != null) {
          message.channel.send(
            client.embed({
              description: `You found a ${res.data.data.items.stats.rarity} ${res.data.data.items.item.name}`,
            }, message)
          );
        }
      }

    })
    .catch((err) => {
      console.log(err);
    });
};

export const name: string = "battle";
