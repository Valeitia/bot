import { RunFunction } from "../../interfaces/command";

export const run: RunFunction = async (client, message) => {
  const data = {
    discord_id: message.author.id,
  };

  client
    .post("api/inventory/get", data)
    .then((res) => {
      let invDisplay = "";
      res.data.data.forEach(e => {
        invDisplay += `#${e.inv.id} | ${e.item.name} | x${e.inv.amount} \n`;
      });
      message.channel.send(
        client.embed({ 
            title: `${message.author.username}'s Inventory`,
            description: invDisplay
        }, message)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const name: string = "inventory";
