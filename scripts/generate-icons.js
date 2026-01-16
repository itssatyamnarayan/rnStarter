const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.resolve(__dirname, '../src/assets/icons');
const OUTPUT_FILE = path.join(ICONS_DIR, 'index.ts');

const files = fs.readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));

const toPascalCase = name =>
  name.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());

const imports = files
  .map(file => {
    const name = toPascalCase(path.basename(file, '.svg'));
    return `import ${name} from './${file}';`;
  })
  .join('\n');

const mappings = files
  .map(file => {
    const key = path.basename(file, '.svg');
    const value = toPascalCase(key);
    return `  ${key}: ${value},`;
  })
  .join('\n');

const content = `${imports}

export const Icons = {
${mappings}
} as const;

export type IconName = keyof typeof Icons;
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log('✅ Icons index.ts generated');
