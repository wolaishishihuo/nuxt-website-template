<script setup lang="ts">
import {
  AcademicCapIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  HeartIcon,
  ShoppingBagIcon
} from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const hoveredCard = ref<string | null>(null);

const solutions = [
  {
    id: 'education',
    icon: AcademicCapIcon,
    title: '教育行业',
    category: '在线教育',
    description: '为学校、培训机构提供专业的教育官网解决方案，打造现代化数字校园',
    features: ['在线课程管理', '学员注册系统', '证书认证', '成绩查询', '师资展示'],
    color: '#3b82f6',
    colorDark: '#1d4ed8',
    clients: 500,
    satisfaction: 98,
    popular: true,
    link: '#'
  },
  {
    id: 'healthcare',
    icon: HeartIcon,
    title: '医疗健康',
    category: '医疗服务',
    description: '为医院、诊所提供符合行业标准的官网方案，提升医疗服务质量',
    features: ['在线预约挂号', '医生排班', '健康资讯发布', '病历管理', '远程咨询'],
    color: '#10b981',
    colorDark: '#059669',
    clients: 300,
    satisfaction: 96,
    popular: false,
    link: '#'
  },
  {
    id: 'ecommerce',
    icon: ShoppingBagIcon,
    title: '电商零售',
    category: '电子商务',
    description: '为电商企业提供高转化率的官网解决方案，助力业务快速增长',
    features: ['商品展示系统', '在线支付集成', '订单管理', '库存管理', '营销工具'],
    color: '#f59e0b',
    colorDark: '#d97706',
    clients: 800,
    satisfaction: 97,
    popular: true,
    link: '#'
  },
  {
    id: 'finance',
    icon: BanknotesIcon,
    title: '金融服务',
    category: '金融科技',
    description: '为金融机构提供安全可靠的官网解决方案，确保数据安全合规',
    features: ['多重安全防护', '合规审计', '数据加密', '风险控制', '客户管理'],
    color: '#8b5cf6',
    colorDark: '#7c3aed',
    clients: 200,
    satisfaction: 99,
    popular: false,
    link: '#'
  },
  {
    id: 'enterprise',
    icon: BuildingOfficeIcon,
    title: '企业服务',
    category: '企业官网',
    description: '为大中型企业提供品牌展示和业务拓展的综合性官网解决方案',
    features: ['企业形象展示', '产品服务介绍', '新闻发布系统', '招聘管理', 'SEO优化'],
    color: '#ef4444',
    colorDark: '#dc2626',
    clients: 600,
    satisfaction: 95,
    popular: false,
    link: '#'
  },
  {
    id: 'global',
    icon: GlobeAltIcon,
    title: '国际化',
    category: '跨境业务',
    description: '为跨国企业提供多语言、多地区的国际化官网解决方案',
    features: ['多语言支持', '本地化适配', '跨境支付', '全球CDN', '时区管理'],
    color: '#06b6d4',
    colorDark: '#0891b2',
    clients: 150,
    satisfaction: 94,
    popular: false,
    link: '#'
  }
];

function requestDemo(solutionId: string) {
  // eslint-disable-next-line no-console
  console.log(`申请 ${solutionId} 解决方案演示`);
  // 这里可以添加演示申请逻辑
}

function contactExpert() {
  // eslint-disable-next-line no-console
  console.log('联系专家');
  // 这里可以添加联系专家逻辑
}
</script>

<template>
  <section class="solutions-section">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          <span class="badge-text">行业解决方案</span>
        </div>
        <h2 class="section-title">
          专业定制化解决方案
        </h2>
        <p class="section-description">
          针对不同行业特点，提供量身定制的专业官网解决方案
        </p>
      </div>

      <div class="solutions-grid">
        <div
          v-for="(solution, index) in solutions"
          :key="solution.id"
          class="solution-card"
          :style="{
            '--solution-color': solution.color,
            '--solution-color-dark': solution.colorDark,
            'animationDelay': `${index * 0.1}s`,
          }"
          @mouseenter="hoveredCard = solution.id"
          @mouseleave="hoveredCard = null"
        >
          <div class="card-background">
            <div class="bg-pattern" :style="{ background: solution.color }" />
          </div>

          <div class="card-header">
            <div class="solution-icon">
              <component :is="solution.icon" class="icon" />
              <div class="icon-glow" />
            </div>
            <div class="solution-meta">
              <span class="solution-category">{{ solution.category }}</span>
              <div v-if="solution.popular" class="popularity-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" class="star-icon">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>热门</span>
              </div>
            </div>
          </div>

          <div class="card-content">
            <h3 class="solution-title">
              {{ solution.title }}
            </h3>
            <p class="solution-description">
              {{ solution.description }}
            </p>

            <div class="solution-features">
              <div
                v-for="feature in solution.features"
                :key="feature"
                class="feature-item"
              >
                <svg class="feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </div>
            </div>

            <div class="solution-stats">
              <div class="stat-item">
                <span class="stat-value">{{ solution.clients }}+</span>
                <span class="stat-label">客户选择</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ solution.satisfaction }}%</span>
                <span class="stat-label">满意度</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <NuxtLink :to="solution.link" class="solution-link">
              <span>了解详情</span>
              <svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </NuxtLink>
            <button class="demo-btn" @click="requestDemo(solution.id)">
              申请演示
            </button>
          </div>

          <div class="hover-overlay" :class="{ active: hoveredCard === solution.id }">
            <div class="overlay-content">
              <h4>案例展示</h4>
              <div class="case-preview">
                <div v-for="i in 3" :key="i" class="case-item">
                  <div class="case-thumb" />
                  <span>案例 {{ i }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 更多解决方案 -->
      <div class="more-solutions">
        <div class="more-content">
          <h3>需要定制化解决方案？</h3>
          <p>我们的专家团队将为您量身定制最适合的方案</p>
          <button class="contact-btn" @click="contactExpert">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            联系专家
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.solutions-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.solutions-section::before {
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

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.solution-card {
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

.solution-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-color: var(--solution-color);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.solution-card:hover .card-background {
  opacity: 0.03;
}

.bg-pattern {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  border-radius: 50%;
  animation: rotatePattern 20s linear infinite;
}

@keyframes rotatePattern {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem 2rem 0;
  margin-bottom: 1.5rem;
}

.solution-icon {
  position: relative;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, var(--solution-color), var(--solution-color-dark));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.solution-card:hover .solution-icon {
  transform: scale(1.1);
}

.solution-icon .icon {
  width: 2rem;
  height: 2rem;
  color: white;
  z-index: 2;
  position: relative;
}

.icon-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 1rem;
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.solution-meta {
  text-align: right;
}

.solution-category {
  display: block;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.popularity-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.star-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.card-content {
  padding: 0 2rem;
  margin-bottom: 2rem;
}

.solution-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.solution-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.solution-features {
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #374155;
}

.feature-check {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--solution-color);
  flex-shrink: 0;
}

.solution-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--solution-color);
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem 2rem;
  border-top: 1px solid #f1f5f9;
}

.solution-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--solution-color);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.solution-link:hover {
  color: var(--solution-color-dark);
  transform: translateX(4px);
}

.link-arrow {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.solution-link:hover .link-arrow {
  transform: translate(2px, -2px);
}

.demo-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  color: #64748b;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.demo-btn:hover {
  background: var(--solution-color);
  color: white;
  border-color: var(--solution-color);
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 1.5rem;
}

.hover-overlay.active {
  opacity: 1;
  transform: translateY(0);
}

.overlay-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.overlay-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
}

.case-preview {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.case-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.case-thumb {
  width: 3rem;
  height: 2rem;
  background: linear-gradient(135deg, var(--solution-color), var(--solution-color-dark));
  border-radius: 0.25rem;
  opacity: 0.8;
}

.more-solutions {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.more-solutions::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.more-content {
  position: relative;
  z-index: 1;
}

.more-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.more-content p {
  font-size: 1.125rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 768px) {
  .solutions-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .solutions-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .solution-meta {
    text-align: left;
  }

  .card-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .more-solutions {
    padding: 2rem;
  }

  .more-content h3 {
    font-size: 1.5rem;
  }
}
</style>
