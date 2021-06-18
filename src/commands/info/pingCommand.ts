import { RunFunction } from '../../interfaces/command';

import { Message } from 'discord.js';

export const run: RunFunction = async(client, message) => {
    const msg: Message = await message.channel.send(client.embed({ description: 'Pinging..' }, message));

    await msg.edit(client.embed({ description: `⏲️ WS: ${client.ws.ping}ms\n\n⏲️ MSG: ${msg.createdTimestamp - message.createdTimestamp}ms`}, message));
}

export const name: string = 'ping';