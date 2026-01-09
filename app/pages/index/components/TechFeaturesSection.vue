<script setup lang="ts">
import {
  BoltIcon,
  CodeBracketIcon,
  CubeIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline';

// 组件引用
const techFeaturesSection = ref<HTMLElement>();

// 技术栈数据
const techStack = ref([
  {
    name: 'Vue.js 3',
    description: '现代化的JavaScript框架',
    icon: markRaw(CodeBracketIcon)
  },
  {
    name: 'Nuxt.js',
    description: '全栈Web应用框架',
    icon: markRaw(CubeIcon)
  },
  {
    name: 'TypeScript',
    description: '类型安全的JavaScript',
    icon: markRaw(ShieldCheckIcon)
  },
  {
    name: 'TailwindCSS',
    description: '实用优先的CSS框架',
    icon: markRaw(BoltIcon)
  }
]);

// 代码示例
const codeLines = ref([
  '&lt;<span class="tag">template</span>&gt;',
  '  &lt;<span class="tag">div</span> <span class="attr">class</span>=<span class="string">"app"</span>&gt;',
  '    &lt;<span class="tag">NuxtPage</span> /&gt;',
  '  &lt;/<span class="tag">div</span>&gt;',
  '&lt;/<span class="tag">template</span>&gt;',
  '',
  '&lt;<span class="tag">script</span> <span class="attr">setup</span> <span class="attr">lang</span>=<span class="string">"ts"</span>&gt;',
  '<span class="keyword">import</span> { <span class="variable">ref</span> } <span class="keyword">from</span> <span class="string">\'vue\'</span>',
  '',
  '<span class="keyword">const</span> <span class="variable">app</span> = <span class="function">ref</span>(<span class="string">\'Modern Website\'</span>)',
  '&lt;/<span class="tag">script</span>&gt;'
]);

// 滚动动画观察器
onMounted(() => {
  setupScrollAnimations();
});

function setupScrollAnimations() {
  const observerOptions = {
    threshold: [0, 0.1, 0.5],
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      }
      else {
        entry.target.classList.remove('animate-visible');
      }
    });
  }, observerOptions);

  // 观察所有需要动画的元素
  const elements = techFeaturesSection.value?.querySelectorAll('.animate-on-scroll, .animate-slide-in-left');
  elements?.forEach(el => observer.observe(el));
}
</script>

<template>
  <section ref="techFeaturesSection" class="tech-features-section">
    <div class="container">
      <div class="tech-grid">
        <div class="tech-content animate-on-scroll">
          <h2 class="tech-title">
            基于现代技术栈
            <span class="title-highlight">构建未来</span>
          </h2>
          <p class="tech-description">
            采用业界领先的前端技术，确保网站性能、安全性和可维护性
          </p>
          <div class="tech-stack">
            <div
              v-for="(tech, index) in techStack"
              :key="tech.name"
              class="tech-item animate-slide-in-left"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="tech-icon">
                <component :is="tech.icon" class="icon" />
              </div>
              <div class="tech-info">
                <h4 class="tech-name">
                  {{ tech.name }}
                </h4>
                <p class="tech-desc">
                  {{ tech.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tech-visual animate-on-scroll">
          <div class="visual-container">
            <div class="code-window">
              <div class="window-header">
                <div class="window-controls">
                  <span class="control control-close" />
                  <span class="control control-minimize" />
                  <span class="control control-maximize" />
                </div>
                <div class="window-title">
                  index.vue
                </div>
              </div>
              <div class="code-content">
                <div v-for="(line, index) in codeLines" :key="index" class="code-line">
                  <span class="line-number">{{ index + 1 }}</span>
                  <span class="code-text" v-html="line" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-features-section {
  padding: 6rem 0;
  background: #1f2937;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  .tech-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .tech-content {
    .tech-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: white;
      margin-bottom: 1.5rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }

      .title-highlight {
        color: #3b82f6;
      }
    }

    .tech-description {
      font-size: 1.125rem;
      color: #d1d5db;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .tech-stack {
      .tech-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .tech-icon {
          width: 3rem;
          height: 3rem;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon {
            width: 1.5rem;
            height: 1.5rem;
            color: #3b82f6;
          }
        }

        .tech-info {
          .tech-name {
            font-size: 1.125rem;
            font-weight: 600;
            color: white;
            margin-bottom: 0.25rem;
          }

          .tech-desc {
            color: #9ca3af;
            font-size: 0.875rem;
          }
        }
      }
    }
  }

  .tech-visual {
    .visual-container {
      position: relative;

      .code-window {
        background: #111827;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

        .window-header {
          background: #374151;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .window-controls {
            display: flex;
            gap: 0.5rem;

            .control {
              width: 0.75rem;
              height: 0.75rem;
              border-radius: 50%;

              &.control-close { background: #ef4444; }
              &.control-minimize { background: #f59e0b; }
              &.control-maximize { background: #10b981; }
            }
          }

          .window-title {
            color: #d1d5db;
            font-size: 0.875rem;
            font-weight: 500;
          }
        }

        .code-content {
          padding: 1.5rem;
          font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
          max-height: 400px;
          overflow-y: auto;

          .code-line {
            display: flex;
            margin-bottom: 0.5rem;

            .line-number {
              color: #6b7280;
              width: 2rem;
              text-align: right;
              margin-right: 1rem;
              font-size: 0.875rem;
              user-select: none;
            }

            .code-text {
              color: #d1d5db;
              font-size: 0.875rem;
              line-height: 1.4;

              :deep(.tag) { color: #f59e0b; }
              :deep(.attr) { color: #3b82f6; }
              :deep(.string) { color: #10b981; }
              :deep(.keyword) { color: #ec4899; }
              :deep(.variable) { color: #8b5cf6; }
              :deep(.function) { color: #06b6d4; }
            }
          }
        }
      }
    }
  }
}

/* 滚动动画 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.animate-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;

  &.animate-visible {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
