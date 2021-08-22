import { Bot } from "../client/client";

export interface RunFunction {
  (client: Bot, ...args: any[]): Promise<unknown>;
}

export interface Event {
  name: string;
  run: RunFunction;
}
