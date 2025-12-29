const fs = require('fs');
const semver = require('semver');
const { version } = require('jest/package.json');

const headerLink = semver.satisfies(version, '30')
  ? 'https://jestjs.io/docs/snapshot-testing'
  : 'https://goo.gl/fbAQLP';

for (const file of fs.readdirSync('./integrationTests/__snapshots__')) {
  const content = fs.readFileSync(
    `./integrationTests/__snapshots__/${file}`,
    'utf-8',
  );

  fs.writeFileSync(
    `./integrationTests/__snapshots__/${file}`,
    `// Jest Snapshot v1, ${headerLink}` + content.slice(content.indexOf('\n')),
    'utf-8',
  );
}
