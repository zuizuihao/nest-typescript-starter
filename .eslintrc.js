/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'prettier/prettier': [
            'error',
            // 针对会被 ESLint 格式化的文件类型，Prettier 会作为 ESLint 的一个规则运行并格式化文件，因此需要添加如下配置
            {
                'tabWidth': 4,
                'endOfLine': 'auto',
                'singleQuote': true,
                'linebreak-style': 'windows'
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off"
    }
}
