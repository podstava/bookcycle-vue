<script setup>
definePageMeta({
  layout: "default",
  layoutTransition: {
    name: "layout",
    mode: "out-in",
  },
});

const showRegisterModal = ref(false);

// Watch for changes to showRegisterModal and emit to parent layout
watch(showRegisterModal, (newVal) => {
  if (newVal) {
    navigateTo({ path: '/', hash: '#register' });
  }
});

// Handle the show-register-modal event from the hero component
const handleShowRegisterModal = () => {
  showRegisterModal.value = true;
};
</script>

<template>
  <LandingContainer>
    <LandingBookCycleHero @show-register-modal="handleShowRegisterModal"></LandingBookCycleHero>
    <LandingFeatures></LandingFeatures>
  </LandingContainer>
</template>
