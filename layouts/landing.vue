<script setup>
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
</script>

<template>
  <LandingNavbar 
    :show-login-modal="showLoginModal" 
    :show-register-modal="showRegisterModal"
    @update:show-login-modal="showLoginModal = $event"
    @update:show-register-modal="showRegisterModal = $event"
  ></LandingNavbar>
  <slot :show-register-modal="() => showRegisterModal = true"></slot>
  <LandingFooter></LandingFooter>
  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
</template>
