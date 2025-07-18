const normalizeConfig = require('../normalizeConfig');

const normalizeCLIOptions = (cliOptions, configType) =>
  normalizeConfig(configType, { cliOptions }).cliOptions;

it('ignores unknown options', () => {
  expect(normalizeCLIOptions({ other: true })).not.toMatchObject({
    other: true,
  });
});

it('normalizes noInlineConfig', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    allowInlineConfig: true,
  });

  expect(normalizeCLIOptions({ noInlineConfig: true })).toMatchObject({
    allowInlineConfig: false,
  });

  expect(normalizeCLIOptions({ noInlineConfig: false })).toMatchObject({
    allowInlineConfig: true,
  });
});

it('normalizes cacheLocation', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    cacheLocation: '.eslintcache',
  });

  expect(
    normalizeCLIOptions({ cacheLocation: '/path/to/cache' }),
  ).toMatchObject({
    cacheLocation: '/path/to/cache',
  });
});

it('normalizes config', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    overrideConfigFile: null,
  });

  expect(normalizeCLIOptions({ config: '/path/to/config' })).toMatchObject({
    overrideConfigFile: '/path/to/config',
  });
});

it('normalizes env', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    overrideConfig: {
      env: {},
    },
  });

  expect(normalizeCLIOptions({ env: 'mocha' })).toMatchObject({
    overrideConfig: {
      env: 'mocha',
    },
  });

  expect(normalizeCLIOptions({ env: ['mocha', 'browser'] })).toMatchObject({
    overrideConfig: {
      env: ['mocha', 'browser'],
    },
  });
});

it('normalizes ext', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    extensions: ['.js'],
  });

  expect(normalizeCLIOptions({ ext: '.ts' })).toMatchObject({
    extensions: ['.ts'],
  });

  expect(normalizeCLIOptions({ ext: ['.js', '.jsx', '.ts'] })).toMatchObject({
    extensions: ['.js', '.jsx', '.ts'],
  });
});

it('normalizes fix', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    fix: false,
  });

  expect(normalizeCLIOptions({ fix: true })).toMatchObject({
    fix: true,
  });
});

it('normalizes global', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    overrideConfig: {
      globals: {},
    },
  });

  expect(normalizeCLIOptions({ global: 'it' })).toMatchObject({
    overrideConfig: {
      globals: 'it',
    },
  });

  expect(normalizeCLIOptions({ global: ['it', 'describe'] })).toMatchObject({
    overrideConfig: {
      globals: ['it', 'describe'],
    },
  });
});

it('normalizes maxWarnings', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    maxWarnings: -1,
  });

  expect(normalizeCLIOptions({ maxWarnings: '10' })).toMatchObject({
    maxWarnings: 10,
  });

  expect(() => normalizeCLIOptions({ maxWarnings: 'not-an-int' })).toThrow(
    `'not-an-int' cannot be converted to a number`,
  );
});

it('normalizes noIgnore', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    ignore: true,
  });

  expect(normalizeCLIOptions({ noIgnore: true })).toMatchObject({
    ignore: false,
  });
});

it('normalizes ignorePath', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    ignorePath: null,
  });

  expect(normalizeCLIOptions({ ignorePath: '/path/to/ignore' })).toMatchObject({
    ignorePath: '/path/to/ignore',
  });
});

it('normalizes parser', () => {
  expect(normalizeCLIOptions({})).not.toMatchObject({
    overrideConfig: {
      parser: 'espree',
    },
  });

  expect(normalizeCLIOptions({ parser: 'flow' })).toMatchObject({
    overrideConfig: {
      parser: 'flow',
    },
  });
});

it('normalizes parserOptions', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    overrideConfig: {
      parserOptions: {},
    },
  });

  expect(
    normalizeCLIOptions({ parserOptions: { ecmaVersion: 2015 } }),
  ).toMatchObject({
    overrideConfig: {
      parserOptions: { ecmaVersion: 2015 },
    },
  });
});

it('normalizes plugin', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    overrideConfig: {
      plugins: [],
    },
  });

  expect(normalizeCLIOptions({ plugin: 'prettier' })).toMatchObject({
    overrideConfig: {
      plugins: ['prettier'],
    },
  });

  expect(normalizeCLIOptions({ plugin: ['prettier'] })).toMatchObject({
    overrideConfig: {
      plugins: ['prettier'],
    },
  });
});

it('normalizes rulesdir', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    rulePaths: [],
  });

  expect(normalizeCLIOptions({ rulesdir: '/path/to/rules' })).toMatchObject({
    rulePaths: ['/path/to/rules'],
  });

  expect(
    normalizeCLIOptions({ rulesdir: ['/path/to/rules', '/other/path'] }),
  ).toMatchObject({
    rulePaths: ['/path/to/rules', '/other/path'],
  });
});

it('normalizes rules', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    overrideConfig: {
      rules: {},
    },
  });

  const ruleOptions = { quotes: [2, 'double'], 'no-console': 2 };

  expect(normalizeCLIOptions({ rules: ruleOptions })).toMatchObject({
    overrideConfig: {
      rules: ruleOptions,
    },
  });
});

it('normalizes noEslintrc', () => {
  expect(normalizeCLIOptions({})).toMatchObject({
    useEslintrc: true,
  });

  expect(normalizeCLIOptions({ noEslintrc: true })).toMatchObject({
    useEslintrc: false,
  });
});
