import fs from 'fs';
import path from 'path';
import { StringsFormatting } from '.';

/**
 * Autoloading files in a specified folder
 */
export default class AutoLoader{
    public static autoload(folder: string, returnKeys: boolean = false){
        let identifier;
        const imports: {[x: string]: unknown} = {};
        const root = path.join(__dirname, '../../');
        const folderPath = path.join(root, folder);

        fs.readdirSync(folderPath).forEach(function(file: any) {
            if (file.indexOf('index.ts') >= 0) return;

            identifier = StringsFormatting.snakeToCamel(StringsFormatting.ucfirst(file.split('.ts')[0]));
            
            imports[identifier] = Object.values(require(root + folder + '/' + (file || '')))[0];
        });

        return returnKeys ? Object.keys(imports) : imports;
    }
}