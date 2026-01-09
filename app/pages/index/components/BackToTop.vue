<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const showBackToTop = ref(false);
const scrollProgress = ref(0);
const isScrolling = ref(false);
const scrollVelocity = ref(0);
const lastScrollTop = ref(0);
const showTooltip = ref(false);

function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // 计算滚动速度
  scrollVelocity.value = Math.abs(scrollTop - lastScrollTop.value);
  lastScrollTop.value = scrollTop;

  // 设置滚动状态
  isScrolling.value = scrollVelocity.value > 0;

  // 显示/隐藏按钮
  showBackToTop.value = scrollTop > 300;

  // 计算进度
  if (documentHeight > 0) {
    scrollProgress.value = Math.round((scrollTop / documentHeight) * 100);
  }
  else {
    scrollProgress.value = 0;
  }

  // 清除滚动状态
  setTimeout(() => {
    isScrolling.value = false;
  }, 150);
}

function scrollToTop() {
  // 添加点击反馈
  const button = document.querySelector('.back-to-top-btn');
  if (button) {
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  }

  // 平滑滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // 追踪用户行为 - 可在生产环境替换为分析服务
  // eslint-disable-next-line no-console
  console.log('Back to top clicked', {
    fromProgress: scrollProgress.value,
    timestamp: new Date().toISOString()
  });
}

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === 'Home') {
    event.preventDefault();
    scrollToTop();
  }
}

function _toggleTooltip() {
  showTooltip.value = !showTooltip.value;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('keydown', handleKeydown);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="showBackToTop" class="back-to-top-container">
      <button
        class="back-to-top-btn"
        aria-label="返回顶部"
        @click="scrollToTop"
      >
        <svg class="progress-ring" viewBox="0 0 36 36">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path
            class="progress-ring-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="progress-ring-progress"
            :stroke-dasharray="`${scrollProgress}, 100`"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <svg class="back-to-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      <div class="back-to-top-tooltip">
        <div class="tooltip-content">
          <div class="tooltip-title">
            🚀 返回顶部
          </div>
          <div class="tooltip-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${scrollProgress}%` }" />
            </div>
            <span class="progress-text">{{ scrollProgress }}%</span>
          </div>
          <div class="tooltip-shortcut">
            <span class="shortcut-key">Ctrl</span> + <span class="shortcut-key">Home</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.back-to-top-container {
  position: fixed;
  bottom: 8rem;
  right: 2rem;
  z-index: 999;
}

.back-to-top-btn {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #0f172a, #1e293b, #334155);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;

    &::before {
      opacity: 1;
    }

    &::after {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.05);
  }
}

.back-to-top-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 3;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.back-to-top-btn:hover .back-to-top-icon {
  transform: translateY(-3px);
  animation: bounce 0.6s ease infinite alternate;
}

@keyframes bounce {
  0% { transform: translateY(-3px); }
  100% { transform: translateY(-6px); }
}

.progress-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  transform: rotate(-90deg);
  z-index: 0;
}

.progress-ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 2;
}

.progress-ring-progress {
  fill: none;
  stroke: url(#progressGradient);
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.3s ease;
  filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.5));
}

.back-to-top-tooltip {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 1rem;
  padding: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
  color: white;
  border-radius: 0.75rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  pointer-events: none;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  min-width: 180px;

  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 8px solid transparent;
    border-left-color: rgba(15, 23, 42, 0.95);
  }
}

.tooltip-content {
  padding: 1rem;
}

.tooltip-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-align: center;
}

.tooltip-progress {
  margin-bottom: 0.75rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.progress-text {
  font-size: 0.75rem;
  color: #cbd5e1;
  text-align: center;
  display: block;
}

.tooltip-shortcut {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.625rem;
  color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.5rem;
}

.shortcut-key {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-to-top-container:hover .back-to-top-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(-5px);
}

.back-to-top-btn.clicked {
  transform: translateY(-2px) scale(0.95);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.8) rotate(180deg);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.8) rotate(-180deg);
}

@media (max-width: 639px) {
  .back-to-top-container {
    bottom: 7rem;
    right: 1rem;
  }

  .back-to-top-btn {
    width: 3rem;
    height: 3rem;
  }

  .back-to-top-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .back-to-top-tooltip {
    display: none;
  }
}

.progress-ring defs {
  position: absolute;
}
</style>
