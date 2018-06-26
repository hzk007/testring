/// <reference types="node" />
/// <reference types="mocha" />

import * as chai from 'chai';
import { IConfig } from '@testring/typings';
import { getArguments } from '../src/arguments-parser';

describe('argument parser', () => {
    it('should correctly work without argv', () => {
        const args = getArguments(undefined as any);

        chai.expect(args).to.be.equal(null);
    });

    it('should correctly get empty arguments array', () => {
        const args = getArguments([]);

        chai.expect(args).to.be.deep.equal({});
    });

    it('should correctly parse user arguments', () => {
        const customConfigPath = './customConfig.json';
        const customReportPath = './custom_report';
        const customTestsPath = './tests/**/*.test.js';
        const pluginsSet = ['plugin1', 'plugin2', 'plugin3'];
        const argv = [
            '',
            // boolean
            '--debug',
            // value with assign
            `--config=${customConfigPath}`,
            `--tests=${customTestsPath}`,
            `--plugins=${pluginsSet[0]}`,
            `--plugins=${pluginsSet[1]}`,
            `--plugins=${pluginsSet[2]}`,
            // value without assign
            '--report',
            customReportPath,
        ];

        const args = getArguments(argv);
        const expected: Partial<IConfig> = {
            debug: true,
            config: customConfigPath,
            report: customReportPath,
            tests: customTestsPath,
            plugins: pluginsSet
        };

        chai.expect(args).to.be.deep.equal(expected);
    });
});