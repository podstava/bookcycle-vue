<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-8">
          <div class="flex flex-col md:flex-row gap-8 items-start">
            <!-- Avatar -->
            <div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <Icon v-if="!userProfile?.avatar" name="heroicons:user" class="w-20 h-20 text-gray-400" />
              <img v-else :src="userProfile.avatar" alt="User avatar" class="w-full h-full object-cover" />
            </div>
            
            <!-- User info -->
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-900">{{ userStore.user?.username }}</h1>
              <p class="text-gray-600">{{ userStore.user?.email }}</p>
              
              <div class="mt-6 space-y-4">
                <div v-if="userProfile?.first_name || userProfile?.last_name" class="flex items-center gap-2">
                  <Icon name="heroicons:user" class="w-5 h-5 text-gray-500" />
                  <span>{{ userProfile.first_name }} {{ userProfile.last_name }}</span>
                </div>
                
                <div v-if="userProfile?.phone_number" class="flex items-center gap-2">
                  <Icon name="heroicons:phone" class="w-5 h-5 text-gray-500" />
                  <span>{{ userProfile.phone_number }}</span>
                </div>
                
                <div v-if="userProfile?.city?.name" class="flex items-center gap-2">
                  <Icon name="heroicons:map-pin" class="w-5 h-5 text-gray-500" />
                  <span>{{ userProfile.city.name }}</span>
                </div>
              </div>
              
              <div class="mt-8 flex flex-wrap gap-4">
                <div class="bg-gray-100 rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold">{{ userProfile?.count_of_crosses || 0 }}</div>
                  <div class="text-sm text-gray-600">Обміни книг</div>
                </div>
                
                <div class="bg-gray-100 rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold">{{ userProfile?.reputation || 0 }}/5</div>
                  <div class="text-sm text-gray-600">Рейтинг</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Edit profile button -->
          <div class="mt-8 flex justify-end">
            <button 
              @click="isEditing = !isEditing" 
              class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {{ isEditing ? 'Скасувати' : 'Редагувати профіль' }}
            </button>
          </div>
          
          <!-- Edit profile form -->
          <div v-if="isEditing" class="mt-8 border-t pt-8">
            <h2 class="text-xl font-bold mb-4">Редагувати профіль</h2>
            
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ім'я</label>
                  <input 
                    v-model="form.firstName" 
                    type="text" 
                    class="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Прізвище</label>
                  <input 
                    v-model="form.lastName" 
                    type="text" 
                    class="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input 
                    v-model="form.phoneNumber" 
                    type="tel" 
                    class="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Місто</label>
                  <div v-if="isLoadingCities" class="flex items-center space-x-2 p-2">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                    <span class="text-sm text-gray-500">Завантаження міст...</span>
                  </div>
                  <select 
                    v-else
                    v-model="form.cityId" 
                    class="w-full p-2 border border-gray-300 rounded-lg"
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
                  class="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div class="flex justify-end">
                <button 
                  type="submit" 
                  class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Збереження...' : 'Зберегти зміни' }}
                </button>
              </div>
            </form>
          </div>
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

const userStore = useUserStore()
const userProfile = ref<any>(null)
const isLoading = ref(true)
const isEditing = ref(false)
const isSubmitting = ref(false)
const errorMsg = ref('')

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

// Load user profile
onMounted(async () => {
  if (!userStore.user?.username) return
  
  // Load cities first
  await loadCities()
  
  try {
    const { data, error } = await useApi(`/user/user-profile/${userStore.user.username}/`)
    
    if (error.value) {
      console.error('Error loading profile:', error.value)
      return
    }
    
    userProfile.value = data.value
    
    // Initialize form with current values
    form.firstName = data.value?.first_name || userStore.user?.first_name || ''
    form.lastName = data.value?.last_name || userStore.user?.last_name || ''
    form.phoneNumber = data.value?.phone_number || userStore.user?.phone_number || ''
    
    // Set city ID if available
    if (data.value?.city?.id) {
      form.cityId = data.value.city.id
    } else if (userStore.user?.city_id) {
      form.cityId = userStore.user.city_id
    }
    
    // Update user store with latest profile data
    if (userStore.user && data.value) {
      userStore.setUser({
        ...userStore.user,
        first_name: data.value.first_name,
        last_name: data.value.last_name,
        phone_number: data.value.phone_number,
        city: data.value.city?.name,
        city_id: data.value.city?.id,
        avatar: data.value.avatar
      })
    }
  } catch (err) {
    console.error('Error loading profile:', err)
  } finally {
    isLoading.value = false
  }
})

// Handle file upload
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.avatar = target.files[0]
  }
}

// Update profile
const updateProfile = async () => {
  isSubmitting.value = true
  errorMsg.value = ''
  
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
        city: form.cityId // Send city ID instead of name
      }
    })
    
    if (error.value) {
      errorMsg.value = 'Помилка при оновленні профілю'
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
        errorMsg.value = 'Помилка при завантаженні аватара'
        return
      }
    }
    
    // Reload profile data
    const { data } = await useApi(`/user/user-profile/`)
    userProfile.value = data.value
    
    // Update user store with latest profile data
    if (userStore.user && data.value) {
      const selectedCity = cities.value.find(city => city.id === form.cityId)
      
      userStore.setUser({
        ...userStore.user,
        first_name: data.value.first_name,
        last_name: data.value.last_name,
        phone_number: data.value.phone_number,
        city: selectedCity?.name || data.value.city?.name,
        city_id: form.cityId || undefined,
        avatar: data.value.avatar
      })
    }
    
    // Exit edit mode
    isEditing.value = false
  } catch (err) {
    console.error('Error updating profile:', err)
    errorMsg.value = 'Помилка при оновленні профілю'
  } finally {
    isSubmitting.value = false
  }
}
</script>
