<script setup lang="ts">
import { ref } from "vue";
import { Card, GameState as GameStateType } from "../type/game";
import { useStorage } from "@vueuse/core";
import CardComponent from "./CardComponent.vue";

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];
const cards = ref<Card[]>([]);
const flippedCards = ref<Card[]>([]);
const showConfetti = ref<boolean>(false);

// Initial game state value
const state = ref<GameStateType>({
  moves: 0,
  matched: 0,
  startTime: Date.now(),
  bestRecord: Number(useStorage("vue_memory_game", 0).value),
});

const initializeGame = () => {
  const shuffledCard: Card[] = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false,
      isMatched: false,
    }));
  cards.value = shuffledCard;
  flippedCards.value = [];
  state.value = {
    moves: 0,
    matched: 0,
    startTime: Date.now(),
    bestRecord: state.value.bestRecord,
  };
};

initializeGame();
</script>

<template>
  <div class="max-w-4xl">
    <CardComponent v-for="card in cards" :key="card.id" :card="card" />
  </div>
</template>
