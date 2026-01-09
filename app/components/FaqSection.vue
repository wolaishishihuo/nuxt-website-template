<script setup lang="ts">
import {
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline';

const activeIndex = ref(-1);

const faqs = [
  {
    question: '这个开源项目是完全免费的吗？',
    answer: '是的，这个项目完全开源免费，您可以自由使用、修改和分发。我们采用MIT许可证，给予您最大的使用自由度。'
  },
  {
    question: '如何快速部署到我的服务器？',
    answer: '我们提供了详细的部署文档和Docker镜像，您只需要几个简单的命令就能完成部署。支持各种云服务平台，包括阿里云、腾讯云、AWS等。'
  },
  {
    question: '支持哪些浏览器和设备？',
    answer: '我们的网站采用响应式设计，支持所有现代浏览器，包括Chrome、Firefox、Safari、Edge等。完美适配手机、平板和桌面设备。'
  },
  {
    question: '如何自定义主题和样式？',
    answer: '项目使用SCSS作为样式预处理器，提供了丰富的变量和混合器。您可以轻松修改颜色、字体、间距等设计元素，创建属于您的独特风格。'
  },
  {
    question: '是否提供技术支持和维护？',
    answer: '我们提供社区支持，您可以在GitHub上提交问题和建议。同时我们也提供付费的技术支持服务，包括定制开发、部署协助等。'
  },
  {
    question: '如何贡献代码或报告bug？',
    answer: '欢迎您参与项目贡献！您可以在GitHub上Fork项目、提交Pull Request或报告Issues。我们有详细的贡献指南来帮助您快速上手。'
  }
];

function toggleFaq(index: number) {
  activeIndex.value = activeIndex.value === index ? -1 : index;
}
</script>

<template>
  <section class="faq-section">
    <div class="container">
      <div class="faq-header">
        <div class="section-badge">
          <span class="badge-text">常见问题</span>
        </div>
        <h2 class="section-title">
          您的<span class="title-highlight">疑问</span>我们来解答
        </h2>
        <p class="section-description">
          我们整理了用户最常问的问题，如果您有其他疑问，欢迎随时联系我们的客服团队。
        </p>
      </div>

      <div class="faq-content">
        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
            :class="{ active: activeIndex === index }"
          >
            <div class="faq-question" @click="toggleFaq(index)">
              <h3 class="question-text">
                {{ faq.question }}
              </h3>
              <div class="question-icon">
                <ChevronDownIcon
                  class="icon"
                  :class="{ rotate: activeIndex === index }"
                />
              </div>
            </div>
            <div class="faq-answer" :class="{ show: activeIndex === index }">
              <div class="answer-content">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-contact">
          <div class="contact-card">
            <div class="card-icon">
              <ChatBubbleLeftRightIcon class="icon" />
            </div>
            <div class="card-content">
              <h3 class="card-title">
                还有其他问题？
              </h3>
              <p class="card-description">
                我们的客服团队随时为您提供帮助和支持
              </p>
              <div class="card-actions">
                <button class="btn btn-primary">
                  <PhoneIcon class="btn-icon" />
                  联系客服
                </button>
                <button class="btn btn-outline">
                  <EnvelopeIcon class="btn-icon" />
                  发送邮件
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/css/main.scss' as *;

.faq-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(139, 92, 246, 0.03));
    border-radius: 0 0 50% 50%;
    transform: scaleX(1.5);
  }

  .container {
    position: relative;
    z-index: 1;
  }
}

.faq-header {
  text-align: center;
  margin-bottom: 4rem;

  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(59, 130, 246, 0.1);
    color: map.get($colors, primary);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: map.get($colors, gray-900);
    margin-bottom: 1rem;

    @include respond-to(md) {
      font-size: 3rem;
    }

    .title-highlight {
      color: map.get($colors, primary);
    }
  }

  .section-description {
    font-size: 1.125rem;
    color: map.get($colors, gray-600);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.faq-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;

  @include respond-to(md) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.faq-list {
  .faq-item {
    background: white;
    border-radius: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    &.active {
      border: 2px solid map.get($colors, primary);
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
    }
  }

  .faq-question {
    padding: 1.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(59, 130, 246, 0.02);
    }

    .question-text {
      font-size: 1.125rem;
      font-weight: 600;
      color: map.get($colors, gray-900);
      margin: 0;
    }

    .question-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      background: map.get($colors, gray-100);
      border-radius: 50%;
      transition: all 0.3s ease;

      .icon {
        width: 1.25rem;
        height: 1.25rem;
        color: map.get($colors, gray-600);
        transition: transform 0.3s ease;

        &.rotate {
          transform: rotate(180deg);
        }
      }
    }

    .faq-item.active & {
      .question-icon {
        background: map.get($colors, primary);

        .icon {
          color: white;
        }
      }
    }
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;

    &.show {
      max-height: 200px;
    }

    .answer-content {
      padding: 0 1.5rem 1.5rem;

      p {
        color: map.get($colors, gray-600);
        line-height: 1.6;
        margin: 0;
      }
    }
  }
}

.faq-contact {
  .contact-card {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 1.5rem;
    padding: 2rem;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      animation: float 6s ease-in-out infinite;
    }

    .card-icon {
      width: 4rem;
      height: 4rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;

      .icon {
        width: 2rem;
        height: 2rem;
        color: white;
      }
    }

    .card-content {
      position: relative;
      z-index: 1;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .card-description {
      opacity: 0.9;
      margin-bottom: 2rem;
    }

    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .btn {
        @include button-base;
        padding: 0.875rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: all 0.3s ease;

        &.btn-primary {
          background: white;
          color: map.get($colors, primary);

          &:hover {
            background: map.get($colors, gray-100);
            transform: translateY(-2px);
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

        .btn-icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
}

@keyframes float {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}
</style>
