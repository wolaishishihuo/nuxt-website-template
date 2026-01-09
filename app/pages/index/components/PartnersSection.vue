<script setup lang="ts">
import { ref } from 'vue';

const hoveredPartner = ref<string | null>(null);

const partners = [
  {
    id: 'tech-global',
    name: 'TechGlobal',
    type: '技术合作伙伴',
    description: '全球领先的云计算服务提供商，为我们提供强大的基础设施支持',
    color: '#3b82f6',
    level: 'strategic',
    field: '云计算',
    years: 5,
    benefits: ['技术支持', '优先服务', '定制方案'],
    achievements: ['共同服务1000+客户', '节省30%成本', '99.9%可用性']
  },
  {
    id: 'innovate-labs',
    name: 'InnovateLabs',
    type: '创新合作伙伴',
    description: '专注于人工智能和机器学习的创新实验室',
    color: '#10b981',
    level: 'premium',
    field: '人工智能',
    years: 3,
    benefits: ['技术创新', '研发合作', '人才交流'],
    achievements: ['联合研发5项专利', '推出3款AI产品', '获得行业认可']
  },
  {
    id: 'design-studio',
    name: 'DesignStudio',
    type: '设计合作伙伴',
    description: '国际知名的用户体验设计公司',
    color: '#f59e0b',
    level: 'standard',
    field: 'UI/UX设计',
    years: 2,
    benefits: ['设计咨询', '用户研究', '品牌升级'],
    achievements: ['优化用户体验', '提升20%转化率', '获得设计大奖']
  },
  {
    id: 'secure-systems',
    name: 'SecureSystems',
    type: '安全合作伙伴',
    description: '网络安全解决方案专家',
    color: '#ef4444',
    level: 'strategic',
    field: '网络安全',
    years: 4,
    benefits: ['安全审计', '风险评估', '应急响应'],
    achievements: ['零安全事故', '通过SOC2认证', '24/7安全监控']
  },
  {
    id: 'data-analytics',
    name: 'DataAnalytics',
    type: '数据合作伙伴',
    description: '大数据分析和商业智能服务提供商',
    color: '#8b5cf6',
    level: 'premium',
    field: '数据分析',
    years: 3,
    benefits: ['数据洞察', '智能报告', '预测分析'],
    achievements: ['提升决策效率', '发现新商机', '优化运营成本']
  },
  {
    id: 'mobile-first',
    name: 'MobileFirst',
    type: '移动合作伙伴',
    description: '移动应用开发和优化专家',
    color: '#06b6d4',
    level: 'standard',
    field: '移动开发',
    years: 2,
    benefits: ['移动优化', '跨平台开发', '性能提升'],
    achievements: ['移动用户增长50%', 'App Store推荐', '用户评分4.8+']
  }
];

function getLevelText(level: string) {
  const levelMap: Record<string, string> = {
    strategic: '战略合作',
    premium: '高级合作',
    standard: '标准合作'
  };
  return levelMap[level] || level;
}

function applyPartnership() {
  // eslint-disable-next-line no-console
  console.log('申请合作伙伴');
  // 这里可以添加申请合作逻辑
}
</script>

<template>
  <section class="partners-section">
    <div class="container">
      <div class="section-header">
        <div class="badge">
          <span class="badge-text">合作伙伴</span>
        </div>
        <h2 class="section-title">
          与行业领先企业携手并进
        </h2>
        <p class="section-description">
          我们与全球知名企业建立战略合作关系，共同推动数字化创新
        </p>
      </div>

      <div class="partners-showcase">
        <!-- 合作伙伴统计 -->
        <div class="partnership-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">100+</span>
              <span class="stat-label">合作伙伴</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16 10,8" />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">50+</span>
              <span class="stat-label">国家地区</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-number">98%</span>
              <span class="stat-label">合作满意度</span>
            </div>
          </div>
        </div>

        <!-- 合作伙伴网格 -->
        <div class="partners-grid">
          <div
            v-for="(partner, index) in partners"
            :key="partner.id"
            class="partner-card"
            :style="{
              '--partner-color': partner.color,
              'animationDelay': `${index * 0.1}s`,
            }"
            @mouseenter="hoveredPartner = partner.id"
            @mouseleave="hoveredPartner = null"
          >
            <div class="partner-header">
              <div class="partner-logo">
                <div class="logo-bg" :style="{ background: partner.color }" />
                <span class="logo-text">{{ partner.name.charAt(0) }}</span>
              </div>
              <div class="partner-level">
                <span class="level-badge" :class="partner.level">
                  {{ getLevelText(partner.level) }}
                </span>
              </div>
            </div>

            <div class="partner-content">
              <h4 class="partner-name">
                {{ partner.name }}
              </h4>
              <p class="partner-type">
                {{ partner.type }}
              </p>
              <p class="partner-description">
                {{ partner.description }}
              </p>

              <div class="partnership-details">
                <div class="detail-item">
                  <span class="detail-label">合作领域</span>
                  <span class="detail-value">{{ partner.field }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">合作年限</span>
                  <span class="detail-value">{{ partner.years }}年</span>
                </div>
              </div>
            </div>

            <div class="partner-footer">
              <div class="partnership-benefits">
                <div
                  v-for="benefit in partner.benefits"
                  :key="benefit"
                  class="benefit-tag"
                >
                  {{ benefit }}
                </div>
              </div>
            </div>

            <div class="hover-overlay" :class="{ active: hoveredPartner === partner.id }">
              <div class="overlay-content">
                <h5>合作成果</h5>
                <div class="achievements">
                  <div
                    v-for="achievement in partner.achievements"
                    :key="achievement"
                    class="achievement-item"
                  >
                    <svg class="achievement-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ achievement }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 成为合作伙伴 -->
        <div class="become-partner">
          <div class="become-partner-content">
            <div class="content-left">
              <h3>成为我们的合作伙伴</h3>
              <p>加入我们的生态系统，共同创造更大的商业价值</p>
              <ul class="partner-benefits-list">
                <li>技术支持与培训</li>
                <li>市场推广合作</li>
                <li>优先资源配置</li>
                <li>共同开发机会</li>
              </ul>
            </div>
            <div class="content-right">
              <button class="apply-btn" @click="applyPartnership">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                申请合作
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.partners-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.partners-section::before {
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

.partnership-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.partner-card {
  background: white;
  border-radius: 1.5rem;
  padding: 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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

.partner-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-color: var(--partner-color);
}

.partner-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 0;
  margin-bottom: 1rem;
}

.partner-logo {
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  z-index: 1;
}

.partner-level {
  display: flex;
  align-items: center;
}

.level-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &.strategic {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
  }

  &.premium {
    background: linear-gradient(135deg, #a855f7, #8b5cf6);
    color: white;
  }

  &.standard {
    background: #e2e8f0;
    color: #64748b;
  }
}

.partner-content {
  padding: 0 2rem;
  margin-bottom: 1.5rem;
}

.partner-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.partner-type {
  font-size: 0.875rem;
  color: var(--partner-color);
  font-weight: 600;
  margin-bottom: 1rem;
}

.partner-description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.partnership-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail-item {
  text-align: center;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.detail-label {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.partner-footer {
  padding: 0 2rem 2rem;
}

.partnership-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.benefit-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
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

.overlay-content h5 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
}

.achievements {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374155;
}

.achievement-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--partner-color);
  flex-shrink: 0;
}

.become-partner {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 1.5rem;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.become-partner::before {
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

.become-partner-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.content-left h3 {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.content-left p {
  font-size: 1.125rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
}

.partner-benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.partner-benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #e2e8f0;
  font-size: 1rem;
}

.partner-benefits-list li::before {
  content: '✓';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.apply-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-icon {
  width: 1.5rem;
  height: 1.5rem;
}

@media (max-width: 1024px) {
  .partnership-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .partners-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .become-partner-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .partners-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .partners-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .partnership-details {
    grid-template-columns: 1fr;
  }

  .become-partner {
    padding: 2rem;
  }

  .content-left h3 {
    font-size: 1.5rem;
  }

  .apply-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
