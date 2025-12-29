const semver = require('semver');
const { version } = require('jest/package.json');

const extraExtension = semver.satisfies(version, '30') ? '.v30' : '';

module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    return (
      testPath.replace('__tests__', '__snapshots__') +
      extraExtension +
      snapshotExtension
    );
  },

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath
      .replace('__snapshots__', '__tests__')
      .slice(0, -(extraExtension + snapshotExtension).length);
  },

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'some/__tests__/example.test.js',
};
