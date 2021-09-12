import { RunFunction } from "../../interfaces/command";

import { Message } from "discord.js";

export const run: RunFunction = async (client, message) => {
  const msg: Message = await message.channel.send(
    client.embed({ description: "Pinging.." }, message)
  );

  await msg.edit(
    client.embed(
      {
          title: "Help Command",
          description: "",
          fields: [
              {
                name:"Commands", 
                value: "All game commands can be found by typing !commands", 
                inline: false,
              },
              {
                name:"How do I refer somone?", 
                value: "Have the referred player enter your referral code when accepting the rules to the game. You can find your referral code by typing !refer", 
                inline: false,
              },
              {
                name:"Need additional help?", 
                value: "Feel free to @Team with your question, or shoot us an email contact@valeitia.com", 
                inline: false,
              }
            
          ]

      },
      message
    )
  );
};

export const name: string = "help";
