<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/vue/24/outline';
import { onMounted, onUnmounted, ref } from 'vue';

const currentIndex = ref(0);
let autoSlideInterval: NodeJS.Timeout | null = null;

const testimonials = [
  {
    id: 'testimonial1',
    name: '张明',
    role: '技术总监',
    company: '创新科技有限公司',
    rating: 5,
    content: '这个官网模板真的很棒！设计现代化，功能完善，帮助我们快速搭建了专业的企业网站。用户体验出色，性能表现优异。',
    avatar: null
  },
  {
    id: 'testimonial2',
    name: '李华',
    role: '产品经理',
    company: '未来互联网',
    rating: 5,
    content: '代码质量很高，文档详细完善，定制起来非常方便。团队使用后效率提升明显，强烈推荐给需要官网的朋友们。',
    avatar: null
  },
  {
    id: 'testimonial3',
    name: '王强',
    role: '创始人CEO',
    company: '新兴科技企业',
    rating: 5,
    content: '性能表现优秀，SEO效果显著。自从使用后，我们的网站访问量提升了200%，用户停留时间也大幅增加。',
    avatar: null
  },
  {
    id: 'testimonial4',
    name: '陈美',
    role: '运营总监',
    company: '数字营销公司',
    rating: 5,
    content: '响应式设计完美，在各种设备上都表现出色。客户满意度显著提升，转化率也有了明显改善。',
    avatar: null
  },
  {
    id: 'testimonial5',
    name: '刘刚',
    role: '项目经理',
    company: '软件开发公司',
    rating: 5,
    content: '部署简单，维护方便，文档齐全。团队开发效率提升了50%，项目交付速度明显加快。',
    avatar: null
  }
];

function nextSlide() {
  if (currentIndex.value < testimonials.length - 1) {
    currentIndex.value++;
  }
  else {
    currentIndex.value = 0;
  }
}

function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  else {
    currentIndex.value = testimonials.length - 1;
  }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <section class="testimonials-section">
    <div class="container">
      <div class="section-header animate-on-scroll">
        <div class="badge">
          <span class="badge-text">客户反馈</span>
        </div>
        <h2 class="section-title">
          值得信赖的选择
        </h2>
        <p class="section-description">
          来自全球客户的真实评价，见证我们的专业服务
        </p>
      </div>

      <div class="testimonials-container">
        <div class="testimonials-slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonial-slide"
          >
            <div class="testimonial-card">
              <div class="card-header">
                <div class="quote-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>
                <div class="stars">
                  <StarIcon v-for="n in testimonial.rating" :key="n" class="star-icon filled" />
                  <StarIcon v-for="n in (5 - testimonial.rating)" :key="n + testimonial.rating" class="star-icon empty" />
                </div>
              </div>

              <p class="testimonial-content">
                {{ testimonial.content }}
              </p>

              <div class="testimonial-author">
                <div class="author-avatar">
                  <img v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.name">
                  <span v-else>{{ testimonial.name.charAt(0) }}</span>
                </div>
                <div class="author-info">
                  <h4 class="author-name">
                    {{ testimonial.name }}
                  </h4>
                  <p class="author-role">
                    {{ testimonial.role }}
                  </p>
                  <p class="author-company">
                    {{ testimonial.company }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="slider-controls">
          <button
            class="slider-btn prev"
            :disabled="currentIndex === 0"
            @click="prevSlide"
          >
            <ChevronLeftIcon class="btn-icon" />
          </button>
          <button
            class="slider-btn next"
            :disabled="currentIndex === testimonials.length - 1"
            @click="nextSlide"
          >
            <ChevronRightIcon class="btn-icon" />
          </button>
        </div>

        <div class="slider-indicators">
          <div
            v-for="(_, idx) in testimonials"
            :key="idx"
            class="indicator" :class="[{ active: currentIndex === idx }]"
            role="button"
            tabindex="0"
            @click="currentIndex = idx"
            @keydown.enter="currentIndex = idx"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
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
  color: #60a5fa;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1.125rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.testimonials-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.testimonials-slider {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-slide {
  min-width: 100%;
  padding: 0 1rem;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 3rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.testimonial-card:hover::before {
  opacity: 1;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.quote-icon {
  width: 3rem;
  height: 3rem;
  color: rgba(59, 130, 246, 0.6);
  flex-shrink: 0;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star-icon {
  height: 1.25rem;
  width: 1.25rem;
}

.star-icon.filled {
  color: #fbbf24;
  fill: currentColor;
}

.star-icon.empty {
  color: #374151;
}

.testimonial-content {
  color: #e2e8f0;
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.author-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  border: 3px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.author-role {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 0.125rem;
}

.author-company {
  color: #64748b;
  font-size: 0.75rem;
}

.slider-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.slider-btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
  transform: scale(1.05);
}

.slider-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.slider-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #3b82f6;
  transform: scale(1.2);
}

.indicator:hover {
  background: rgba(59, 130, 246, 0.7);
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .testimonial-card {
    padding: 2rem;
  }

  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .author-avatar {
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
  }

  .testimonial-content {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .testimonial-slide {
    padding: 0 0.5rem;
  }

  .testimonial-card {
    padding: 1.5rem;
  }
}
</style>
