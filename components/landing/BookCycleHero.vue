<template>
  <section class="bg-gradient-to-b from-white to-slate-50 py-20">
    <div class="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <!-- Текст -->
      <div class="text-center md:text-left">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight">
          BookCycle — обмінюйся книгами<br />
          з людьми поруч
        </h1>
        <p class="mt-4 text-xl text-gray-600">
          Бібліотека майбутнього: екологічно, безкоштовно, цікаво
        </p>
        <div class="mt-8 flex flex-col sm:flex-row sm:justify-start items-center gap-4">
          <!-- <button 
            @click="emit('show-register-modal')" 
            class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Зареєструватись
          </button> -->
          <NuxtLink 
            to="/books" 
            class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Подивитись книги
          </NuxtLink>
        </div>
      </div>

      <!-- Зображення -->
      <div class="flex justify-center md:justify-end">
        <img
          class="rounded-xl shadow-xl max-w-full h-auto transition-transform transform hover:scale-105"
          src="~/assets/img/hero-bookcycle-map-ua.png"
          alt="Обмін книжками по всій Україні"
          loading="eager"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from '@/components/landing/Button.vue'

const emit = defineEmits(['show-register-modal'])
</script>
