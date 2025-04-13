<template>
  <div class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
    <h3 class="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{{ title }}</h3>
    <p class="text-slate-600 dark:text-slate-300">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script> 