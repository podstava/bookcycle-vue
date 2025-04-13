<script setup>
const { data: books, pending, error } = await useFetch('/books/', {
  baseURL: useRuntimeConfig().public.apiBase,
  headers: {
    'Accept': 'application/json'
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Всі книги</h1>
      
      <!-- Loading state -->
      <div v-if="pending" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>Помилка при завантаженні книг. Спробуйте пізніше.</p>
      </div>

      <!-- Books grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="book in books" :key="book.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ book.title }}</h2>
            <p class="text-gray-600 mb-2">{{ book.author }}</p>
            <p class="text-sm text-gray-500 mb-4">{{ book.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Додано: {{ formatDate(book.created_at) }}</span>
              <span class="text-sm font-medium" :class="book.status === 'available' ? 'text-green-600' : 'text-gray-500'">
                {{ book.status === 'available' ? 'Доступна' : 'Недоступна' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 