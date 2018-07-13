import { createServer } from 'net';

export const getAvailablePort = (port: number, skip: Array<number> = []): Promise<number> => {
    return new Promise((async (resolve) => {
        if (skip.includes(port)) {
            resolve(await getAvailablePort(port + 1, skip));
        }

        const testConnection = createServer();

        testConnection.once('error', async () => {
            resolve(await getAvailablePort(port + 1, skip));
        }).once('listening', () => {
            testConnection.once('close', () => {
                resolve(port);
            }).close();
        }).listen(port);
    }));
};
