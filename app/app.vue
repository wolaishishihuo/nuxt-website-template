<script setup lang="ts">
// SEO 默认配置
useSeoMeta({
  titleTemplate: '%s - 开源官网',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
