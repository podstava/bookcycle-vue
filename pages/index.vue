<script setup>
definePageMeta({
  layout: "landing",
});
</script>

<template>
  <LandingContainer>
    <LandingBookCycleHero @show-register-modal="$emit('show-register-modal')"></LandingBookCycleHero>
    <LandingFeatures></LandingFeatures>
    <!-- <LandingLogos></LandingLogos> -->
    <!-- <LandingCta></LandingCta> -->
  </LandingContainer>
</template>
