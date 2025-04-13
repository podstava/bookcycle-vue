<script setup lang="ts">
type Size = "md" | "lg"
type Style = "outline" | "primary" | "inverted" | "muted"

interface Props {
  href: string;
  size?: Size;
  block?: boolean;
  styleName?: Style;
  className?: string;
  [x: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
  size: "lg",
  styleName: "primary",
});

const sizes: Record<Size, string> = {
  lg: "px-5 py-2.5",
  md: "px-4 py-2",
};

const styles: Record<Style, string> = {
  outline: "bg-white border-2 border-black hover:bg-gray-100 text-black",
  primary: "bg-black text-white hover:bg-gray-800  border-2 border-transparent",
  inverted: "bg-white text-black border-2 border-transparent",
  muted: "bg-gray-100 hover:bg-gray-200 border-2 border-transparent",
};
</script>

<template>
  <NuxtLink
    :href="href"
    :class="[
      'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200',
      block && 'w-full',
      sizes[props.size],
      styles[props.styleName],
    ]"
    ><slot />
  </NuxtLink>
</template>
