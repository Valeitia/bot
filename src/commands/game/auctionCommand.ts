import { RunFunction } from "../../interfaces/command";

export const run: RunFunction = async (client, message, args) => {
    if (!args.length) {
        message.channel.send(
            client.embed({
                title: "Auction Usage",
                description: 
                `**!auction listing** - View all listings. \n
                 **!auction buy {auction_id}** - Buys a listing. \n
                 **!auction add {item_id} {price}** - Adds an item to the listing.
                `
            }, message)
        );
    }

    if (args[0] == "buy") {
        if (!args[1]) {
            message.channel.send(
                client.embed({
                    description: "Please enter an auction ID. **!auction buy {auction_id}**"
                }, message)
            );
        }

        let data = {
            discord_id: message.author.id,
            auction: args[1]
        }

        client
            .post("api/auction/buy", data)
            .then((res) => {
                message.channel.send(
                    client.embed({
                        description: res.data.message
                    }, message)
                );
            })
            .catch((err) => {
            console.log(err);
            });
    }

    if (args[0] == "add") {
        if (!args[1]) {
            message.channel.send(
                client.embed({
                    description: "Please enter an item ID and price. **!auction add {item_id} {price}**"
                }, message)
            );
        }

        if (args[1] && !args[2]) {
            message.channel.send(
                client.embed({
                    description: "Please enter a price. **!auction add {item_id} {price}**"
                }, message)
            );
        }

        if (args[2] == "0") {
            message.channel.send(
                client.embed({
                    description: "You cannot put up a listing for 0 gold.**"
                }, message)
            );
        }

        let data = {
            discord_id: message.author.id,
            inv: args[1],
            price: args[2]
        }

        client
            .post("api/auction/add", data)
            .then((res) => {
                message.channel.send(
                    client.embed({
                        description: res.data.message
                    }, message)
                );
            })
            .catch((err) => {
            console.log(err);
        });
    }

    if (args[0] == "listing") {
        client
            .get("api/auction/listing")
            .then((res) => {

                let listDisplay = "";
                res.data.data.forEach(e => {
                    listDisplay += `Auction #${e.auction.id} | Item #${e.inv.id} | ${e.item.name} | 💰 ${e.auction.price}`;
                });

                message.channel.send(
                    client.embed({
                        title: "Auction List",
                        description: listDisplay
                    }, message)
                );
            })
            .catch((err) => {
            console.log(err);
        });
    }

    if (args[0] == "cancel") {
        if (!args[1]) {
            message.channel.send(
                client.embed({
                    description: "Please enter the listing you want to cancel. **!auction cancel {auction_id}**"
                }, message)
            );
        }

        let data = {
            discord_id: message.author.id,
            auction: args[1]
        }

        client
            .post("api/auction/remove", data)
            .then((res) => {
                message.channel.send(
                    client.embed({
                        description: res.data.message
                    }, message)
                );
            })
            .catch((err) => {
            console.log(err);
        });
    }
};

export const name: string = "auction";
