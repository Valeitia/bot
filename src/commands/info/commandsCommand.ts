import { RunFunction } from "../../interfaces/command";

import { Message } from "discord.js";

export const run: RunFunction = async (client, message) => {
  const msg: Message = await message.channel.send(
    client.embed({ description: "Pinging.." }, message)
  );

  await msg.edit(
    client.embed(
      {
          fields: [
            {
                name: '⚔️ Combat Commands',
                value: `◻️ **!battle** - Battles a random enemy for gold, exp, and possible item drops. \n
                        ◻️ **!equip {item_id}** - Equips an item from your inventory. Use !inventory to see the item IDs. \n`,
        
                inline: true,
            },
            {
                name: '👥 User Commands',
                value: `◻️ **!inventory** - View the items you've collected. \n
                        ◻️ **!profile** - View your in-game profile. \n
                        `,
                inline: true,
            },
            {
                name: '🏬 Auction Commands',
                value: `◻️ **!auction add {item_id} {price}** - Adds an item to the auction house. \n
                        ◻️ **!auction buy {auction_id}** - Buys an item off the auction house. \n
                        ◻️ **!auction listing** - Views the available listings. \n
                        ◻️ **!auction cancel {auction_id}** - Cancels an item off the auction house. \n
                        `,
                inline: true,
            }
          ]
      },
      message
    )
  );
};

export const name: string = "commands";
