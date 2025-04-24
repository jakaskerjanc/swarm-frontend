<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Login</h1>
      <h3>Sign in with your DID</h3>
      <Select class="did-select" v-model="selectedDIDForLogin" :options="didsWithVC" />
      <div class="vc-container" v-if="selectedVC">
        <h3>Your Verifiable Credential</h3>
        <div class="vc-card">
          <pre>{{ JSON.stringify(selectedVC, null, 4) }}</pre>
        </div>
      </div>
      <div class="button-container">
        <Button
          :disabled="!selectedDIDForLogin"
          label="Sign in using Verifiable Credential"
          @click="loginAndShowToast"
        />
        <Button label="Sign up" @click="router.push('/register')" />
      </div>
    </div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/appStore'
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const toast = useToast()
const { login } = useAppStore()

const selectedVC = computed(() => useAppStore().selectedVC)

const router = useRouter()
const didsWithVC = computed(() => useAppStore().didsWithVC)

const selectedDIDForLogin = computed({
  get() {
    return useAppStore().selectedDIDForLogin
  },
  set(value) {
    useAppStore().selectedDIDForLogin = value
  },
})

async function loginAndShowToast() {
  const success = await login()
  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Login successful',
      life: 3000,
    })
    router.push('/success')
  } else {
    toast.add({
      severity: 'error',
      summary: 'Login failed',
      life: 3000,
    })
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
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

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  button {
    width: fit-content;
  }
}

.did-select {
  width: 80%;
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
}

pre {
  text-align: left;
}
</style>
