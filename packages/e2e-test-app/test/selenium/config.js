module.exports = async (config) => {
    const devtool = config.debug || config.devtool;

    return {
        devtool,
        workerLimit: 5,
        retryCount: 0,
        testTimeout: devtool ? 0 : config.testTimeout,
        tests: 'test/selenium/test/*.spec.js',
        plugins: [
            ['selenium-driver', {
                clientTimeout: devtool ? 0 : config.testTimeout,
                recorderExtension: devtool,
                capabilities: devtool ? {} : {
                    'goog:chromeOptions': {
                        args: ['--headless', '--disable-gpu', '--no-sandbox'],
                    },
                },
            }],
            ['babel', {
                presets: [
                    'es2015',
                ],
            }],
        ],
    };
};
