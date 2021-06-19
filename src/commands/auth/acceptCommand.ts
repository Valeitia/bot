import { RunFunction } from '../../interfaces/command';

export const run: RunFunction = async(client, message) => {
    const data = {
        discord_id: message.author.id
    }

    client.post("api/auth/create", data).then(res => {
        message.channel.send(client.embed({ description: res.data.message }, message));
    }).catch(err => {
        console.log(err);
    })
}

export const name: string = 'accept';