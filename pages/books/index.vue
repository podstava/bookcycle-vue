<template>
  <div class="min-h-screen bg-gray-50">
    <BooksNavbar 
      :show-login-modal="showLoginModal"
      :show-register-modal="showRegisterModal"
      @update:show-login-modal="showLoginModal = $event"
      @update:show-register-modal="showRegisterModal = $event"
    />
    
    <section class="p-8">
      <h1 class="text-3xl font-bold mb-6 text-slate-800">Усі книги</h1>
  
      <div v-if="books.length" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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
  
      <div v-else class="text-slate-500">Немає доступних книг.</div>
    </section>

    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
  </div>
</template>
  
<script setup lang="ts">
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const books = ref<Book[]>([]);

onMounted(async () => {
  const { data } = await useFetch<Book[]>('/api/books');
  books.value = data.value || [];
});
</script>
  