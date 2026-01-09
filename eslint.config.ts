import antfu from '@antfu/eslint-config';

export default antfu({
  // 启用 Vue 支持
  vue: true,
  // 启用 TypeScript 支持
  typescript: true,

  // 代码风格配置
  stylistic: {
    indent: 2,
    quotes: 'single'
  },

  // 忽略的文件和目录
  ignores: [
    'node_modules/',
    '.nuxt/',
    '.output/',
    'dist/',
    'public/',
    '*.min.js',
    '*.d.ts',
    '*.md'
  ]
}, {
  // 自定义规则 - 覆盖默认的 stylistic 规则
  rules: {
    // 启用分号
    'style/semi': ['error', 'always'],
    // 禁用尾随逗号
    'style/comma-dangle': ['error', 'never'],

    // Vue 相关规则
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',

    // 允许 console 在开发环境
    'no-console': 'warn',

    // TypeScript 相关
    '@typescript-eslint/no-explicit-any': 'warn'
  }
});
