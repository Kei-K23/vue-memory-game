<script setup lang="ts">
import GameBoard from "./components/GameBoard.vue";
</script>

<template>
  <main
    class="min-h-screen w-full bg-neutral-900 flex flex-col items-center justify-center mx-auto text-neutral-100 px-4"
  >
    <div
      class="h-full flex-1 flex flex-col items-center justify-start md:justify-center container mx-auto w-full mt-10 md:mt-0"
    >
      <h1 class="text-xl text-center md:text-3xl font-bold">
        <span class="text-emerald-600">V</span> - Memory Game
      </h1>
      <GameBoard />
    </div>
  </main>
</template>
