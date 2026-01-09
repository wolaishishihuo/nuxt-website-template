<script setup lang="ts">
import { BoltIcon, CheckIcon, CloudIcon, CubeIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline';

// 组件引用
const advantagesSection = ref<HTMLElement>();

// 核心优势数据
const advantages = ref([
  {
    id: 1,
    title: '专业设计',
    description: '由资深设计师精心打造，确保每个细节都符合现代审美标准',
    features: ['响应式设计', '用户体验优化', '品牌定制'],
    icon: markRaw(CubeIcon)
  },
  {
    id: 2,
    title: '高性能',
    description: '基于最新前端技术栈，确保网站快速加载和流畅交互',
    features: ['极速加载', 'SEO优化', '移动端适配'],
    icon: markRaw(BoltIcon)
  },
  {
    id: 3,
    title: '安全可靠',
    description: '严格的安全标准和稳定的技术架构，保障网站安全运行',
    features: ['数据加密', '安全防护', '稳定部署'],
    icon: markRaw(ShieldCheckIcon)
  },
  {
    id: 4,
    title: '易于维护',
    description: '模块化设计和清晰的代码结构，便于后续维护和功能扩展',
    features: ['模块化', '文档完善', '技术支持'],
    icon: markRaw(CloudIcon)
  }
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
  const elements = advantagesSection.value?.querySelectorAll('.animate-on-scroll');
  elements?.forEach((el: Element) => observer.observe(el));
}
</script>

<template>
  <section ref="advantagesSection" class="advantages-section">
    <div class="container">
      <div class="section-header animate-on-scroll">
        <div class="section-badge">
          <span class="badge-icon">⚡</span>
          <span class="badge-text">核心优势</span>
        </div>
        <h2 class="section-title">
          为什么选择我们的
          <span class="title-highlight">官网解决方案</span>
        </h2>
        <p class="section-description">
          基于多年实战经验，我们为您提供专业、高效、可靠的官网建设服务
        </p>
      </div>

      <div class="advantages-grid">
        <div
          v-for="(advantage, index) in advantages"
          :key="advantage.id"
          class="advantage-card animate-on-scroll"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="card-background" />
          <div class="advantage-icon">
            <component :is="advantage.icon" class="icon" />
          </div>
          <div class="advantage-content">
            <h3 class="advantage-title">
              {{ advantage.title }}
            </h3>
            <p class="advantage-description">
              {{ advantage.description }}
            </p>
            <div class="advantage-features">
              <div
                v-for="feature in advantage.features"
                :key="feature"
                class="feature-tag"
              >
                <CheckIcon class="check-icon" />
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>
          <div class="advantage-number">
            {{ String(index + 1).padStart(2, '0') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.advantages-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1f2937;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }

      .title-highlight {
        color: #3b82f6;
      }
    }

    .section-description {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .advantages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .advantage-card {
      position: relative;
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid #f1f5f9;
      transition: all 0.3s ease;
      overflow: hidden;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

        .card-background {
          opacity: 1;
        }
      }

      .card-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .advantage-icon {
        position: relative;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;

        .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: white;
        }
      }

      .advantage-content {
        position: relative;

        .advantage-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }

        .advantage-description {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .advantage-features {
          .feature-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            background: #f1f5f9;
            color: #475569;
            padding: 0.375rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;

            .check-icon {
              width: 1rem;
              height: 1rem;
              color: #10b981;
            }
          }
        }
      }

      .advantage-number {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        font-size: 2rem;
        font-weight: 800;
        color: #e5e7eb;
        z-index: 1;
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
</style>
