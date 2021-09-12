import { RunFunction } from "../../interfaces/command";

export const run: RunFunction = async (client, message, args) => {
  const data = {
    discord_id: message.author.id,
    referral_code: args[0] ?? null
  };
  client
    .post("api/auth/create", data)
    .then((res) => {
      message.channel.send(
        client.embed({ description: res.data.message }, message)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const name: string = "accept";
