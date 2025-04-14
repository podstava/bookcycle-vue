<template>
  <div class="min-h-screen bg-gray-50">
    <!-- <BooksNavbar 
      :show-login-modal="showLoginModal"
      :show-register-modal="showRegisterModal"
      @update:show-login-modal="showLoginModal = $event"
      @update:show-register-modal="showRegisterModal = $event"
    /> -->
    
    <section class="p-8">
      <h1 class="text-3xl font-bold mb-6 text-slate-800">Усі книги</h1>
  
      <!-- Стан завантаження -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>

      <!-- Список книг -->
      <div v-else-if="books.length" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="book in books"
          :key="book.id"
          class="rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition bg-white"
        >
          <h2 class="text-xl font-semibold text-slate-900">{{ book.title }}</h2>
          <p class="text-sm text-slate-600 mb-2">Автор: {{ book.author }}</p>
          <p class="text-sm text-slate-500 line-clamp-3">{{ book.description }}</p>
        </div>
      </div>
  
      <!-- Пустий стан -->
      <div v-else class="text-center py-12">
        <p class="text-lg text-slate-600 mb-4">На жаль, поки що немає доступних книг.</p>
        <p class="text-sm text-slate-500">Спробуйте перевірити пізніше або додайте свою першу книгу.</p>
      </div>
    </section>

    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'

// TypeScript declaration for useFetch
declare function useFetch<T>(url: string): Promise<{ data: Ref<T> }>

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const isLoading = ref(true)
const books = ref<Book[]>([]);

onMounted(async () => {
  try {
    const { data } = await useFetch<Book[]>('/api/books');
    books.value = data.value || [];
  } catch (error) {
    console.error('Помилка при завантаженні книг:', error)
  } finally {
    isLoading.value = false
  }
});
</script>
  