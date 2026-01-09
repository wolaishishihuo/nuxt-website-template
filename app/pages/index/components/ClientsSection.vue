<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const currentSlide = ref(0);
const isTransitioning = ref(false);
const autoSlideInterval = ref<NodeJS.Timeout | null>(null);
const isPaused = ref(false);

const clientCompanies = [
  { id: 1, name: '创新科技', industry: '金融科技', description: '领先的数字金融解决方案提供商', color: '#3B82F6', employees: '10,000+', founded: '2015', cooperationYears: 3 },
  { id: 2, name: '智慧电商', industry: '电商平台', description: '新一代智能电商生态平台', color: '#10B981', employees: '5,000+', founded: '2018', cooperationYears: 2 },
  { id: 3, name: '未来AI', industry: '人工智能', description: '专注AI技术研发与应用', color: '#8B5CF6', employees: '3,000+', founded: '2019', cooperationYears: 1 },
  { id: 4, name: '云端科技', industry: '云计算', description: '企业级云服务解决方案专家', color: '#F59E0B', employees: '8,000+', founded: '2016', cooperationYears: 4 },
  { id: 5, name: '绿色能源', industry: '新能源', description: '绿色能源技术创新引领者', color: '#EF4444', employees: '12,000+', founded: '2014', cooperationYears: 5 },
  { id: 6, name: '生命科学', industry: '生物医药', description: '生命科学与医疗健康先驱', color: '#06B6D4', employees: '4,500+', founded: '2017', cooperationYears: 2 },
  { id: 7, name: '智能制造', industry: '制造业', description: '工业4.0智能制造解决方案', color: '#84CC16', employees: '15,000+', founded: '2013', cooperationYears: 6 },
  { id: 8, name: '教育未来', industry: '教育科技', description: '在线教育与知识服务平台', color: '#F97316', employees: '2,800+', founded: '2020', cooperationYears: 1 },
  { id: 9, name: '区块链科技', industry: '区块链', description: '分布式技术与数字资产服务', color: '#6366F1', employees: '1,200+', founded: '2021', cooperationYears: 1 },
  { id: 10, name: '物联网', industry: '物联网', description: '万物互联智慧城市建设者', color: '#EC4899', employees: '6,500+', founded: '2016', cooperationYears: 3 }
];

const logos = clientCompanies.map(client => ({
  id: client.id,
  name: client.name,
  color: client.color
}));

const displayedClients = computed(() => {
  const itemsPerSlide = 3;
  const start = currentSlide.value * itemsPerSlide;
  const end = start + itemsPerSlide;
  return clientCompanies.slice(start, end);
});

function getDarkerColor(color: string) {
  const colorMap: Record<string, string> = {
    '#3B82F6': '#1D4ED8',
    '#10B981': '#047857',
    '#8B5CF6': '#7C3AED',
    '#F59E0B': '#D97706',
    '#EF4444': '#DC2626',
    '#06B6D4': '#0891B2',
    '#84CC16': '#65A30D',
    '#F97316': '#EA580C',
    '#6366F1': '#4F46E5',
    '#EC4899': '#DB2777'
  };
  return colorMap[color] || color;
}

function nextSlide() {
  if (isTransitioning.value)
    return;

  isTransitioning.value = true;
  const maxSlide = Math.ceil(clientCompanies.length / 3) - 1;
  currentSlide.value = currentSlide.value >= maxSlide ? 0 : currentSlide.value + 1;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
}

function prevSlide() {
  if (isTransitioning.value)
    return;

  isTransitioning.value = true;
  const maxSlide = Math.ceil(clientCompanies.length / 3) - 1;
  currentSlide.value = currentSlide.value <= 0 ? maxSlide : currentSlide.value - 1;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
}

function goToSlide(index: number) {
  if (isTransitioning.value)
    return;

  isTransitioning.value = true;
  currentSlide.value = index;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
}

function startAutoSlide() {
  if (autoSlideInterval.value)
    return;

  autoSlideInterval.value = setInterval(() => {
    if (!isPaused.value) {
      nextSlide();
    }
  }, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value);
    autoSlideInterval.value = null;
  }
}

function pauseAutoSlide() {
  isPaused.value = true;
}

function resumeAutoSlide() {
  isPaused.value = false;
}

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <section class="clients-section">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          <span class="badge-text">合作伙伴</span>
        </div>
        <h2 class="section-title">
          信赖我们的企业伙伴
        </h2>
        <p class="section-description">
          与各行业领军企业深度合作，共创数字化未来
        </p>
      </div>

      <!-- 无限滚动Logo墙 -->
      <div class="logos-section">
        <div class="logos-track" :style="{ animationDuration: `${logos.length * 3}s` }">
          <div
            v-for="(logo, index) in [...logos, ...logos]"
            :key="`${logo.id}-${index}`"
            class="logo-item"
          >
            <div class="logo-container">
              <div class="logo-bg" :style="{ background: logo.color }" />
              <span class="logo-text">{{ logo.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 客户卡片展示 -->
      <div class="clients-grid">
        <div
          v-for="(client, index) in displayedClients"
          :key="client.id"
          class="client-card"
          :style="{
            '--client-color': client.color,
            '--client-color-dark': getDarkerColor(client.color),
            'animationDelay': `${index * 0.1}s`,
          }"
          @mouseenter="pauseAutoSlide"
          @mouseleave="resumeAutoSlide"
        >
          <div class="card-header">
            <div class="client-logo">
              <div class="logo-text">
                {{ client.name }}
              </div>
              <div class="logo-glow" />
            </div>
            <div class="industry-tag">
              {{ client.industry }}
            </div>
          </div>

          <div class="card-body">
            <h3 class="client-name">
              {{ client.name }}
            </h3>
            <p class="client-description">
              {{ client.description }}
            </p>

            <div class="client-metrics">
              <div class="metric-item">
                <div class="metric-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div class="metric-content">
                  <span class="metric-value">{{ client.employees }}</span>
                  <span class="metric-label">员工规模</span>
                </div>
              </div>

              <div class="metric-item">
                <div class="metric-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div class="metric-content">
                  <span class="metric-value">{{ client.founded }}</span>
                  <span class="metric-label">成立年份</span>
                </div>
              </div>
            </div>

            <div class="partnership-info">
              <div class="partnership-badge">
                <svg class="badge-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>战略合作伙伴</span>
              </div>
              <div class="cooperation-duration">
                合作{{ client.cooperationYears }}年
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 轮播控制 -->
      <div class="carousel-controls">
        <button class="control-btn prev" :disabled="isTransitioning" @click="prevSlide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div class="slide-indicators">
          <button
            v-for="(_, index) in Math.ceil(clientCompanies.length / 3)"
            :key="index"
            class="indicator" :class="[{ active: currentSlide === index }]"
            @click="goToSlide(index)"
          />
        </div>
        <button class="control-btn next" :disabled="isTransitioning" @click="nextSlide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.clients-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.clients-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
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

/* 无限滚动Logo墙 */
.logos-section {
  margin-bottom: 4rem;
  overflow: hidden;
  position: relative;
}

.logos-section::before,
.logos-section::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.logos-section::before {
  left: 0;
  background: linear-gradient(90deg, #f8fafc 0%, transparent 100%);
}

.logos-section::after {
  right: 0;
  background: linear-gradient(270deg, #f8fafc 0%, transparent 100%);
}

.logos-track {
  display: flex;
  gap: 3rem;
  animation: scrollLogos linear infinite;
}

.logo-item {
  flex-shrink: 0;
}

.logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 120px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.logo-container:hover {
  opacity: 1;
}

.logo-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  opacity: 0.1;
}

.logo-text {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
  z-index: 1;
  position: relative;
}

@keyframes scrollLogos {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 客户卡片网格 */
.clients-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.client-card {
  background: white;
  border-radius: 1.5rem;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.8);
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.client-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-color: var(--client-color);
}

.client-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--client-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.client-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: 1rem;
}

.client-logo {
  position: relative;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--client-color), var(--client-color-dark));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.client-logo .logo-text {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.logo-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.industry-tag {
  padding: 0.375rem 0.75rem;
  background: var(--client-color);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.card-body {
  padding: 0 1.5rem 1.5rem;
}

.client-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.client-description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.client-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.metric-item:hover {
  background: #f1f5f9;
  border-color: var(--client-color);
}

.metric-icon {
  width: 2rem;
  height: 2rem;
  color: var(--client-color);
  flex-shrink: 0;
}

.metric-content {
  flex: 1;
}

.metric-value {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
}

.metric-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.125rem;
}

.partnership-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.partnership-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.badge-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.cooperation-duration {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

/* 轮播控制 */
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.control-btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.control-btn:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  transform: scale(1.05);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.slide-indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #cbd5e1;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #3b82f6;
  transform: scale(1.2);
}

.indicator:hover {
  background: #64748b;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .clients-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .clients-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .clients-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .client-metrics {
    grid-template-columns: 1fr;
  }

  .partnership-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .logos-track {
    gap: 2rem;
  }

  .logo-container {
    width: 100px;
    height: 60px;
  }

  .logo-text {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .carousel-controls {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
