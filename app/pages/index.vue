<script setup lang="ts">
// SEO
useSeoMeta({
  title: '开源官网 - 现代化企业解决方案',
  description: '基于 Nuxt 4 + UnoCSS 的现代化官网模板'
});

// 动画预设
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    visibleOnce: { opacity: 1, y: 0, transition: { duration: 600, delay } }
  };
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    visibleOnce: { opacity: 1, transition: { duration: 800, delay } }
  };
}

function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.9 },
    visibleOnce: { opacity: 1, scale: 1, transition: { duration: 600, delay } }
  };
}

// 特性数据
const features = [
  { icon: '⚡', title: '极速性能', desc: '基于 Vite 构建，毫秒级热更新' },
  { icon: '🎨', title: '原子化 CSS', desc: 'UnoCSS 按需生成，零冗余' },
  { icon: '🚀', title: '现代技术栈', desc: 'Vue 3 + Nuxt 4 + TypeScript' },
  { icon: '📱', title: '响应式设计', desc: '完美适配各种设备尺寸' },
  { icon: '🔧', title: '高度可定制', desc: '灵活配置，轻松扩展' },
  { icon: '🌙', title: '暗色模式', desc: '一键切换明暗主题' }
];

// 技术栈
const techStack = [
  { name: 'Nuxt 4', color: 'from-green-400 to-emerald-600' },
  { name: 'Vue 3', color: 'from-emerald-400 to-green-600' },
  { name: 'UnoCSS', color: 'from-gray-600 to-gray-800' },
  { name: 'TypeScript', color: 'from-blue-400 to-blue-600' },
  { name: 'Vite', color: 'from-purple-400 to-violet-600' }
];

// 视差效果 - 使用鼠标位置
const heroRef = ref<HTMLElement>();
const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(heroRef);

// 计算视差偏移（-1 到 1 的范围）
const parallaxX = computed(() => (elementX.value / elementWidth.value - 0.5) * 2);
const parallaxY = computed(() => (elementY.value / elementHeight.value - 0.5) * 2);
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      ref="heroRef"
      class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
    >
      <!-- 动态背景 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 浮动圆形 -->
        <div
          v-for="i in 6"
          :key="i"
          class="absolute rounded-full bg-white/10"
          :class="[
            i % 2 === 0 ? 'w-64 h-64' : 'w-32 h-32',
            i % 3 === 0 ? 'blur-2xl' : 'blur-xl'
          ]"
          :style="{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`
          }"
        />
        <!-- 网格背景 -->
        <div
          class="absolute inset-0 opacity-20"
          style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 50px 50px;"
          :style="{ transform: `translate(${parallaxX * 10}px, ${parallaxY * 10}px)` }"
        />
      </div>

      <!-- 主内容 -->
      <div class="container-base relative z-10 text-center text-white py-20">
        <!-- Badge -->
        <div
          v-motion
          v-bind="fadeUp(0)"
          class="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span class="text-sm font-medium">v1.0 正式发布</span>
        </div>

        <!-- 标题 -->
        <h1
          v-motion
          v-bind="fadeUp(100)"
          class="text-5xl md:text-7xl font-black mb-6 leading-tight"
        >
          构建<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">现代化</span>
          <br>
          企业官网
        </h1>

        <!-- 描述 -->
        <p
          v-motion
          v-bind="fadeUp(200)"
          class="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          基于 Nuxt 4 + UnoCSS + VueUse Motion
          <br class="hidden md:block">
          打造极致性能与优雅动画体验
        </p>

        <!-- 按钮组 -->
        <div
          v-motion
          v-bind="fadeUp(300)"
          class="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#features"
            class="group inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:(-translate-y-1 shadow-2xl shadow-white/25) transition-all duration-300"
          >
            开始使用
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 font-bold rounded-xl hover:(bg-white/20 border-white/50) transition-all duration-300"
          >
            <span class="i-carbon-logo-github w-5 h-5" />
            GitHub
          </a>
        </div>

        <!-- 技术栈标签 -->
        <div
          v-motion
          v-bind="fadeIn(500)"
          class="mt-16 flex flex-wrap justify-center gap-3"
        >
          <span
            v-for="tech in techStack"
            :key="tech.name"
            class="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10 hover:(scale-105 bg-white/20) transition-all cursor-default"
          >
            {{ tech.name }}
          </span>
        </div>
      </div>

      <!-- 滚动指示器 -->
      <div
        v-motion
        v-bind="fadeIn(800)"
        class="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div class="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
          <div class="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-gray-50">
      <div class="container-base">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span
            v-motion
            v-bind="fadeUp(0)"
            class="inline-block px-4 py-1 mb-4 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full"
          >
            核心特性
          </span>
          <h2
            v-motion
            v-bind="fadeUp(100)"
            class="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            为什么选择我们？
          </h2>
          <p
            v-motion
            v-bind="fadeUp(200)"
            class="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            现代化技术栈，卓越的开发体验
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            v-motion
            v-bind="scaleIn(index * 100)"
            class="group p-8 bg-white rounded-2xl shadow-sm hover:(shadow-xl -translate-y-2) transition-all duration-300 border border-gray-100"
          >
            <div class="w-14 h-14 mb-6 flex items-center justify-center text-3xl bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl group-hover:(scale-110 rotate-3) transition-transform duration-300">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
      <!-- 装饰元素 -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div class="container-base relative z-10 text-center text-white">
        <h2
          v-motion
          v-bind="fadeUp(0)"
          class="text-4xl md:text-5xl font-bold mb-6"
        >
          准备好开始了吗？
        </h2>
        <p
          v-motion
          v-bind="fadeUp(100)"
          class="text-xl opacity-90 mb-10 max-w-xl mx-auto"
        >
          立即获取模板，快速搭建你的专属官网
        </p>
        <div
          v-motion
          v-bind="fadeUp(200)"
          class="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#"
            class="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:(-translate-y-1 shadow-2xl) transition-all duration-300"
          >
            免费下载
          </a>
          <a
            href="#"
            class="px-8 py-4 bg-transparent border-2 border-white/50 font-bold rounded-xl hover:(bg-white/10 border-white) transition-all duration-300"
          >
            在线演示
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 bg-gray-900 text-gray-400">
      <div class="container-base text-center">
        <p class="mb-4">
          Made with ❤️ using
          <span class="text-white font-medium">Nuxt 4</span> +
          <span class="text-white font-medium">UnoCSS</span> +
          <span class="text-white font-medium">VueUse Motion</span>
        </p>
        <p class="text-sm">
          © 2026 开源官网模板. MIT License.
        </p>
      </div>
    </footer>
  </div>
</template>
