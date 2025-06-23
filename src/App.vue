<template>
  <div class="min-h-screen text-white pt-6">
    <div v-for="(player, index) in players" :key="index" class="bg-black bg-opacity-30 p-4 rounded-xl mb-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2 join">
          <template v-if="player.editing">
            <input
              v-model="player.name"
              @keyup.enter="player.editing = false"
              @blur="player.editing = false"
              class="input text-lg join-item"
              placeholder="Имя игрока"
              autofocus
            />
            <button @click="player.editing = false" class="btn btn-neutral join-item">✅</button>
          </template>
          <template v-else>
            <h2 class="text-xl font-semibold flex items-center gap-1 join-item">{{ player.name }}</h2>
            <button @click="player.editing = true" class="btn btn-neutral btn-sm btn-ghost join-item">✏️</button>
          </template>
        </div>

        <div class="font-bold text-xl text-purple-900">Очки: {{ calculateScore(player) }}</div>

        <button @click="removePlayer(index)" class="btn btn-neutral btn-sm btn-ghost text-red-400">✖</button>
      </div>

      <div class="flex flex-wrap gap-2 justify-center">
        <FieldWithPresets label="Аркана" v-model="player.arcana" :tgt="'arcana_'+index" />
        <FieldWithPresets label="Испытания" v-model="player.trials" :tgt="'trials_'+index" />
        <FieldWithPresets label="Ранения" v-model="player.penalties" :tgt="'penalties_'+index" />
        <FieldWithPresets label="Контракты" v-model="player.contracts" :tgt="'contracts_'+index" />
        <FieldWithPresets label="Планшет" v-model="player.tablet" :tgt="'tablet_'+index" />
        <FieldWithPresets label="Цели" v-model="player.goals" :tgt="'goals_'+index" />
        <FieldWithPresets label="Свет/Тьма" v-model="player.mentality" :tgt="'mentality_'+index" />
      </div>

      <div class="mt-3">
        <div class="divider text-xs m-0">количество символов</div>
        <div class="flex flex-wrap gap-2 justify-center">
          <FieldWithPresets label="Дракон" v-model="player.symbols[0]" :tgt="'dragons_'+index" />
          <FieldWithPresets label="Волки" v-model="player.symbols[1]" :tgt="'wolves_'+index" />
          <FieldWithPresets label="Дерево" v-model="player.symbols[2]" :tgt="'wood_'+index" />
          <FieldWithPresets label="Олень" v-model="player.symbols[3]" :tgt="'deer_'+index" />
          <FieldWithPresets label="Вор" v-model="player.symbols[4]" :tgt="'thief_'+index" />
          <FieldWithPresets label="Замок" v-model="player.symbols[5]" :tgt="'castle_'+index" />
        </div>
      </div>
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
  mentality: 0,
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

  for (let count of symbols) {
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
    player.goals +
    player.mentality -
    player.penalties +
    symbolPoints
  );
}
</script>
