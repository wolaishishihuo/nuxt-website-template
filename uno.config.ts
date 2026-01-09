import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  // 预设
  presets: [
    presetWind4(), // 默认预设，兼容 Tailwind
    presetAttributify(), // 属性化模式
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
    presetTypography()
  ],

  // 转换器
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],

  // 全局样式
  preflights: [
    {
      getCSS: () => `
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `
    }
  ],

  // 主题扩展
  theme: {
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87'
      }
    }
  },

  // 快捷方式
  shortcuts: {
    // 容器
    'container-base': 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',

    // 按钮基础
    'btn': 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer',
    'btn-primary': 'btn px-6 py-3 bg-purple-600 text-white hover:(bg-purple-700 -translate-y-0.5 shadow-lg)',
    'btn-ghost': 'btn px-6 py-3 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20',

    // Flex
    'flex-center': 'flex items-center justify-center',

    // 玻璃效果
    'glass': 'bg-white/10 backdrop-blur-md border border-white/20',
    'glass-card': 'glass rounded-2xl p-6'
  },

  // 安全列表
  safelist: [
    'i-carbon-logo-github'
  ]
});
