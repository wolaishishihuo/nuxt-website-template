<script setup lang="ts">
import { ref } from 'vue';

const isChatOpen = ref(false);
const isMinimized = ref(false);
const chatMessage = ref('');
const isTyping = ref(false);
const messages = ref<Array<{
  id: number
  text: string
  type: 'user' | 'bot'
  timestamp: Date
}>>([]);

const chatContent = ref<HTMLElement | null>(null);

function preventOuterScroll(e: WheelEvent) {
  const el = chatContent.value;
  if (!el)
    return;
  const { scrollTop, scrollHeight, clientHeight } = el;
  const delta = e.deltaY;
  if (
    (delta < 0 && scrollTop === 0)
    || (delta > 0 && scrollTop + clientHeight >= scrollHeight)
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
}

const aiResponses = {
  产品功能和价格: '💰 我们提供多种套餐选择：基础版￥99/年、专业版￥299/年、企业版￥899/年。所有套餐都包含免费试用，您可以先体验后选择。需要详细价格对比吗？',
  技术支持和服务: '🛠️ 我们提供7x24小时技术支持，包括：在线客服、邮件支持、远程协助、视频教程。企业版用户还享有专属技术顾问和上门服务。您遇到什么技术问题了吗？',
  免费试用和演示: '🎆 您可以立即获得15天免费试用！我们还提供1对1在线演示服务，由专业顾问为您介绍产品功能。您希望预约哪个时间段的演示？',
  商务合作洽谈: '🤝 欢迎与我们合作！我们有丰富的合作模式：代理商合作、技术集成、定制开发等。请留下您的联系方式，我们的商务经理将圡24小时内与您联系。',
  产品定制开发: '⚙️ 我们提供专业的定制开发服务，包括：个性化界面设计、业务流程定制、第三方系统集成等。请描述您的具体需求，我们将为您定制最优方案。',
  培训和教程: '🎓 我们提供丰富的学习资源：在线文档、视频教程、线上直播课程、线下企业培训。还有专业认证考试和技术社区交流。您对哪个方面的培训感兴趣？'
};

function toggleChat() {
  isChatOpen.value = !isChatOpen.value;
  isMinimized.value = false;
}

function minimizeChat() {
  isMinimized.value = !isMinimized.value;
}

async function sendMessage() {
  if (!chatMessage.value.trim() || isTyping.value)
    return;

  const userMessage = {
    id: Date.now(),
    text: chatMessage.value,
    type: 'user' as const,
    timestamp: new Date()
  };

  messages.value.push(userMessage);
  const currentMessage = chatMessage.value;
  chatMessage.value = '';

  // 显示打字指示器
  isTyping.value = true;

  // 模拟AI处理时间
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  // 生成AI回复
  const aiResponse = generateAIResponse(currentMessage);

  const botMessage = {
    id: Date.now() + 1,
    text: aiResponse,
    type: 'bot' as const,
    timestamp: new Date()
  };

  messages.value.push(botMessage);
  isTyping.value = false;

  // 滚动到底部
  setTimeout(() => {
    const chatContent = document.querySelector('.chat-content');
    if (chatContent) {
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }, 100);
}

function generateAIResponse(message: string) {
  // 检查是否匹配快速问题
  for (const [question, response] of Object.entries(aiResponses)) {
    if (message.includes(question) || question.includes(message)) {
      return response;
    }
  }

  // 针对关键词的智能回复
  if (message.includes('价格') || message.includes('多少钱') || message.includes('费用')) {
    return '💰 关于价格，我们有多个套餐可选。您可以先免费试用，再根据需求选择合适的付费计划。需要我为您详细介绍各个套餐吗？';
  }

  if (message.includes('功能') || message.includes('作用') || message.includes('可以做')) {
    return '🚀 我们的产品主要功能包括：可视化网站搭建、智能模板库、响应式设计、SEO优化、数据分析等。您对哪个功能特别感兴趣？';
  }

  if (message.includes('联系') || message.includes('电话') || message.includes('微信')) {
    return '📞 您可以通过以下方式联系我们：\n• 在线客服：7x24小时在线\n• 客服热线：400-888-8888\n• 微信客服：weixin123\n• 邮箱支持：support@example.com';
  }

  // 默认回复
  return '🤖 感谢您的咨询！我正在学习中，对于这个问题我需要转接人工客服。请您点击上方的快速问题，或者留下您的联系方式，我们的专业顾问将主动联系您。';
}

function handleTyping() {
  // 可以在这里添加打字指示逻辑
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function attachFile() {
  // eslint-disable-next-line no-console
  console.log('上传文件');
}

function openEmoji() {
  // eslint-disable-next-line no-console
  console.log('打开表情选择器');
}
</script>

<template>
  <div class="chat-widget" :class="{ open: isChatOpen }">
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        <div class="chat-header-content">
          <div class="chat-avatar">
            <div class="avatar-image">
              🤖
            </div>
            <div class="status-indicator online" />
          </div>
          <div class="chat-info">
            <h3>智能客服 AI</h3>
            <p class="chat-status">
              🟢 在线 - 平均响应 &lt; 30秒
            </p>
          </div>
        </div>
        <div class="chat-actions">
          <button class="minimize-btn" title="最小化" @click="minimizeChat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <button class="close-chat" title="关闭" @click="toggleChat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div ref="chatContent" class="chat-content" @wheel="preventOuterScroll">
        <div class="welcome-message">
          <div class="chat-message bot">
            <div class="message-avatar">
              🤖
            </div>
            <div class="message-content">
              <p>👋 欢迎使用智能客服！</p>
              <p>我是您的AI助手，可以帮您解答以下问题：</p>
            </div>
          </div>
        </div>

        <div v-if="messages.length > 0" class="chat-messages">
          <div
            v-for="message in messages"
            :key="message.id"
            class="chat-message" :class="[message.type]"
          >
            <div v-if="message.type === 'bot'" class="message-avatar">
              🤖
            </div>
            <div class="message-content">
              <p>{{ message.text }}</p>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
            </div>
            <div v-if="message.type === 'user'" class="message-avatar user">
              👤
            </div>
          </div>
        </div>

        <div v-if="isTyping" class="typing-indicator">
          <div class="message-avatar">
            🤖
          </div>
          <div class="typing-content">
            <div class="typing-dots">
              <span />
              <span />
              <span />
            </div>
            <span class="typing-text">AI正在思考...</span>
          </div>
        </div>
      </div>
      <div class="chat-input">
        <div class="input-wrapper">
          <div class="input-actions">
            <button class="action-btn" title="上传文件" @click="attachFile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <button class="action-btn" title="表情" @click="openEmoji">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
          </div>
          <input
            v-model="chatMessage"
            placeholder="输入您的问题，或点击上方快速问题..."
            class="message-input"
            :disabled="isTyping"
            @keyup.enter="sendMessage"
            @input="handleTyping"
          >
          <button
            class="send-btn"
            :disabled="!chatMessage.trim() || isTyping"
            :class="{ active: chatMessage.trim() }"
            @click="sendMessage"
          >
            <svg v-if="!isTyping" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <div v-else class="loading-spinner" />
          </button>
        </div>
        <div class="input-footer">
          <span class="powered-by">由 AI 驱动 | 中英文支持</span>
          <div class="input-shortcuts">
            <span class="shortcut">Enter 发送</span>
            <span class="shortcut">Shift+Enter 换行</span>
          </div>
        </div>
      </div>
    </div>
    <button class="chat-trigger" @click="toggleChat">
      <svg v-if="!isChatOpen" class="chat-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
      <svg v-else class="close-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.chat-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chat-trigger {
  width: 4.5rem;
  height: 4.5rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5, #3b82f6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  box-shadow:
    0 10px 25px rgba(99, 102, 241, 0.3),
    0 0 0 0 rgba(99, 102, 241, 0.4);
  transition: all 0.3s ease;
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
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
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
  }

  &:hover {
    transform: scale(1.1);
    box-shadow:
      0 20px 40px rgba(99, 102, 241, 0.4),
      0 0 0 10px rgba(99, 102, 241, 0.1);
    animation: pulse 2s infinite;

    &::before {
      opacity: 1;
    }

    &::after {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0.1); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}

.chat-icon,
.close-icon {
  width: 1.75rem;
  height: 1.75rem;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.chat-trigger:hover .chat-icon,
.chat-trigger:hover .close-icon {
  transform: scale(1.1);
}

.chat-window {
  position: absolute;
  bottom: 5.5rem;
  right: 0;
  width: 26rem;
  height: 35rem;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  animation: slideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
}

.chat-header {
  flex-shrink: 0;
  padding: 1.25rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E") repeat;
    z-index: 1;
  }
}

.chat-header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.chat-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-image {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid white;

  &.online {
    background: #10b981;
    animation: pulse-green 2s infinite;
  }
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.1); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.chat-info {
  flex: 1;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
}

.chat-status {
  margin: 0;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.minimize-btn,
.close-chat {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.3s ease;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }
}

.chat-content {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
}

.welcome-message {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-bottom: 1px solid #e2e8f0;
}

.chat-messages {
  padding: 1rem 1.5rem;
  background: white;
}

.chat-message {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: flex-start;

  &.user {
    flex-direction: row-reverse;

    .message-content {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: white;
      border-radius: 1rem 1rem 0.25rem 1rem;
    }
  }

  &.bot {
    .message-content {
      background: #f1f5f9;
      color: #374151;
      border-radius: 1rem 1rem 1rem 0.25rem;
    }
  }
}

.message-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 0.25rem;

  &:not(.user) {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    border: 1px solid #3b82f6;
  }

  &.user {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border: 1px solid #d1d5db;
  }
}

.message-content {
  max-width: 80%;
  padding: 0.75rem 1rem;
  position: relative;

  p {
    margin: 0;
    line-height: 1.5;
    font-size: 0.875rem;
  }
}

.message-time {
  display: block;
  font-size: 0.625rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

.typing-indicator {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0 1.5rem 1rem;
  background: white;
}

.typing-content {
  background: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 1rem 1rem 1rem 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.typing-dots {
  display: flex;
  gap: 0.25rem;

  span {
    width: 0.375rem;
    height: 0.375rem;
    background: #6b7280;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.typing-text {
  font-size: 0.75rem;
  color: #6b7280;
}

.chat-input {
  flex-shrink: 0;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  /* 移除 position: sticky 和 bottom */
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  background: #f8fafc;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background: white;
  }
}

.input-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: #e2e8f0;
    color: #374151;
  }
}

.message-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  font-size: 0.875rem;
  color: #374151;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.send-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:not(:disabled):hover {
    background: linear-gradient(135deg, #4f46e5, #3b82f6);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &.active {
    background: linear-gradient(135deg, #10b981, #059669);

    &:hover {
      background: linear-gradient(135deg, #059669, #047857);
    }
  }
}

.loading-spinner {
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

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  padding: 0 0.5rem;
}

.powered-by {
  font-size: 0.625rem;
  color: #9ca3af;
  font-weight: 500;
}

.input-shortcuts {
  display: flex;
  gap: 0.5rem;
}

.shortcut {
  font-size: 0.625rem;
  color: #6b7280;
  background: #f1f5f9;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  border: 1px solid #e2e8f0;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(2rem) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 639px) {
  .chat-widget {
    bottom: 1rem;
    right: 1rem;
  }

  .chat-trigger {
    width: 3.5rem;
    height: 3.5rem;
  }

  .chat-icon,
  .close-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .chat-window {
    width: calc(100vw - 2rem);
    right: -1rem;
    max-height: 90vh;
  }

  .chat-header {
    padding: 1rem;

    .chat-info h3 {
      font-size: 0.875rem;
    }

    .chat-status {
      font-size: 0.625rem;
    }
  }

  .chat-content {
    max-height: 60vh;
  }

  .welcome-message {
    padding: 1rem;
  }

  .service-features {
    padding: 1rem;
    grid-template-columns: 1fr;
  }

  .chat-messages {
    padding: 1rem;
  }

  .message-content {
    max-width: 85%;
    font-size: 0.8rem;
  }

  .chat-input {
    padding: 1rem;
  }

  .input-wrapper {
    padding: 0.375rem;
  }

  .message-input {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }

  .send-btn {
    width: 2.25rem;
    height: 2.25rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  .input-footer {
    margin-top: 0.5rem;
  }

  .powered-by {
    font-size: 0.5rem;
  }

  .shortcut {
    font-size: 0.5rem;
    padding: 0.125rem 0.25rem;
  }
}
</style>
