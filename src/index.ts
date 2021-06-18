import { Config } from './interfaces/config';
import * as File from '../config.json';
import { Bot } from './client/client';

new Bot().start((File as Config));