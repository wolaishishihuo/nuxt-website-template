<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const isSubscribing = ref(false);
const preferences = ref({
  product: true,
  tech: true,
  industry: false,
  news: false
});

async function subscribeNewsletter() {
  if (!email.value)
    return;
  isSubscribing.value = true;
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 这里可以发送偏好设置到后端
    const subscriptionData = {
      email: email.value,
      preferences: preferences.value,
      timestamp: new Date().toISOString()
    };

    // eslint-disable-next-line no-console
    console.log('Subscription data:', subscriptionData);

    // 显示成功消息
    // eslint-disable-next-line no-alert
    alert('🎉 订阅成功！\n\n欢迎加入我们的智能推送家族！\n我们会根据您的偏好为您推送最有价值的内容。\n\n第一封欢迎邮件将在24小时内送达。');

    // 重置表单
    email.value = '';
    preferences.value = {
      product: true,
      tech: true,
      industry: false,
      news: false
    };
  }
  catch {
    // eslint-disable-next-line no-alert
    alert('❌ 订阅失败\n\n网络连接异常，请稍后重试或联系客服。');
  }
  finally {
    isSubscribing.value = false;
  }
}
</script>

<template>
  <section class="newsletter_section">
    <div class="container">
      <div class="newsletter_content animate_on_scroll">
        <div class="newsletter_header">
          <div class="newsletter_icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="newsletter_title">
            📧 智能订阅中心
          </h2>
          <div class="newsletter_badges">
            <span class="badge badge_premium">🎯 精准推送</span>
            <span class="badge badge_ai">🤖 AI定制</span>
            <span class="badge badge_free">🆓 完全免费</span>
          </div>
        </div>
        <p class="newsletter_description">
          🚀 个性化内容推荐，基于您的兴趣偏好<br>
          💼 最新行业趋势分析，助力商业决策<br>
          🔧 独家技术教程分享，提升专业技能<br>
          📊 产品更新抢先知，掌握一手资讯
        </p>
        <form class="newsletter_form" @submit.prevent="subscribeNewsletter">
          <div class="form_group">
            <div class="input_wrapper">
              <div class="input_icon">
                ✉️
              </div>
              <input
                v-model="email"
                type="email"
                placeholder="输入您的邮箱，开启智能推送之旅"
                class="email_input"
                required
              >
            </div>
            <button type="submit" class="subscribe_btn" :disabled="isSubscribing">
              <span v-if="!isSubscribing">
                <svg class="btn_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                立即订阅
              </span>
              <span v-else class="loading_text">
                <div class="spinner" />
                处理中...
              </span>
            </button>
          </div>

          <div class="subscription_options">
            <h4>📋 订阅偏好设置</h4>
            <div class="options_grid">
              <label class="option_item">
                <input v-model="preferences.product" type="checkbox">
                <span class="checkmark">🚀</span>
                产品更新
              </label>
              <label class="option_item">
                <input v-model="preferences.tech" type="checkbox">
                <span class="checkmark">💻</span>
                技术教程
              </label>
              <label class="option_item">
                <input v-model="preferences.industry" type="checkbox">
                <span class="checkmark">📈</span>
                行业洞察
              </label>
              <label class="option_item">
                <input v-model="preferences.news" type="checkbox">
                <span class="checkmark">📰</span>
                新闻资讯
              </label>
            </div>
          </div>

          <div class="trust_indicators">
            <div class="trust_item">
              <span class="trust_icon">🔒</span>
              <span>隐私保护</span>
            </div>
            <div class="trust_item">
              <span class="trust_icon">📊</span>
              <span>50000+订阅</span>
            </div>
            <div class="trust_item">
              <span class="trust_icon">⭐</span>
              <span>4.9分好评</span>
            </div>
            <div class="trust_item">
              <span class="trust_icon">📧</span>
              <span>周推送2-3次</span>
            </div>
          </div>

          <p class="privacy_note">
            📄 我们严格遵守GDPR隐私规定，您的数据安全是我们的首要责任<br>
            🎯 基于AI算法为您精准推荐感兴趣的内容<br>
            🚫 随时可取消订阅，一键退订无任何限制
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.newsletter_section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  position: relative;
  overflow: hidden;
}

.newsletter_section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%);
  z-index: 1;
}

.newsletter_section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
}

.newsletter_content {
  text-align: center;
  max-width: 42rem;
  margin: 0 auto;
  position: relative;
}

.newsletter_header {
  margin-bottom: 2rem;
}

.newsletter_icon {
  width: 4rem;
  height: 4rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.newsletter_icon svg {
  width: 2rem;
  height: 2rem;
}

.newsletter_title {
  font-size: 2.25rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.newsletter_badges {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge_premium {
  background: rgba(236, 72, 153, 0.2);
  color: #fce7f3;
}

.badge_ai {
  background: rgba(99, 102, 241, 0.2);
  color: #e0e7ff;
}

.badge_free {
  background: rgba(34, 197, 94, 0.2);
  color: #dcfce7;
}

.newsletter_description {
  color: #cbd5e1;
  margin-bottom: 2.5rem;
  font-size: 1rem;
  line-height: 1.7;
  font-weight: 400;
  text-align: left;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

.newsletter_form {
  margin-bottom: 1.5rem;
}

.form_group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 32rem;
  margin: 0 auto 2rem;
  position: relative;
}

.input_wrapper {
  flex: 1;
  position: relative;
}

.input_icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  z-index: 3;
}

.email_input {
  width: 100%;
  padding: 1rem 1.25rem 1rem 3rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
}

.subscribe_btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
}

.btn_icon {
  width: 1rem;
  height: 1rem;
}

.loading_text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.subscription_options {
  margin-bottom: 2rem;
  text-align: left;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

.subscription_options h4 {
  color: #e2e8f0;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.options_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.option_item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked + .checkmark {
    background: rgba(59, 130, 246, 0.3);
    border-color: #3b82f6;
  }

  .checkmark {
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  span:last-child {
    color: #e2e8f0;
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.trust_indicators {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

.trust_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  .trust_icon {
    font-size: 1.5rem;
  }

  span:last-child {
    color: #cbd5e1;
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
  }
}

.privacy_note {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.4;
  max-width: 28rem;
  margin: 0 auto;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '🔒';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .newsletter_section {
    padding: 4rem 0;
  }

  .newsletter_title {
    font-size: 1.875rem;
  }

  .newsletter_badges {
    justify-content: center;
    gap: 0.5rem;
  }

  .form_group {
    flex-direction: column;
    gap: 1rem;
  }

  .email_input {
    padding: 0.875rem 1rem 0.875rem 2.5rem;
  }

  .subscribe_btn {
    padding: 0.875rem 1rem;
    min-width: auto;
  }

  .options_grid {
    grid-template-columns: 1fr;
  }

  .trust_indicators {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .trust_item {
    padding: 0.75rem 0.5rem;

    .trust_icon {
      font-size: 1.25rem;
    }

    span:last-child {
      font-size: 0.7rem;
    }
  }

  .privacy_note {
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.5;
  }
}
</style>
