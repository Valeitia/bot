import { RunFunction } from "../../interfaces/command";

export const run: RunFunction = async (client, message, args) => {
    if (!args.length) {
        message.channel.send(
            client.embed({
                description: "Please supply an item ID. **Usage: !item {item_id}**"
            }, message)
        );
    }

    let data = {
        inv: args[0]
    }

    client
        .post("api/inventory/item", data)
        .then(res => {
            var user = client.users.cache.get(res.data.data.user.discord_id);
            var attributeDisplay = "";

            for (const [key, value] of Object.entries(res.data.data.stats)) {
                if (key != "rarity")
                    attributeDisplay += `${key.charAt(0).toUpperCase() + key.slice(1)} (+${value}) \n`;
            }

            message.channel.send(
                client.embed({
                    title: `Item #${res.data.data.inv.id}`,
                    fields: [
                        {
                            name: `Owner`,
                            value: `${user ? user.tag : "User not found. " + res.data.data.user.discord_id}`,
                            inline: false,
                        },
                        {
                            name: `🧾 Rarity`,
                            value: `${res.data.data.stats.rarity ?? "Common"}`,
                            inline: false,
                        },
                        {
                            name: `🧾 Attributes`,
                            value: attributeDisplay,
                            inline: false,
                        },
                    ],

                }, message)
            );
        })
};

export const name: string = "item";