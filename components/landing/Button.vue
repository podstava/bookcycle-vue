<!-- components/landing/Button.vue -->
<script setup lang="ts">
const props = defineProps({
  href: String,
  target: {
    type: String,
    default: '_self',
  },
})
</script>

<template>
  <component
    :is="href?.startsWith('/') ? 'NuxtLink' : 'a'"
    :to="href?.startsWith('/') ? href : undefined"
    :href="!href?.startsWith('/') ? href : undefined"
    :target="target"
    class="inline-flex items-center rounded-md bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
  >
    <slot />
  </component>
</template>
