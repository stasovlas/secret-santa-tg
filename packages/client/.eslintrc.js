module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-curly-brace-presence': [ 'error', 'always' ],
        'jsx-quotes': [ 'error', 'prefer-single' ],
        'quotes': [ 'error', 'single' ],
        'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'comma-dangle': [ 'error', 'never' ],
        'semi': [ 'error', 'always' ]
    }
}
