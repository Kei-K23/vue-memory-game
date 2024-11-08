<script setup lang="ts">
import { Card } from "../type/game";

defineProps<{
  card: Card;
}>();
</script>

<template>
  <span>{{ card.value }}</span>
</template>
