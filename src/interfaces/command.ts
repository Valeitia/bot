import { Bot } from "../client/client";
import { Message } from "discord.js";

export interface RunFunction {
  (client: Bot, message: Message, args: string[]): Promise<unknown>;
}

export interface Command {
  name: string;
  category: string;
  run: RunFunction;
}
