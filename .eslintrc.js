module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'jest'
  ],
  'rules': {
    "no-unused-vars": [
      "error", 
      { 
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false,
        "varsIgnorePattern": "Enzyme"
      }
    ]
  }
}
