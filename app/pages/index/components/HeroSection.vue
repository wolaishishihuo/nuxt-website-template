<script setup lang="ts">
import {
  BoltIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CubeIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline';

// 组件引用
const heroSection = ref<HTMLElement>();

// 滚动到演示区域
function scrollToDemo() {
  const demoSection = document.querySelector('.product-showcase-section');
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// 组件挂载时设置动画
onMounted(() => {
  // 视差滚动效果
  setupParallaxEffect();
});

// 视差滚动效果
function setupParallaxEffect() {
  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-gradient');

    parallaxElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const speed = 0.3;
      const yPos = -(scrolled * speed);
      htmlElement.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick);
}

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('scroll', () => {});
});
</script>

<template>
  <section ref="heroSection" class="hero-section">
    <div class="hero-bg">
      <div class="hero-particles" />
      <div class="hero-gradient" />
    </div>
    <div class="container">
      <div class="hero-content animate-fade-in-up">
        <div class="hero-badge animate-fade-in-up" style="animation-delay: 0.1s">
          <span class="badge-text">🚀 全新升级</span>
          <span class="badge-highlight">现代化企业官网解决方案</span>
        </div>
        <h1 class="hero-title animate-text-reveal">
          打造属于您的
          <span class="title-highlight">专业官网</span>
        </h1>
        <p class="hero-description animate-fade-in-up" style="animation-delay: 0.3s">
          基于最新技术栈，提供开箱即用的企业官网模板
          <br>
          助力企业快速建立专业的线上形象
        </p>
        <div class="hero-features animate-fade-in-up" style="animation-delay: 0.4s">
          <div class="feature-item">
            <BoltIcon class="feature-icon" />
            <span>快速部署</span>
          </div>
          <div class="feature-item">
            <ShieldCheckIcon class="feature-icon" />
            <span>安全可靠</span>
          </div>
          <div class="feature-item">
            <CubeIcon class="feature-icon" />
            <span>模块化设计</span>
          </div>
        </div>
        <div class="hero-buttons animate-fade-in-up" style="animation-delay: 0.6s">
          <NuxtLink to="#" class="btn btn-primary animate-pulse-subtle">
            <span>立即体验</span>
            <ChevronRightIcon class="btn-icon" />
          </NuxtLink>
          <NuxtLink to="#" class="btn btn-outline">
            <span>了解更多</span>
          </NuxtLink>
          <button class="btn btn-demo" @click="scrollToDemo">
            <span>在线演示</span>
          </button>
        </div>
      </div>
      <div class="hero-visual animate-fade-in-up" style="animation-delay: 0.8s">
        <div class="visual-card">
          <div class="card-header">
            <div class="card-dots">
              <span class="dot dot-red" />
              <span class="dot dot-yellow" />
              <span class="dot dot-green" />
            </div>
            <div class="card-title">
              企业官网预览
            </div>
          </div>
          <div class="card-content">
            <div class="preview-screen">
              <div class="screen-content">
                <div class="content-header" />
                <div class="content-body">
                  <div class="content-line" />
                  <div class="content-line short" />
                  <div class="content-line" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 滚动指示器 -->
    <div class="scroll-indicator animate-bounce-gentle">
      <ChevronDownIcon class="scroll-icon" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    .hero-particles {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
      animation: float 20s infinite linear;
    }

    .hero-gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(99, 102, 241, 0.8), rgba(139, 69, 19, 0.3));
    }
  }

  .container {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 0 1rem;
    }
  }

  .hero-content {
    color: white;

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-bottom: 1.5rem;

      .badge-text {
        font-size: 0.875rem;
        font-weight: 500;
      }

      .badge-highlight {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;

      @media (max-width: 768px) {
        font-size: 2.5rem;
      }

      .title-highlight {
        background: linear-gradient(45deg, #fbbf24, #f59e0b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    .hero-description {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-features {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
      }

      .feature-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .feature-icon {
          width: 1.25rem;
          height: 1.25rem;
          opacity: 0.8;
        }

        span {
          font-size: 0.875rem;
          font-weight: 500;
        }
      }
    }

    .hero-buttons {
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
        border: none;
        cursor: pointer;

        &.btn-primary {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          color: white;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
          }
        }

        &.btn-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
          }
        }

        &.btn-demo {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }

  .hero-visual {
    .visual-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      padding: 1.5rem;

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;

        .card-dots {
          display: flex;
          gap: 0.5rem;

          .dot {
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;

            &.dot-red { background: #ef4444; }
            &.dot-yellow { background: #f59e0b; }
            &.dot-green { background: #10b981; }
          }
        }

        .card-title {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }
      }

      .card-content {
        .preview-screen {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          padding: 1rem;

          .screen-content {
            .content-header {
              height: 1rem;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 0.25rem;
              margin-bottom: 0.75rem;
            }

            .content-body {
              .content-line {
                height: 0.5rem;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 0.25rem;
                margin-bottom: 0.5rem;

                &.short {
                  width: 60%;
                }
              }
            }
          }
        }
      }
    }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    opacity: 0.7;
    z-index: 2;

    .scroll-icon {
      width: 1.5rem;
      height: 1.5rem;
      animation: bounce 2s infinite;
    }
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.animate-fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-text-reveal {
  opacity: 0;
  animation: textReveal 1s ease 0.2s forwards;
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-pulse-subtle {
  animation: pulseSubtle 2s infinite;
}

@keyframes pulseSubtle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-bounce-gentle {
  animation: bounceGentle 2s infinite;
}

@keyframes bounceGentle {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
</style>
