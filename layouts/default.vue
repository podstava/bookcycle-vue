<script setup>
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <BooksNavbar 
      :show-login-modal="showLoginModal" 
      :show-register-modal="showRegisterModal"
      @update:show-login-modal="showLoginModal = $event"
      @update:show-register-modal="showRegisterModal = $event"
    />
    <main class="flex-grow">
      <slot />
    </main>
    <LandingFooter class="mt-auto" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
  </div>
</template> 