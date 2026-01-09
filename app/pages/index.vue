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
      class="flex min-h-screen items-center justify-center relative overflow-hidden from-violet-600 to-indigo-700 via-purple-600 bg-gradient-to-br"
    >
      <!-- 动态背景 -->
      <div class="inset-0 absolute overflow-hidden">
        <!-- 浮动圆形 -->
        <div
          v-for="i in 6"
          :key="i"
          class="rounded-full bg-white/10 absolute"
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
          class="opacity-20 inset-0 absolute"
          style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 50px 50px;"
          :style="{ transform: `translate(${parallaxX * 10}px, ${parallaxY * 10}px)` }"
        />
      </div>

      <!-- 主内容 -->
      <div class="text-white container-base py-20 text-center relative z-10">
        <!-- Badge -->
        <div
          v-motion
          v-bind="fadeUp(0)"
          class="mb-8 px-4 py-2 border border-white/20 rounded-full bg-white/10 opacity-0 inline-flex gap-2 items-center backdrop-blur-sm"
        >
          <span class="flex h-2 w-2 relative">
            <span class="rounded-full bg-green-400 opacity-75 inline-flex h-full w-full absolute animate-ping" />
            <span class="rounded-full bg-green-500 inline-flex h-2 w-2 relative" />
          </span>
          <span class="text-sm font-medium">v1.0 正式发布</span>
        </div>

        <!-- 标题 -->
        <h1
          v-motion
          v-bind="fadeUp(100)"
          class="text-5xl leading-tight font-black mb-6 opacity-0 md:text-7xl"
        >
          构建<span class="text-transparent from-yellow-300 to-orange-400 bg-gradient-to-r bg-clip-text">现代化</span>
          <br>
          企业官网
        </h1>

        <!-- 描述 -->
        <p
          v-motion
          v-bind="fadeUp(200)"
          class="text-xl leading-relaxed mx-auto mb-10 opacity-0 max-w-2xl md:text-2xl"
        >
          基于 Nuxt 4 + UnoCSS + VueUse Motion
          <br class="hidden md:block">
          打造极致性能与优雅动画体验
        </p>

        <!-- 按钮组 -->
        <div
          v-motion
          v-bind="fadeUp(300)"
          class="opacity-0 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#features"
            class="group text-purple-700 font-bold px-8 py-4 rounded-xl bg-white inline-flex gap-2 transition-all duration-300 items-center hover:(shadow-2xl shadow-white/25 -translate-y-1)"
          >
            开始使用
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            class="font-bold px-8 py-4 border border-white/30 rounded-xl bg-white/10 inline-flex gap-2 transition-all duration-300 items-center backdrop-blur-sm hover:(border-white/50 bg-white/20)"
          >
            <span class="i-carbon-logo-github h-5 w-5" />
            GitHub
          </a>
        </div>

        <!-- 技术栈标签 -->
        <div
          v-motion
          v-bind="fadeIn(500)"
          class="mt-16 opacity-0 flex flex-wrap gap-3 justify-center"
        >
          <span
            v-for="tech in techStack"
            :key="tech.name"
            class="text-sm font-medium px-4 py-2 border border-white/10 rounded-lg bg-white/10 cursor-default transition-all backdrop-blur-sm hover:(bg-white/20 scale-105)"
          >
            {{ tech.name }}
          </span>
        </div>
      </div>

      <!-- 滚动指示器 -->
      <div
        v-motion
        v-bind="fadeIn(800)"
        class="opacity-0 bottom-8 left-1/2 absolute -translate-x-1/2"
      >
        <div class="pt-2 border-2 border-white/50 rounded-full flex h-10 w-6 justify-center">
          <div class="rounded-full bg-white h-2 w-1 animate-bounce" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-gray-50">
      <div class="container-base">
        <!-- Section Header -->
        <div class="mb-16 text-center">
          <span
            v-motion
            v-bind="fadeUp(0)"
            class="text-sm text-purple-600 font-semibold mb-4 px-4 py-1 rounded-full bg-purple-100 inline-block"
          >
            核心特性
          </span>
          <h2
            v-motion
            v-bind="fadeUp(100)"
            class="text-4xl text-gray-900 font-bold mb-4 md:text-5xl"
          >
            为什么选择我们？
          </h2>
          <p
            v-motion
            v-bind="fadeUp(200)"
            class="text-xl text-gray-600 mx-auto max-w-2xl"
          >
            现代化技术栈，卓越的开发体验
          </p>
        </div>

        <!-- Features Grid -->
        <div class="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            v-motion
            v-bind="scaleIn(index * 100)"
            class="group p-8 border border-gray-100 rounded-2xl bg-white shadow-sm transition-all duration-300 hover:(shadow-xl -translate-y-2)"
          >
            <div class="text-3xl mb-6 rounded-xl flex h-14 w-14 transition-transform duration-300 items-center justify-center from-purple-100 to-indigo-100 bg-gradient-to-br group-hover:(rotate-3 scale-110)">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl text-gray-900 font-bold mb-2">
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
    <section class="py-24 relative overflow-hidden from-purple-600 to-indigo-600 bg-gradient-to-r">
      <!-- 装饰元素 -->
      <div class="inset-0 absolute">
        <div class="rounded-full bg-white/10 h-96 w-96 left-1/4 top-0 absolute blur-3xl" />
        <div class="rounded-full bg-white/10 h-64 w-64 bottom-0 right-1/4 absolute blur-3xl" />
      </div>

      <div class="text-white container-base text-center relative z-10">
        <h2
          v-motion
          v-bind="fadeUp(0)"
          class="text-4xl font-bold mb-6 md:text-5xl"
        >
          准备好开始了吗？
        </h2>
        <p
          v-motion
          v-bind="fadeUp(100)"
          class="text-xl mx-auto mb-10 opacity-90 max-w-xl"
        >
          立即获取模板，快速搭建你的专属官网
        </p>
        <div
          v-motion
          v-bind="fadeUp(200)"
          class="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#"
            class="text-purple-700 font-bold px-8 py-4 rounded-xl bg-white transition-all duration-300 hover:(shadow-2xl -translate-y-1)"
          >
            免费下载
          </a>
          <a
            href="#"
            class="font-bold px-8 py-4 border-2 border-white/50 rounded-xl bg-transparent transition-all duration-300 hover:(border-white bg-white/10)"
          >
            在线演示
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-gray-400 py-12 bg-gray-900">
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
