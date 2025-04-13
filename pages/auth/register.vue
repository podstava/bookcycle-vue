<script setup>
import { useUserStore } from '@/stores/user'

const username = ref('')
const email = ref('')
const password1 = ref('')
const password2 = ref('')
const errorMsg = ref('')
const router = useRouter()
const userStore = useUserStore()

const register = async () => {
  const { data, error } = await useFetch('/auth/users/', {
    baseURL: useRuntimeConfig().public.apiBase,
    method: 'POST',
    body: {
      username: username.value,
      email: email.value,
      password: password1.value,
      re_password: password2.value
    }
  })

  if (error.value) {
    errorMsg.value = 'Помилка реєстрації'
  } else {
    router.push('/auth/login')
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 space-y-4">
    <h1 class="text-2xl font-bold">Реєстрація</h1>
    <input v-model="username" type="text" placeholder="Username" class="w-full p-2 border" />
    <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border" />
    <input v-model="password1" type="password" placeholder="Password" class="w-full p-2 border" />
    <input v-model="password2" type="password" placeholder="Repeat Password" class="w-full p-2 border" />
    <p class="text-red-500" v-if="errorMsg">{{ errorMsg }}</p>
    <button @click="register" class="bg-green-600 text-white px-4 py-2 rounded">Зареєструватись</button>
  </div>
</template>
