<script setup lang="ts">
import AdvantagesSection from './components/AdvantagesSection.vue';
import BackToTop from './components/BackToTop.vue';
import ChatWidget from './components/ChatWidget.vue';
import ClientsSection from './components/ClientsSection.vue';
import DemoSection from './components/DemoSection.vue';
import FaqSection from './components/FaqSection.vue';
import HeroSection from './components/HeroSection.vue';
import NewsletterSection from './components/NewsletterSection.vue';
import NewsSection from './components/NewsSection.vue';
import PartnersSection from './components/PartnersSection.vue';
import ProductShowcaseSection from './components/ProductShowcaseSection.vue';
import SolutionsSection from './components/SolutionsSection.vue';
import StatsSection from './components/StatsSection.vue';
import TechFeaturesSection from './components/TechFeaturesSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';

// SEO设置
useSeoMeta({
  title: '开源官网 - 现代化企业官网解决方案',
  description: '一个通用的开源官网解决方案，适用于企业官网、产品官网、个人品牌网站等多种场景。提供现代化设计、优秀用户体验和完善功能模块。',
  ogTitle: '开源官网 - 现代化企业官网解决方案',
  ogDescription: '一个通用的开源官网解决方案，适用于企业官网、产品官网、个人品牌网站等多种场景',
  keywords: '官网模板,企业官网,开源网站,Vue.js,Nuxt.js,响应式设计'
});

definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  }
});
</script>

<template>
  <div class="page-wrapper">
    <HeroSection />
    <AdvantagesSection />
    <TechFeaturesSection />
    <ProductShowcaseSection />
    <TestimonialsSection />
    <StatsSection />
    <ClientsSection />
    <DemoSection />
    <SolutionsSection />
    <PartnersSection />
    <FaqSection />
    <NewsletterSection />
    <NewsSection />
    <BackToTop />
    <ChatWidget />
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.page-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
