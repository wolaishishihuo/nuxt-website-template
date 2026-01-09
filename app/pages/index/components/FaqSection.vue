<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const faqs = [
  {
    id: 1,
    icon: '🚀',
    category: '快速入门',
    question: '如何在5分钟内搭建专业官网？',
    answer: '仅需三步：①免费注册账号 ②选择AI推荐模板 ③拖拽式编辑发布。我们的智能设计助手将根据您的行业特点，自动推荐最适合的设计方案，让您的官网瞬间脱颖而出！',
    tags: ['新手必看', '快速上手']
  },
  {
    id: 2,
    icon: '🌐',
    category: '域名服务',
    question: '域名绑定和SSL证书配置复杂吗？',
    answer: '完全不用担心！我们提供一键域名绑定服务，自动配置免费SSL证书。支持.com、.cn、.net等主流域名，还有专业技术团队24小时协助解决域名解析问题。',
    tags: ['域名绑定', 'SSL证书', '技术支持']
  },
  {
    id: 3,
    icon: '💎',
    category: '套餐方案',
    question: '哪个套餐最适合我的企业需求？',
    answer: '🎯 个人版：适合个人博客、作品展示（￥99/年）\n🏢 企业版：适合中小企业官网、在线商城（￥299/年）\n🚀 旗舰版：适合大型企业、定制需求（￥899/年）\n我们还提供15天免费试用，让您零风险体验所有功能！',
    tags: ['套餐对比', '价格透明', '免费试用']
  },
  {
    id: 4,
    icon: '🛠️',
    category: '技术支持',
    question: '遇到问题如何获得及时帮助？',
    answer: '我们提供全方位技术支持：\n📞 7x24小时在线客服\n💬 微信群专属技术顾问\n📧 邮件工单系统\n📚 详细的视频教程库\n🎯 一对一专属服务（企业版及以上）\n平均响应时间仅需30秒！',
    tags: ['24小时客服', '技术支持', '快速响应']
  },
  {
    id: 5,
    icon: '🔒',
    category: '安全保障',
    question: '我的网站数据和用户信息安全吗？',
    answer: '绝对安全！我们采用：\n🛡️ 银行级256位SSL加密\n💾 每日自动备份，支持一键恢复\n🔍 24小时安全监控系统\n🏆 通过ISO27001信息安全认证\n⚡ CDN全球加速，99.9%稳定运行\n您的数据安全是我们的首要任务！',
    tags: ['数据安全', '加密保护', '备份恢复']
  },
  {
    id: 6,
    icon: '📱',
    category: '移动优化',
    question: '网站在手机上的展示效果如何？',
    answer: '完美适配！我们采用响应式设计技术，确保您的网站在所有设备上都有完美表现：\n📱 手机端自适应布局\n💻 平板电脑优化显示\n🖥️ 桌面端高清呈现\n⚡ 移动端加载速度提升300%\n所有模板都经过严格的移动端测试！',
    tags: ['响应式设计', '移动优化', '跨设备兼容']
  }
];
const activeFaq = ref<number | null>(null);
const helpfulMarks = ref<Set<number>>(new Set());

function toggleFaq(id: number) {
  activeFaq.value = activeFaq.value === id ? null : id;
}

function markHelpful(id: number) {
  helpfulMarks.value.add(id);
  // 这里可以添加发送反馈到服务器的逻辑
  // eslint-disable-next-line no-console
  console.log(`FAQ ${id} marked as helpful`);
}

function contactSupport() {
  // 这里可以添加联系客服的逻辑
  // eslint-disable-next-line no-console
  console.log('Contact support clicked');
}

function showCallbackForm() {
  // 这里可以添加显示预约回电表单的逻辑
  // eslint-disable-next-line no-console
  console.log('Show callback form');
}
</script>

<template>
  <section class="faq_section">
    <div class="faq_container">
      <div class="section_header animate_on_scroll">
        <div class="header_icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" />
            <path d="m9,9 0,0a3,3 0 1,1 6,0c0,2-3,3-3,3" />
            <path d="m12,17.02.01,0" />
          </svg>
        </div>
        <h2 class="section_title">
          💡 智能问答中心
        </h2>
        <p class="section_description">
          您的疑问，我们的专业解答 | 7x24小时智能客服为您服务
        </p>
      </div>
      <div class="faq_list">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.id"
          class="faq_item animate_on_scroll"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div
            class="faq_question"
            :class="{ active: activeFaq === faq.id }"
            @click="toggleFaq(faq.id)"
          >
            <div class="question_content">
              <div class="question_header">
                <span class="faq_emoji">{{ faq.icon }}</span>
                <div class="question_info">
                  <span class="faq_category">{{ faq.category }}</span>
                  <h3>{{ faq.question }}</h3>
                </div>
              </div>
              <div class="question_tags">
                <span v-for="tag in faq.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <ChevronDownIcon
              class="faq_icon"
              :class="{ rotated: activeFaq === faq.id }"
            />
          </div>
          <div
            class="faq_answer"
            :class="{ open: activeFaq === faq.id }"
          >
            <div class="answer_content">
              <p v-html="faq.answer.replace(/\n/g, '<br>')" />
              <div class="answer_actions">
                <button class="helpful_btn" @click.stop="markHelpful(faq.id)">
                  👍 有帮助
                </button>
                <button class="contact_btn" @click.stop="contactSupport">
                  💬 联系客服
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="faq_cta animate_on_scroll">
        <div class="cta_content">
          <div class="cta_icon">
            🤝
          </div>
          <h3>还没找到您想要的答案？</h3>
          <p>我们的专业团队随时为您提供个性化解答</p>
          <div class="cta_actions">
            <NuxtLink to="#" class="faq_btn faq_btn_primary">
              <span>💬</span>
              在线咨询
            </NuxtLink>
            <button class="faq_btn faq_btn_secondary" @click="showCallbackForm">
              <span>📞</span>
              预约回电
            </button>
          </div>
          <div class="cta_stats">
            <div class="stat">
              <span class="stat_number">10000+</span>
              <span class="stat_label">问题已解决</span>
            </div>
            <div class="stat">
              <span class="stat_number">30秒</span>
              <span class="stat_label">平均响应时间</span>
            </div>
            <div class="stat">
              <span class="stat_number">99.9%</span>
              <span class="stat_label">客户满意度</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq_section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

.faq_section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.faq_container {
  position: relative;
  z-index: 2;
}

.faq_list {
  max-width: 48rem;
  margin: 0 auto;
}

.faq_item {
  background: white;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
}

.faq_item:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.section_header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.header_icon {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.header_icon svg {
  width: 2rem;
  height: 2rem;
}

.faq_question {
  padding: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.faq_question::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.faq_question:hover::before {
  opacity: 0.05;
}

.faq_question.active {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
}

.question_content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.question_header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.faq_emoji {
  font-size: 1.5rem;
  line-height: 1;
  margin-top: 0.25rem;
}

.question_info {
  flex: 1;
}

.faq_category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.faq_question h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  color: #1f2937;
}

.faq_question.active h3 {
  color: #1e40af;
}

.question_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.faq_icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #3b82f6;
  position: relative;
  z-index: 1;
}

.faq_icon.rotated {
  transform: rotate(180deg);
}

.faq_answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.faq_answer.open {
  max-height: 400px;
  padding: 0 2rem 2rem;
}

.answer_content {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
}

.faq_answer p {
  color: #475569;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.answer_actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.helpful_btn, .contact_btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.helpful_btn {
  background: #dcfce7;
  color: #16a34a;
}

.helpful_btn:hover {
  background: #bbf7d0;
  transform: translateY(-1px);
}

.contact_btn {
  background: #dbeafe;
  color: #2563eb;
}

.contact_btn:hover {
  background: #bfdbfe;
  transform: translateY(-1px);
}

.faq_cta {
  text-align: center;
  margin-top: 4rem;
  padding: 3rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.faq_cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.cta_content {
  position: relative;
  z-index: 2;
}

.cta_icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.faq_cta h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.faq_cta p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.cta_actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.faq_btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.faq_btn_primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
}

.faq_btn_primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

.faq_btn_secondary {
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.faq_btn_secondary:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

.cta_stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.stat {
  text-align: center;
}

.stat_number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat_label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

@media (max-width: 768px) {
  .faq_question {
    padding: 1.5rem;
  }

  .question_header {
    gap: 0.75rem;
  }

  .faq_emoji {
    font-size: 1.25rem;
  }

  .faq_question h3 {
    font-size: 1rem;
  }

  .faq_answer.open {
    padding: 0 1.5rem 1.5rem;
  }

  .cta_actions {
    flex-direction: column;
    align-items: center;
  }

  .cta_stats {
    flex-direction: column;
    gap: 1rem;
  }

  .faq_btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>
