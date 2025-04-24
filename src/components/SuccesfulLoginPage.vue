<script setup lang="ts">
import { useAppStore } from '@/store/appStore'
import { computed } from 'vue'

const selectedVC = computed(() => useAppStore().selectedVC)
</script>

<template>
  <div class="success-container">
    <div class="success-card">
      <h1>Login successful</h1>

      <div class="vc-container" v-if="selectedVC">
        <h3>Your Verifiable Credential</h3>
        <div class="vc-card">
          <pre>{{ JSON.stringify(selectedVC, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.success-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
  font-weight: 600;
}

.vc-container {
  width: 80%;
}

.vc-card {
  font-size: 12px;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
  width: 100%;
  text-align: left;
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #eaeaea;
}

pre {
  text-align: left;
  margin: 0;
}
</style>
