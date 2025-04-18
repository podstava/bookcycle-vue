<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-6">Завершіть ваш профіль</h1>
          <p class="text-gray-600 mb-8">
            Для повноцінного використання платформи, будь ласка, заповніть інформацію про себе.
            Це допоможе іншим користувачам краще вас пізнати та полегшить процес обміну книгами.
          </p>
          
          <div v-if="errorMsg" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ errorMsg }}
          </div>
          
          <div v-if="successMsg" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {{ successMsg }}
          </div>
          
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ім'я *</label>
                <input 
                  v-model="form.firstName" 
                  type="text" 
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Прізвище *</label>
                <input 
                  v-model="form.lastName" 
                  type="text" 
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                <input 
                  v-model="form.phoneNumber" 
                  type="tel" 
                  required
                  placeholder="+380XXXXXXXXX"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Місто *</label>
                <div v-if="isLoadingCities" class="flex items-center space-x-2 p-3">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  <span class="text-sm text-gray-500">Завантаження міст...</span>
                </div>
                <select 
                  v-else
                  v-model="form.cityId" 
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" disabled>Оберіть місто</option>
                  <option v-for="city in cities" :key="city.id" :value="city.id">
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Аватар</label>
              <input 
                type="file" 
                @change="handleFileUpload" 
                accept="image/*"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div class="flex justify-end">
              <button 
                type="submit" 
                class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Збереження...' : 'Зберегти та продовжити' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
  requiresAuth: true
});

import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const errorMsg = ref('')
const successMsg = ref('')
const isSubmitting = ref(false)

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  cityId: null as number | null,
  avatar: null as File | null
})

// Cities data
const cities = ref<Array<{ id: number, name: string }>>([])
const isLoadingCities = ref(false)

// Load cities from API
const loadCities = async () => {
  isLoadingCities.value = true
  
  try {
    const { data, error } = await useApi('/book_crossing/cities/')
    
    if (error.value) {
      console.error('Error loading cities:', error.value)
      return
    }
    
    cities.value = data.value || []
  } catch (err) {
    console.error('Error loading cities:', err)
  } finally {
    isLoadingCities.value = false
  }
}

// Handle file upload
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.avatar = target.files[0]
  }
}

// Update profile
const updateProfile = async () => {
  // Validate form
  if (!form.firstName || !form.lastName || !form.phoneNumber || !form.cityId) {
    errorMsg.value = 'Будь ласка, заповніть всі обов\'язкові поля'
    return
  }
  
  // Validate phone number format
  if (!/^\+?[0-9]{10,15}$/.test(form.phoneNumber)) {
    errorMsg.value = 'Введіть коректний номер телефону'
    return
  }
  
  isSubmitting.value = true
  errorMsg.value = ''
  successMsg.value = ''
  
  try {
    // Get username from store
    const username = userStore.user?.username
    
    if (!username) {
      errorMsg.value = 'Помилка: не вдалося отримати інформацію про користувача'
      return
    }
    
    // Update profile data
    const { error } = await useApi(`/user/user-profile/`, {
      method: 'PATCH',
      body: {
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phoneNumber,
        city: form.cityId
      }
    })
    
    if (error.value) {
      if (error.value.data) {
        // Handle specific validation errors
        if (error.value.data.phone_number) {
          errorMsg.value = `Помилка номера телефону: ${error.value.data.phone_number[0]}`
        } else if (error.value.data.city) {
          errorMsg.value = `Помилка міста: ${error.value.data.city[0]}`
        } else {
          errorMsg.value = 'Помилка при оновленні профілю'
        }
      } else {
        errorMsg.value = 'Помилка при оновленні профілю'
      }
      return
    }
    
    // If avatar was uploaded, update it separately
    if (form.avatar) {
      const formData = new FormData()
      formData.append('avatar', form.avatar)
      
      const { error: avatarError } = await useApi(`/user/user-profile/upload-avatar/`, {
        method: 'POST',
        body: formData
      })
      
      if (avatarError.value) {
        errorMsg.value = 'Помилка при завантаженні аватара, але основні дані профілю збережено'
        return
      }
    }
    
    // Show success message
    successMsg.value = 'Профіль успішно оновлено!'
    
    // Update user store with the new profile data
    if (userStore.user) {
      const selectedCity = cities.value.find(city => city.id === form.cityId)
      
      userStore.setUser({
        ...userStore.user,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phoneNumber,
        city: selectedCity?.name || '',
        city_id: form.cityId
      })
    }
    
    // Redirect to books page after a short delay
    setTimeout(() => {
      router.push('/books')
    }, 1500)
    
  } catch (err) {
    console.error('Error updating profile:', err)
    errorMsg.value = 'Помилка при оновленні профілю. Спробуйте пізніше.'
  } finally {
    isSubmitting.value = false
  }
}

// Check if user is already logged in and redirect if not
onMounted(async () => {
  if (!userStore.isAuthenticated) {
    router.push('/')
    return
  }
  
  // Get username from store
  const username = userStore.user?.username
  
  if (!username) {
    router.push('/')
    return
  }
  
  // Load cities
  await loadCities()
  
  try {
    // Get current profile data
    const { data, error } = await useApi(`/user/user-profile/`)
    
    if (error.value) {
      console.error('Error loading profile:', error.value)
      return
    }
    
    // Check if profile is already complete
    if (data.value?.first_name && data.value?.last_name && data.value?.phone_number && data.value?.city) {
      // Profile is already complete, redirect to books page
      router.push('/books')
      return
    }
    
    // Initialize form with current values if any
    form.firstName = data.value?.first_name || ''
    form.lastName = data.value?.last_name || ''
    form.phoneNumber = data.value?.phone_number || ''
    
    // Set city ID if available
    if (data.value?.city?.id) {
      form.cityId = data.value.city.id
    }
  } catch (err) {
    console.error('Error loading profile:', err)
  }
})
</script>
