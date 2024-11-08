<script setup lang="ts">
import { Card } from "../type/game";

defineProps<{
  card: Card;
}>();
</script>

<template>
  <div
    class="size-[60px] md:size-[90px]"
    :class="{ 'cursor-pointer': !card.isMatched }"
  >
    <div
      class="relative w-full h-full transition-transform duration-600 transform-style-3d"
      :class="{
        'rotate-y-180': card.isFlipped,
        'animate-shake': !card.isMatched && card.isFlipped,
      }"
    >
      <!-- Card Front -->
      <div
        class="absolute w-full h-full bg-emerald-500 rounded-xl flex items-center justify-center text-white backface-hidden"
        :class="{ 'opacity-0': card.isMatched }"
      >
        <span class="text-2xl">?</span>
      </div>

      <!-- Card Back -->
      <div
        class="absolute w-full h-full bg-neutral-50 rounded-xl flex items-center justify-center rotate-y-180 backface-hidden border-4"
        :class="{
          'border-green-600': card.isMatched,
          'border-emerald-600': !card.isMatched,
        }"
      >
        <span class="text-4xl">{{ card.value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
