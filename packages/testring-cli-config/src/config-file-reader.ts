import * as fs from 'fs';
import * as path from 'path';
import {loggerClientLocal} from '@testring/logger';
import { IConfig } from '@testring/types';

const findFile = (configPath) => {
    const filePath = path.resolve(configPath);
    const configExists = fs.existsSync(filePath);

    if (configExists) {
        return fs.readFileSync(filePath, { encoding: 'utf8' });
    }

    return null;
};

const readJSConfig = async (userConfig: IConfig): Promise<IConfig | null> => {
    try {
        const configFile = require(userConfig.config);

        if (typeof configFile === 'function') {
            return await configFile(userConfig);
        } else {
            return configFile;
        }
    } catch (exception) {
        loggerClientLocal.error(`Config file ${userConfig.config} can't be parsed: invalid JS. ${exception.message}`);
        throw new SyntaxError(`
            Config file ${userConfig.config} can't be parsed: invalid JS.
            ${exception.message}
        `);
    }
};

const readJSONConfig = async (userConfig: IConfig): Promise<IConfig | null> => {
    const fileContent = findFile(userConfig.config);

    if (fileContent === null) {
        return null;
    }

    try {
        return JSON.parse(fileContent);
    } catch (exception) {
        loggerClientLocal.error(`Config file ${userConfig.config} can't be parsed: invalid JSON. ${exception.message}`);
        throw new SyntaxError(`
            Config file ${userConfig.config} can't be parsed: invalid JSON.
            ${exception.message}
        `);
    }
};

export const getFileConfig = async (userConfig: IConfig) => {
    const extension = path.extname(userConfig.config);
    loggerClientLocal.log(`Read config file: ${userConfig.config}`);

    switch (extension) {
        case '.js' :
            return readJSConfig(userConfig);
        case '.json' :
            return readJSONConfig(userConfig);
        default:
            loggerClientLocal.error(`Config file ${userConfig.config} is not supported`);
            throw new Error(`${extension} is not supported`);
    }
};
