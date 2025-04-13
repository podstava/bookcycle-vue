<script setup>
const props = defineProps({
  showLoginModal: Boolean,
  showRegisterModal: Boolean
})

const emit = defineEmits(['update:show-login-modal', 'update:show-register-modal'])

const menuitems = [
  {
    title: "Особливості",
    path: "/features",
  },
  {
    title: "Ціни",
    path: "/pricing",
  },
  {
    title: "Про нас",
    path: "/about",
  },
  {
    title: "Контакти",
    path: "/contact",
  },
];

const open = ref(false);
</script>

<template>
  <LandingContainer>
    <header class="flex flex-col lg:flex-row justify-between items-center my-5">
      <div class="flex w-full lg:w-auto items-center justify-between">
        <a href="/" class="text-lg"
          ><span class="font-bold text-slate-800">Book</span
          ><span class="text-slate-500">cycle</span>
        </a>
        <div class="block lg:hidden">
          <button @click="open = !open" class="text-gray-800">
            <svg
              fill="currentColor"
              class="w-4 h-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path
                v-show="open"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
              ></path>
              <path
                v-show="!open"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <nav
        class="w-full lg:w-auto mt-2 lg:flex lg:mt-0"
        :class="{ block: open, hidden: !open }"
      >
        <ul class="flex flex-col lg:flex-row lg:gap-3">
          <li v-for="item of menuitems">
            <NuxtLink
              :to="item.path"
              class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
        <div class="lg:hidden flex items-center mt-3 gap-4">
          <button @click="emit('update:show-login-modal', true)" class="text-gray-600 hover:text-gray-900">Увійти</button>
          <button @click="emit('update:show-register-modal', true)" class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Зареєструватись</button>
        </div>
      </nav>
      <div>
        <div class="hidden lg:flex items-center gap-4">
          <button @click="emit('update:show-login-modal', true)" class="text-gray-600 hover:text-gray-900">Увійти</button>
          <button @click="emit('update:show-register-modal', true)" class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Зареєструватись</button>
        </div>
      </div>
    </header>
  </LandingContainer>
</template>
