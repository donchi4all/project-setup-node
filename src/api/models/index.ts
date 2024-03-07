import fs from 'fs';
import path from 'path';

const exportedClasses: Record<string, any> = {};

function importClasses(directory: string): void {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            importClasses(filePath); // Recursive call for subfolders
        } else if (file === 'index.ts') {
            const importedModule = require(filePath);

            const classNames = Object.keys(importedModule).filter(
                (key) => typeof importedModule[key] === 'function'
            );

            for (const className of classNames) {
                exportedClasses[className] = importedModule[className];
            }
        }
    }
}

importClasses(__dirname);
export default exportedClasses;
