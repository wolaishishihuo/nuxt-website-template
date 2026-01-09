<script setup lang="ts">
import {
  ArrowRightIcon,
  BoltIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline';

// 组件引用
const productSection = ref<HTMLElement>();

// 产品特性数据
const features = ref([
  {
    id: 1,
    title: '快速部署',
    description: '一键部署到云端，5分钟内即可上线',
    icon: markRaw(BoltIcon)
  },
  {
    id: 2,
    title: '响应式设计',
    description: '完美适配各种设备和屏幕尺寸',
    icon: markRaw(DevicePhoneMobileIcon)
  },
  {
    id: 3,
    title: 'SEO优化',
    description: '内置SEO优化，提升搜索引擎排名',
    icon: markRaw(ChartBarIcon)
  },
  {
    id: 4,
    title: '安全保障',
    description: '多重安全防护，保障数据安全',
    icon: markRaw(ShieldCheckIcon)
  }
]);

// 滚动动画观察器
onMounted(() => {
  setupScrollAnimations();
  setupFloatingAnimation();
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
  const elements = productSection.value?.querySelectorAll('.animate-on-scroll, .animate-slide-in-left');
  elements?.forEach(el => observer.observe(el));
}

function setupFloatingAnimation() {
  const floatingCards = productSection.value?.querySelectorAll('.floating-card');

  floatingCards?.forEach((card, index) => {
    const element = card as HTMLElement;
    const delay = index * 1000; // 每个卡片延迟1秒

    setTimeout(() => {
      element.style.animation = `float 3s ease-in-out infinite`;
    }, delay);
  });
}
</script>

<template>
  <section ref="productSection" class="product-showcase-section">
    <div class="container">
      <div class="showcase-grid">
        <div class="showcase-content animate-on-scroll">
          <div class="content-header">
            <div class="section-badge">
              <span class="badge-icon">🚀</span>
              <span class="badge-text">产品展示</span>
            </div>
            <h2 class="showcase-title">
              一站式官网
              <span class="title-highlight">解决方案</span>
            </h2>
            <p class="showcase-description">
              从设计到开发，从部署到维护，我们为您提供完整的官网建设服务
            </p>
          </div>

          <div class="showcase-features">
            <div
              v-for="(feature, index) in features"
              :key="feature.id"
              class="feature-item animate-slide-in-left"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="feature-icon">
                <component :is="feature.icon" class="icon" />
              </div>
              <div class="feature-content">
                <h3 class="feature-title">
                  {{ feature.title }}
                </h3>
                <p class="feature-description">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>

          <div class="showcase-actions">
            <NuxtLink to="#" class="btn btn-primary">
              <span>查看产品详情</span>
              <ArrowRightIcon class="btn-icon" />
            </NuxtLink>
            <NuxtLink to="#" class="btn btn-outline">
              <span>浏览模板</span>
            </NuxtLink>
          </div>
        </div>

        <div class="showcase-visual animate-on-scroll">
          <div class="visual-wrapper">
            <div class="device-frame">
              <div class="device-screen">
                <div class="screen-header">
                  <div class="header-nav">
                    <span class="nav-item active">首页</span>
                    <span class="nav-item">产品</span>
                    <span class="nav-item">关于</span>
                    <span class="nav-item">联系</span>
                  </div>
                </div>
                <div class="screen-content">
                  <div class="content-section">
                    <div class="section-title" />
                    <div class="section-text" />
                    <div class="section-text short" />
                  </div>
                  <div class="content-grid">
                    <div class="grid-item" />
                    <div class="grid-item" />
                    <div class="grid-item" />
                    <div class="grid-item" />
                  </div>
                </div>
              </div>
            </div>
            <div class="floating-elements">
              <div class="floating-card card-1">
                <div class="card-icon">
                  📊
                </div>
                <div class="card-text">
                  数据统计
                </div>
              </div>
              <div class="floating-card card-2">
                <div class="card-icon">
                  🎨
                </div>
                <div class="card-text">
                  界面设计
                </div>
              </div>
              <div class="floating-card card-3">
                <div class="card-icon">
                  ⚡
                </div>
                <div class="card-text">
                  高性能
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
.product-showcase-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #ffffff, #f8fafc);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  .showcase-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .showcase-content {
    .content-header {
      margin-bottom: 2rem;

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

      .showcase-title {
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

      .showcase-description {
        font-size: 1.125rem;
        color: #6b7280;
        line-height: 1.6;
      }
    }

    .showcase-features {
      margin-bottom: 2rem;

      .feature-item {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .feature-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          .icon {
            width: 1.25rem;
            height: 1.25rem;
            color: white;
          }
        }

        .feature-content {
          .feature-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }

          .feature-description {
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.5;
          }
        }
      }
    }

    .showcase-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;

        &.btn-primary {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
          }
        }

        &.btn-outline {
          background: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;

          &:hover {
            background: #3b82f6;
            color: white;
          }
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }

  .showcase-visual {
    .visual-wrapper {
      position: relative;

      .device-frame {
        background: #1f2937;
        border-radius: 1.5rem;
        padding: 1.5rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

        .device-screen {
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;

          .screen-header {
            background: #f8fafc;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;

            .header-nav {
              display: flex;
              gap: 1rem;

              .nav-item {
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                font-weight: 500;
                color: #6b7280;

                &.active {
                  background: #3b82f6;
                  color: white;
                }
              }
            }
          }

          .screen-content {
            padding: 2rem;

            .content-section {
              margin-bottom: 2rem;

              .section-title {
                height: 1.5rem;
                background: #e5e7eb;
                border-radius: 0.375rem;
                margin-bottom: 1rem;
              }

              .section-text {
                height: 0.75rem;
                background: #f3f4f6;
                border-radius: 0.375rem;
                margin-bottom: 0.5rem;

                &.short {
                  width: 70%;
                }
              }
            }

            .content-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;

              .grid-item {
                height: 3rem;
                background: #f8fafc;
                border-radius: 0.5rem;
              }
            }
          }
        }
      }

      .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        .floating-card {
          position: absolute;
          background: white;
          border-radius: 0.75rem;
          padding: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transform: translateY(20px);
          animation: floatIn 0.6s ease forwards;

          .card-icon {
            font-size: 1.25rem;
          }

          .card-text {
            font-size: 0.75rem;
            font-weight: 600;
            color: #374151;
            white-space: nowrap;
          }

          &.card-1 {
            top: 10%;
            right: -20%;
            animation-delay: 0s;
          }

          &.card-2 {
            top: 50%;
            right: -25%;
            animation-delay: 1s;
          }

          &.card-3 {
            bottom: 15%;
            right: -15%;
            animation-delay: 2s;
          }
        }
      }
    }
  }
}

/* 动画效果 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
