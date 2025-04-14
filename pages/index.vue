<script setup>
definePageMeta({
  layout: "default",
});
</script>

<template>
  <LandingContainer>
    <LandingBookCycleHero @show-register-modal="$emit('show-register-modal')"></LandingBookCycleHero>
    <LandingFeatures></LandingFeatures>
  </LandingContainer>
</template>
