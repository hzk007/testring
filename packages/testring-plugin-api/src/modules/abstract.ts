import { PluggableModule } from '@testring/pluggable-module';

export class AbstractAPI {
    constructor(protected pluginName: string, protected module: PluggableModule) {}

    protected registrySyncPlugin(hookName: string, callback: any) {
        const hook = this.module.getHook(hookName);

        if (hook) {
            hook.tap(this.pluginName, callback);
        }
    }

    protected registryAsyncPlugin(hookName: string, callback: (...args: Array<any>) => Promise<any>) {
        const hook = this.module.getHook(hookName);

        if (hook) {
            hook.tapPromise(this.pluginName, callback);
        }
    }
}