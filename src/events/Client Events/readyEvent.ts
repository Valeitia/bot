import { RunFunction } from '../../interfaces/event';

export const run: RunFunction = async(client) => {
    client.logger.success(`${ client.user.tag } is now online!`);
}

export const name: string = 'ready';