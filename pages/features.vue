<template>
  <div class="min-h-screen bg-gray-50">

    <section class="p-8 max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Що таке BookCycle?</h1>
      <p class="text-lg text-slate-600 dark:text-slate-300 mb-10">
        <strong>BookCycle</strong> — це революційна платформа для обміну книгами між людьми. Ми повертаємо культуру читання,
        робимо книги доступними та даємо їм друге життя. Безкоштовно. Зручно. Локально.
      </p>

      <div class="grid gap-8 md:grid-cols-2">
        <FeatureCard
          title="📚 Спільний обмін книгами"
          description="Додавай свої книги та знаходь нові — усе просто, прозоро і безкоштовно. BookCycle об'єднує читачів у твоєму місті."
        />
        <FeatureCard
          title="📦 Варіанти передачі"
          description="Передача книги поштою, особиста зустріч або через партнерську точку — обирай, що зручно саме тобі."
        />
        <FeatureCard
          title="💬 Відгуки та довіра"
          description="Кожен користувач має профіль, де видно історію обміну та оцінки. Довіра — головна валюта BookCycle."
        />
        <FeatureCard
          title="🧭 Локальний пошук"
          description="Знаходь книги у своєму районі або місті, щоб не чекати тижнями на доставку. Швидко та зручно."
        />
        <FeatureCard
          title="🎟 Підписки та бонуси"
          description="Доступ до ексклюзивних книг, партнерських бібліотек і подій — через підписку або активну участь у спільноті."
        />
        <FeatureCard
          title="📱 Сучасний інтерфейс"
          description="Адаптивний, легкий і швидкий дизайн. Користуйся з мобільного, планшета чи комп'ютера — без обмежень."
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

import FeatureCard from '@/components/landing/FeatureCard.vue'
</script>
