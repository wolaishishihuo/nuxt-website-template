<script setup lang="ts">
import { BuildingOfficeIcon, ChartBarIcon, GlobeAltIcon, UsersIcon } from '@heroicons/vue/24/outline';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

const statsSection = ref<HTMLElement>();
const animatedNumbers = reactive<Record<string, number>>({});
const observer = ref<IntersectionObserver>();

const companyStats = [
  {
    id: 'users',
    icon: UsersIcon,
    value: 50000,
    suffix: '+',
    label: '活跃用户',
    description: '全球注册用户数量'
  },
  {
    id: 'companies',
    icon: BuildingOfficeIcon,
    value: 1200,
    suffix: '+',
    label: '企业客户',
    description: '合作企业伙伴'
  },
  {
    id: 'projects',
    icon: ChartBarIcon,
    value: 8500,
    suffix: '+',
    label: '成功项目',
    description: '已完成项目总数'
  },
  {
    id: 'countries',
    icon: GlobeAltIcon,
    value: 65,
    suffix: '+',
    label: '服务国家',
    description: '覆盖全球市场'
  }
];

function getProgressWidth(value: number) {
  const maxValue = Math.max(...companyStats.map(stat => stat.value));
  return (value / maxValue) * 100;
}

function animateNumber(targetValue: number, statId: string, duration = 2000) {
  const startTime = Date.now();
  const startValue = 0;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // 使用 easeOutCubic 缓动函数
    const easeProgress = 1 - (1 - progress) ** 3;
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);

    animatedNumbers[statId] = currentValue;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  animate();
}

function startAnimation() {
  companyStats.forEach((stat, index) => {
    setTimeout(() => {
      animateNumber(stat.value, stat.id);
    }, index * 200);
  });
}

onMounted(() => {
  // 初始化数字为0
  companyStats.forEach((stat) => {
    animatedNumbers[stat.id] = 0;
  });

  // 设置观察器
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.value?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (statsSection.value) {
    observer.value.observe(statsSection.value);
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <section ref="statsSection" class="stats-section">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          <span class="badge-text">数据统计</span>
        </div>
        <h2 class="section-title">
          我们的成就
        </h2>
        <p class="section-description">
          用数据说话，见证我们的成长与影响力
        </p>
      </div>

      <div class="stats-grid">
        <div
          v-for="(stat, index) in companyStats"
          :key="stat.id"
          class="stat-card"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="stat-background">
            <div class="background-pattern" />
          </div>

          <div class="stat-icon-container">
            <div class="stat-icon">
              <component :is="stat.icon" class="icon" />
            </div>
            <div class="icon-glow" />
          </div>

          <div class="stat-content">
            <div class="stat-number-container">
              <div class="stat-number" :data-target="stat.value">
                {{ animatedNumbers[stat.id] || 0 }}
              </div>
              <div class="stat-suffix">
                {{ stat.suffix }}
              </div>
            </div>
            <div class="stat-label">
              {{ stat.label }}
            </div>
            <div class="stat-description">
              {{ stat.description }}
            </div>
          </div>

          <div class="stat-progress">
            <div class="progress-bar" :style="{ width: `${getProgressWidth(stat.value)}%` }" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 2rem;
  margin-bottom: 1rem;
}

.badge-text {
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.stat-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-background {
  opacity: 0.06;
}

.background-pattern {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  animation: rotatePattern 20s linear infinite;
}

@keyframes rotatePattern {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.stat-icon-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.stat-icon {
  width: 4.5rem;
  height: 4.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

.icon {
  width: 2.25rem;
  height: 2.25rem;
  color: white;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
}

.stat-content {
  flex: 1;
}

.stat-number-container {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.stat-suffix {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
}

.stat-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
}

.stat-description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.4;
}

.stat-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(226, 232, 240, 0.6);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.5s;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .stat-card {
    padding: 2rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .stat-icon {
    width: 3.5rem;
    height: 3.5rem;
  }

  .icon {
    width: 1.75rem;
    height: 1.75rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stat-card {
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
