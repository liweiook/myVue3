module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  settings: {
    // 解决eslint：import/no-unresolved
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // import引入文件不检查后缀名
    'import/extensions': ['off'],
    // 变量可以_开头
    'no-underscore-dangle': ['off'],
    // 允许对参数重新赋值
    'no-param-reassign': ['off'],
    // 允许i++
    'no-plusplus': ['off'],
    // 允许使用复杂三元表达式
    'no-unused-expressions': ['off'],
    'no-nested-ternary': ['off'],
    // 关闭优先使用默认导出
    'import/prefer-default-export': ['off'],
    // 允许语句中只有if语句
    'no-lonely-if': ['off'],
    // 允许forin
    'no-restricted-syntax': ['off'],
    // 允许函数内部变量名与data中变量同名
    'no-shadow': ['off'],
    // 允许praseInt函数使用默认10基数
    radix: ['error', 'as-needed'],
    // 可以提前使用字面量函数
    'no-use-before-define': ['error', { functions: false }],
    // 暂时关闭依赖循环检测
    'import/no-cycle': ['off'],
    // 允许使用new
    'no-new': ['off'],
    // 允许全局require
    'global-require': ['off'],
    'import/no-dynamic-require': ['off'],
    // 允许匿名函数
    'func-names': ['off']
  }
}
