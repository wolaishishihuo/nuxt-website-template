<script setup lang="ts">
import { computed, ref } from 'vue';

const categories = [
  { key: 'all', name: '全部', icon: '📊' },
  { key: 'product', name: '产品更新', icon: '🚀' },
  { key: 'tech', name: '技术分享', icon: '💻' },
  { key: 'industry', name: '行业洞察', icon: '📈' },
  { key: 'tutorial', name: '使用教程', icon: '📚' }
];

const activeCategory = ref('all');

const allNews = [
  {
    id: 1,
    title: '开源官网 v3.0 正式发布：全新AI助手上线',
    excerpt: '全新版本带来革命性更新：AI智能设计助手、一键生成网站、智能内容推荐，让网站搭建更加简单高效。支持自然语言交互，仅需描述想法即可生成专业网站。',
    category: '产品更新',
    categoryKey: 'product',
    date: '2024-12-27',
    slug: 'v3-release',
    readTime: '5 分钟',
    views: 2840,
    likes: 156,
    tags: ['新版本', 'AI助手', '产品更新'],
    author: {
      name: '产品团队',
      avatar: '🚀'
    },
    featured: true
  },
  {
    id: 2,
    title: '如何在5分钟内搭建企业级官网',
    excerpt: '详细教程：从选择模板到上线发布，一步步教您搭建专业的企业官网。包括响应式设计、SEO优化、性能调优等实用技巧。',
    category: '使用教程',
    categoryKey: 'tutorial',
    date: '2024-12-25',
    slug: 'quick-setup-guide',
    readTime: '8 分钟',
    views: 4520,
    likes: 289,
    tags: ['新手指南', '快速搭建', '教程'],
    author: {
      name: '技术团队',
      avatar: '💻'
    },
    featured: false
  },
  {
    id: 3,
    title: '2024年企业数字化转型深度报告',
    excerpt: '最新研究显示，85%的企业将数字化转型列为优先事项。本报告深入分析了转型趋势、挑战与机遇，为企业提供实用的转型指南。',
    category: '行业洞察',
    categoryKey: 'industry',
    date: '2024-12-20',
    slug: 'digital-transformation-2024',
    readTime: '12 分钟',
    views: 3680,
    likes: 234,
    tags: ['数字化转型', '行业报告', '趋势分析'],
    author: {
      name: '研究院',
      avatar: '📈'
    },
    featured: false
  },
  {
    id: 4,
    title: '前端性能优化最佳实践大全',
    excerpt: '从代码分割到图片优化，从缓存策略到CDN配置，全面介绍前端性能优化的最新技术和实践经验。附带实际案例分析和可执行的优化清单。',
    category: '技术分享',
    categoryKey: 'tech',
    date: '2024-12-18',
    slug: 'frontend-performance-optimization',
    readTime: '15 分钟',
    views: 5120,
    likes: 412,
    tags: ['前端优化', '性能优化', '最佳实践'],
    author: {
      name: '高级开发师',
      avatar: '⚙️'
    },
    featured: false
  },
  {
    id: 5,
    title: '正式宣布：与国内首家AI公司深度合作',
    excerpt: '我们很荣幸宣布与国内领先的AI公司达成战略合作，共同打造新一代智能化网站建设平台。这次合作将带来更先进的AI技术和更丰富的智能化功能。',
    category: '产品更新',
    categoryKey: 'product',
    date: '2024-12-15',
    slug: 'ai-partnership-announcement',
    readTime: '6 分钟',
    views: 3920,
    likes: 278,
    tags: ['合作宣布', 'AI技术', '战略合作'],
    author: {
      name: '公司新闻',
      avatar: '📢'
    },
    featured: false
  },
  {
    id: 6,
    title: '教你使用CSS Grid打造现代化布局',
    excerpt: 'CSS Grid是现代网页布局的强大工具。本文从基础概念到高级技巧，全面介绍如何使用Grid打造响应式、灵活且美观的网页布局。附带丰富的代码示例。',
    category: '技术分享',
    categoryKey: 'tech',
    date: '2024-12-12',
    slug: 'css-grid-modern-layouts',
    readTime: '10 分钟',
    views: 4350,
    likes: 356,
    tags: ['CSS Grid', '布局设计', '前端技术'],
    author: {
      name: 'UI设计师',
      avatar: '🎨'
    },
    featured: false
  }
];

const latestNews = computed(() => {
  const filtered = activeCategory.value === 'all'
    ? allNews
    : allNews.filter(news => news.categoryKey === activeCategory.value);
  return filtered.slice(0, 6);
});
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return '昨天';
  }
  else if (diffDays <= 7) {
    return `${diffDays} 天前`;
  }
  else {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    });
  }
}
</script>

<template>
  <section class="news_section">
    <div class="container">
      <div class="news_header animate_on_scroll">
        <div class="news_header_content">
          <div class="news_header_icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v9m4-4.5l-4-4.5M7 13h3" />
            </svg>
          </div>
          <div class="news_header_text">
            <h2 class="section_title">
              📰 智能资讯中心
            </h2>
            <p class="section_description">
              精选内容推荐 | AI算法智能筛选 | 实时更新的行业动态
            </p>
            <div class="news_stats">
              <div class="stat_item">
                <span class="stat_number">1000+</span>
                <span class="stat_label">精选文章</span>
              </div>
              <div class="stat_item">
                <span class="stat_number">50+</span>
                <span class="stat_label">专家作者</span>
              </div>
              <div class="stat_item">
                <span class="stat_number">24/7</span>
                <span class="stat_label">实时更新</span>
              </div>
            </div>
          </div>
        </div>
        <div class="news_header_actions">
          <NuxtLink to="#" class="view_all_link animate_slide_in_right">
            <span class="link_text">查看所有新闻</span>
            <svg class="link_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
          <div class="filter_tabs">
            <button
              v-for="category in categories"
              :key="category.key"
              class="filter_tab" :class="[{ active: activeCategory === category.key }]"
              @click="activeCategory = category.key"
            >
              {{ category.icon }} {{ category.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="news_grid">
        <article
          v-for="(article, index) in latestNews"
          :key="article.id"
          class="news_card animate_on_scroll"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="news_image" :class="{ 'news_image--featured': article.featured }">
            <div class="news_image_content">
              <div class="news_emoji animate_wiggle">
                {{ article.author.avatar }}
              </div>
              <div class="news_category_badge">
                {{ article.category }}
              </div>
              <div v-if="article.featured" class="featured_badge">
                <span class="featured_icon">⭐</span>
                <span class="featured_text">精选</span>
              </div>
            </div>
          </div>
          <div class="news_content">
            <div class="news_meta_top">
              <span class="news_category">{{ article.category }}</span>
              <div class="news_stats">
                <span class="stat_item">
                  <svg class="stat_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {{ article.views }}
                </span>
                <span class="stat_item">
                  <svg class="stat_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {{ article.likes }}
                </span>
              </div>
            </div>
            <h3 class="news_title">
              {{ article.title }}
            </h3>
            <p class="news_excerpt">
              {{ article.excerpt }}
            </p>
            <div class="news_tags">
              <span v-for="tag in article.tags" :key="tag" class="news_tag">
                #{{ tag }}
              </span>
            </div>
            <div class="news_meta">
              <div class="news_author">
                <span class="author_avatar">{{ article.author.avatar }}</span>
                <span class="author_name">{{ article.author.name }}</span>
              </div>
              <div class="news_info">
                <span class="news_date">{{ formatDate(article.date) }}</span>
                <span class="news_read_time">🕒 {{ article.readTime }}</span>
              </div>
            </div>
            <NuxtLink to="#" class="read_more_link">
              <span class="read_more_text">阅读全文</span>
              <svg class="read_more_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.news_section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.news_section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
}

.news_header {
  margin-bottom: 3rem;
  position: relative;
}

.news_header_content {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
}

.news_header_icon {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  flex-shrink: 0;
}

.news_header_icon svg {
  width: 2rem;
  height: 2rem;
}

.news_header_text {
  flex: 1;
}

.news_stats {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.stat_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat_number {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.stat_label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.news_header_actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.view_all_link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  border: 2px solid #2563eb;
  border-radius: 0.75rem;
  text-decoration: none;
  background: white;

  &:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);

    .link_icon {
      transform: translateX(4px);
    }
  }
}

.link_icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.filter_tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter_tab {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f1f5f9;
  color: #64748b;

  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  &.active {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
}

.news_grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.news_card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  border: 1px solid #e2e8f0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 1;
    }

    .news_image {
      transform: scale(1.05);
    }
  }
}

.news_image {
  width: 100%;
  height: 14rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  &--featured {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    height: 16rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
}

.news_card:hover .news_image::before {
  transform: translateX(100%);
}

.news_image_content {
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 1rem;
}

.news_emoji {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  animation: float 3s ease-in-out infinite;
  display: block;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.news_category_badge {
  font-size: 0.875rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.375rem 1rem;
  border-radius: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: inline-block;
  margin-bottom: 0.5rem;
}

.featured_badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #f59e0b;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(10px);
}

.featured_icon {
  font-size: 0.875rem;
}

.news_content {
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.news_meta_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.news_category {
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.news_stats {
  display: flex;
  gap: 1rem;
}

.stat_item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;

  .stat_icon {
    width: 0.875rem;
    height: 0.875rem;
  }
}

.news_title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.news_card:hover .news_title {
  color: #6366f1;
}

.news_excerpt {
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.news_tag {
  font-size: 0.75rem;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.news_meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.news_author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author_avatar {
  font-size: 1.25rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
}

.author_name {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.news_info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.news_date, .news_read_time {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.read_more_link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;

  &:hover {
    color: white;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

    .read_more_icon {
      transform: translateX(4px);
    }
  }
}

.read_more_icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

@media (min-width: 640px) {
  .news_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .news_grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .news_header_content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  .news_header_actions {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .view_all_link {
    justify-content: center;
  }

  .filter_tabs {
    justify-content: center;
  }

  .news_stats {
    justify-content: center;
  }

  .news_content {
    padding: 1.5rem;
  }

  .news_title {
    font-size: 1.125rem;
  }

  .news_meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .news_info {
    align-items: flex-start;
  }

  .read_more_link {
    justify-content: center;
    width: 100%;
  }

  .news_image {
    height: 12rem;

    &--featured {
      height: 14rem;
    }
  }

  .news_emoji {
    font-size: 2.5rem;
  }
}
</style>
