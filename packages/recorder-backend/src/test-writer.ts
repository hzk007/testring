import * as fs from 'fs';

export class TestWriter {
    private readonly filePath: string;
    test: string[] = [];

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    addLine(line: string) {
        this.test.push(line);
    }

    write() {
        if (!fs.existsSync(this.filePath)) {
            fs.closeSync(fs.openSync(this.filePath, 'w'));
        }

        fs.writeFile(this.filePath, this.test.join('\n'), (err) => {
            if (err) {
                throw err;
            }
        });
    }
}
