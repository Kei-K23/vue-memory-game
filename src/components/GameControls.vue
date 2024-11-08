<script setup lang="ts">
defineEmits<{
  (e: "start"): void;
  (e: "restart"): void;
}>();

defineProps<{
  isGameStarted: boolean;
  isGameCompleted: boolean;
}>();
</script>

<template>
  <div class="flex items-center justify-center gap-x-4 mt-8">
    <button
      v-if="!isGameStarted"
      @click="$emit('start')"
      class="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-600/80 transition-colors"
    >
      Start Game
    </button>
    <button
      v-if="isGameStarted"
      @click="$emit('restart')"
      class="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-600/80 transition-colors"
    >
      {{ isGameCompleted ? "Play Again" : "Restart Game" }}
    </button>
  </div>
</template>
