module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'import',
  ],
  'rules': {
    'linebreak-style': 'off',
    'no-unused-vars': [2, { 'varsIgnorePattern': 'h' }],
    'dot-notation': ['error', { 'allowPattern': '^[a-z]+(_[a-z]+)+$' }],

    'react/jsx-filename-extension': 'off',
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
  },
};
