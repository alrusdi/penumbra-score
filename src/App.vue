<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-orange-800 to-yellow-700 text-white p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Подсчет очков - Пенумбра</h1>

    <div v-for="(player, index) in players" :key="index" class="bg-black bg-opacity-30 p-4 rounded-xl mb-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <template v-if="player.editing">
            <input
              v-model="player.name"
              @keyup.enter="player.editing = false"
              @blur="player.editing = false"
              class="bg-gray-200 text-black rounded px-2 py-1 text-sm"
              placeholder="Имя игрока"
              autofocus
            />
            <button @click="player.editing = false" class="btn btn-neutral join-item">✅</button>
          </template>
          <template v-else>
            <h2 class="text-xl font-semibold flex items-center gap-1">
              {{ player.name }}
              <button @click="player.editing = true" class="btn btn-neutral btn-sm btn-ghost">✏️</button>
            </h2>
          </template>
        </div>
        <button @click="removePlayer(index)" class="btn btn-neutral btn-sm btn-ghost">✖</button>
      </div>

      <div class="flex flex-wrap gap-2">
        <FieldWithPresets label="Аркана" v-model="player.arcana" />
        <FieldWithPresets label="Испытания" v-model="player.trials" />
        <FieldWithPresets label="Штрафы" v-model="player.penalties" />
        <FieldWithPresets label="Контракты" v-model="player.contracts" />
        <FieldWithPresets label="Планшет" v-model="player.tablet" />
        <FieldWithPresets label="Цели" v-model="player.goals" />
      </div>

      <div class="mt-3">
        <h3 class="text-base font-medium mb-1">Символы:</h3>
        <div class="flex flex-wrap gap-2">
          <FieldWithPresets label="Дракон" v-model="player.symbols[0]" />
          <FieldWithPresets label="Волки" v-model="player.symbols[1]" />
          <FieldWithPresets label="Дерево" v-model="player.symbols[2]" />
          <FieldWithPresets label="Олень" v-model="player.symbols[3]" />
          <FieldWithPresets label="Вор" v-model="player.symbols[4]" />
          <FieldWithPresets label="Замок" v-model="player.symbols[5]" />
        </div>
      </div>

      <div class="mt-4 font-bold text-lg">Очки: {{ calculateScore(player) }}</div>
    </div>

    <div class="flex justify-center mt-6">
      <button @click="addPlayer" :disabled="players.length >= 4" class="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-xl disabled:opacity-50">Добавить игрока</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import FieldWithPresets from './components/FieldWithPresets.vue';

let playerId = 1;

const createPlayer = () => ({
  name: `Игрок ${playerId++}`,
  editing: false,
  arcana: 0,
  trials: 0,
  penalties: 0,
  contracts: 0,
  tablet: 0,
  goals: 0,
  symbols: Array(6).fill(0)
});

const players = reactive([
  createPlayer(),
  createPlayer()
]);

function addPlayer() {
  if (players.length < 4) players.push(createPlayer());
}

function removePlayer(index) {
  if (players.length > 1) players.splice(index, 1);
}

function calculateSymbolPoints(symbols) {
  let points = 0;
  const fullSets = Math.min(...symbols);
  points += fullSets * 7;

  const remaining = symbols.map(s => s - fullSets);

  for (let count of remaining) {
    if (count >= 5) points += 9;
    else if (count === 4) points += 6;
    else if (count === 3) points += 4;
    else if (count === 2) points += 2;
    else if (count === 1) points += 1;
  }

  return points;
}

function calculateScore(player) {
  const symbolPoints = calculateSymbolPoints(player.symbols);
  return (
    player.arcana +
    player.trials +
    player.contracts +
    player.tablet +
    player.goals -
    player.penalties +
    symbolPoints
  );
}
</script>

<style scoped>
@reference "./style.css";
.input {
  @apply bg-gray-200 text-black rounded-md px-2 py-1 w-[100px] font-sans text-sm;
}
</style>
