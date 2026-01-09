<script setup lang="ts">
import {
  ArrowRightIcon,
  CloudArrowUpIcon,
  DevicePhoneMobileIcon,
  PencilSquareIcon,
  PlayIcon,
  RocketLaunchIcon
} from '@heroicons/vue/24/outline';
import { onUnmounted, ref } from 'vue';

const isPlaying = ref(false);
const currentStep = ref(0);
const demoInterval = ref<NodeJS.Timeout | null>(null);

const demoFeatures = [
  {
    id: 1,
    icon: RocketLaunchIcon,
    title: '快速启动',
    description: '5分钟内完成网站搭建'
  },
  {
    id: 2,
    icon: PencilSquareIcon,
    title: '拖拽编辑',
    description: '可视化编辑器，所见即所得'
  },
  {
    id: 3,
    icon: DevicePhoneMobileIcon,
    title: '响应式设计',
    description: '完美适配所有设备'
  },
  {
    id: 4,
    icon: CloudArrowUpIcon,
    title: '一键部署',
    description: '即时发布到全球CDN'
  }
];

const demoSteps = [
  {
    id: 1,
    title: '选择模板',
    description: '从专业模板库中选择心仪设计'
  },
  {
    id: 2,
    title: '自定义内容',
    description: '使用拖拽编辑器自定义页面'
  },
  {
    id: 3,
    title: '响应式预览',
    description: '实时预览不同设备效果'
  }
];

function startDemo() {
  isPlaying.value = true;
  currentStep.value = 0;

  demoInterval.value = setInterval(() => {
    currentStep.value = (currentStep.value + 1) % demoSteps.length;
  }, 2000);

  // 6秒后停止演示
  setTimeout(() => {
    stopDemo();
  }, 6000);
}

function stopDemo() {
  isPlaying.value = false;
  if (demoInterval.value) {
    clearInterval(demoInterval.value);
    demoInterval.value = null;
  }
}

function goToStep(index: number) {
  currentStep.value = index;
  if (isPlaying.value) {
    stopDemo();
  }
}

onUnmounted(() => {
  if (demoInterval.value) {
    clearInterval(demoInterval.value);
  }
});
</script>

<template>
  <section class="demo-section">
    <div class="container">
      <div class="demo-grid">
        <div class="demo-content">
          <div class="content-header">
            <div class="badge">
              <span class="badge-text">产品演示</span>
            </div>
            <h2 class="section-title">
              体验我们的产品
            </h2>
            <p class="section-description">
              观看产品演示，了解如何在3分钟内快速搭建专业官网
            </p>
          </div>

          <div class="demo-features">
            <div
              v-for="(feature, index) in demoFeatures"
              :key="feature.id"
              class="demo-feature"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="feature-icon">
                <component :is="feature.icon" class="icon" />
              </div>
              <div class="feature-content">
                <h4 class="feature-title">
                  {{ feature.title }}
                </h4>
                <p class="feature-description">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>

          <div class="demo-actions">
            <button class="btn btn-primary" @click="startDemo">
              <PlayIcon class="btn-icon" />
              开始演示
            </button>
            <NuxtLink to="#" class="btn btn-secondary">
              免费试用
              <ArrowRightIcon class="btn-icon" />
            </NuxtLink>
          </div>
        </div>

        <div class="demo-showcase">
          <div class="showcase-container">
            <!-- 主要演示区域 -->
            <div class="main-demo" :class="{ playing: isPlaying }">
              <div class="demo-screen">
                <div class="browser-mockup">
                  <div class="browser-header">
                    <div class="browser-controls">
                      <div class="control-dot red" />
                      <div class="control-dot yellow" />
                      <div class="control-dot green" />
                    </div>
                    <div class="address-bar">
                      <span>https://your-website.com</span>
                    </div>
                  </div>
                  <div class="browser-content">
                    <div class="demo-preview" :class="{ active: currentStep === 0 }">
                      <div class="preview-header">
                        <h3>现代化官网模板</h3>
                        <p>专业设计，快速上线</p>
                      </div>
                      <div class="preview-features">
                        <div class="feature-grid">
                          <div v-for="i in 4" :key="i" class="feature-item" />
                        </div>
                      </div>
                    </div>

                    <div class="demo-preview" :class="{ active: currentStep === 1 }">
                      <div class="editor-interface">
                        <div class="editor-sidebar">
                          <div v-for="i in 6" :key="i" class="sidebar-item" />
                        </div>
                        <div class="editor-canvas">
                          <div v-for="i in 8" :key="i" class="canvas-element" />
                        </div>
                      </div>
                    </div>

                    <div class="demo-preview" :class="{ active: currentStep === 2 }">
                      <div class="responsive-preview">
                        <div class="device desktop" />
                        <div class="device tablet" />
                        <div class="device mobile" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 播放按钮 -->
              <div v-if="!isPlaying" class="play-overlay" @click="startDemo">
                <div class="play-button">
                  <PlayIcon class="play-icon" />
                </div>
                <div class="play-text">
                  <h4>产品演示视频</h4>
                  <p>3分钟了解完整功能</p>
                </div>
              </div>
            </div>

            <!-- 步骤指示器 -->
            <div class="demo-steps">
              <div
                v-for="(step, index) in demoSteps"
                :key="step.id"
                class="step-item"
                :class="{ active: currentStep === index }"
                @click="goToStep(index)"
              >
                <div class="step-number">
                  {{ index + 1 }}
                </div>
                <div class="step-content">
                  <h5 class="step-title">
                    {{ step.title }}
                  </h5>
                  <p class="step-description">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.demo-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;
}

.demo-section::before {
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

.container {
  position: relative;
  z-index: 1;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

.demo-content {
  color: white;
}

.content-header {
  margin-bottom: 3rem;
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
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1.125rem;
  color: #cbd5e1;
  line-height: 1.6;
  max-width: 500px;
}

.demo-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.demo-feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
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

.demo-feature:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon .icon {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.feature-description {
  font-size: 0.875rem;
  color: #94a3b8;
  line-height: 1.4;
}

.demo-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.demo-showcase {
  position: relative;
}

.showcase-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.main-demo {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  background: white;
}

.demo-screen {
  position: relative;
  aspect-ratio: 16/10;
}

.browser-mockup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.browser-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.browser-controls {
  display: flex;
  gap: 0.5rem;
  margin-right: 1rem;
}

.control-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;

  &.red { background: #ef4444; }
  &.yellow { background: #f59e0b; }
  &.green { background: #10b981; }
}

.address-bar {
  flex: 1;
  padding: 0.375rem 0.75rem;
  background: white;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.browser-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.demo-preview {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.5s ease;
  background: #f9fafb;
}

.demo-preview.active {
  opacity: 1;
  transform: translateX(0);
}

.preview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.preview-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.preview-header p {
  color: #6b7280;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.feature-item {
  height: 3rem;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 0.5rem;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.editor-interface {
  display: flex;
  height: 100%;
  gap: 1rem;
}

.editor-sidebar {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-item {
  height: 2rem;
  background: #e5e7eb;
  border-radius: 0.375rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.editor-canvas {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  align-content: start;
}

.canvas-element {
  height: 1.5rem;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 0.25rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.responsive-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
}

.device {
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;

  &.desktop {
    width: 4rem;
    height: 3rem;
    border-radius: 0.375rem;
  }

  &.tablet {
    width: 2.5rem;
    height: 3.5rem;
    border-radius: 0.5rem;
  }

  &.mobile {
    width: 1.5rem;
    height: 2.5rem;
    border-radius: 0.375rem;
  }
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-overlay:hover {
  background: rgba(0, 0, 0, 0.8);
}

.play-button {
  width: 5rem;
  height: 5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: white;
  transform: scale(1.1);
}

.play-icon {
  width: 2rem;
  height: 2rem;
  color: #1f2937;
  margin-left: 0.25rem;
}

.play-text {
  text-align: center;
  color: white;
}

.play-text h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.play-text p {
  opacity: 0.9;
  font-size: 0.875rem;
}

.demo-steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.step-item.active {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.step-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.step-item.active .step-number {
  background: #3b82f6;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.step-description {
  font-size: 0.875rem;
  color: #94a3b8;
  line-height: 1.4;
}

@media (min-width: 1024px) {
  .demo-grid {
    grid-template-columns: 1fr 1fr;
  }

  .demo-features {
    grid-template-columns: 1fr;
  }

  .demo-steps {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .demo-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .demo-features {
    grid-template-columns: 1fr;
  }

  .demo-actions {
    flex-direction: column;
  }

  .demo-preview {
    padding: 1rem;
  }

  .preview-header h3 {
    font-size: 1.25rem;
  }

  .editor-interface {
    flex-direction: column;
    gap: 0.5rem;
  }

  .editor-sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }

  .sidebar-item {
    min-width: 3rem;
  }

  .responsive-preview {
    flex-direction: column;
  }
}
</style>
