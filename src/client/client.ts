import consola, { Consola } from "consola";
import {
  Client,
  MessageEmbedOptions,
  Message,
  Intents,
  Collection,
  MessageEmbed,
} from "discord.js";
import glob from "glob";
import { promisify } from "util";
import axios from "axios";

import { Command } from "../interfaces/command";
import { Event } from "../interfaces/event";
import { Config } from "../interfaces/config";

const globPromise = promisify(glob);

class Bot extends Client {
  public logger: Consola = consola;

  public commands: Collection<string, Command> = new Collection();

  public events: Collection<string, Event> = new Collection();

  public config: Config;

  public constructor() {
    super({
      ws: {
        intents: Intents.ALL,
      },
      messageCacheLifetime: 180,
      messageCacheMaxSize: 200,
      messageEditHistoryMaxSize: 200,
      messageSweepInterval: 180,
    });
  }

  public async start(config: Config): Promise<void> {
    this.config = config;
    this.login(config.token);

    const commandFiles: string[] = await globPromise(
      `${__dirname}/../commands/**/*{.ts,.js}`
    );
    commandFiles.map(async (value: string) => {
      const file: Command = await import(value);
      this.commands.set(file.name, file);
    });

    const eventFiles: string[] = await globPromise(
      `${__dirname}/../events/**/*{.ts,.js}`
    );
    eventFiles.map(async (value: string) => {
      const file: Event = await import(value);
      this.events.set(file.name, file);
      this.on(file.name, file.run.bind(null, this));
    });
  }

  public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
    return new MessageEmbed({ ...options, color: "RANDOM" }).setFooter(
      `${message.author.tag} | ${this.user.username}`,
      message.author.displayAvatarURL({ format: "png", dynamic: true })
    );
  }

  public async get(endpoint: string): Promise<any> {
    return await axios.get(`${this.config.api_link}/${endpoint}`, {
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      headers: { "content-type": "application/json" },
    });
  }

  public async post(endpoint: string, data: any): Promise<any> {
    return await axios.post(`${this.config.api_link}/${endpoint}`, data, {
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      headers: { "content-type": "application/json" },
    });
  }
}

export { Bot };
