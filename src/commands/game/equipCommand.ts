import { RunFunction } from "../../interfaces/command";

import { Message } from "discord.js";

export const run: RunFunction = async (client, message, args) => {
    if (!args.length) {
        message.channel.send(
            client.embed({
              description: "Please supply an item ID to equip. Use !inv or !inventory to view your items + item ids.",
            }, message)
        );
    }

    let data = {
        discord_id: message.author.id,
        inventory_id: args[0]
    }

    client
    .post("api/inventory/equip", data)
    .then((res) => {
      message.channel.send(
        client.embed({ description: res.data.message }, message)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const name: string = "equip";
