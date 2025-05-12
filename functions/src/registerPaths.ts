import { register } from 'tsconfig-paths';
import { readFileSync } from 'fs';
import { join } from 'path';

const tsConfig = JSON.parse(
    readFileSync(join(__dirname, '../tsconfig.paths.json'), 'utf8')
);

export default register({
    baseUrl: join(__dirname, tsConfig.compilerOptions.baseUrl),
    paths: tsConfig.compilerOptions.paths
});