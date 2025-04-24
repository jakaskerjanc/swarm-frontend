<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Register</h1>
      <h3>Sign up with a unique DID ethr method</h3>
      <Select class="did-select" v-model="selectedDIDForRegister" :options="didOptions" />
      <div class="button-container">
        <Button
          :disabled="!selectedDIDForRegister"
          label="Register"
          @click="registerToServerAndShowToast"
        />
        <Button label="Generate a new DID ethr" @click="generateDIDAndShowToast" />
        <Button label="Import a DID ethr" @click="showImportDIDInput" />
        <Button label="Back" @click="router.push('/')" />
      </div>
      <div v-if="isImportDIDVisible">
        <div class="import-did-container">
          <span> Import address to DID</span>
          <InputText placeholder="Address" v-model="address" />
          <InputText type="password" placeholder="Private Key" v-model="privateKey" />
          <Button label="Import" @click="importDIDAndShowToast" />
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAppStore } from '../store/appStore'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

onMounted(async () => {
  await fetchAvailableDIDs()
})

const router = useRouter()
const toast = useToast()

const { importDID, generateDID, fetchAvailableDIDs, registerToServer } = useAppStore()

const didOptions = computed(() => {
  return useAppStore().availableDids.map((did) => did.did)
})
const selectedDIDForRegister = computed({
  get() {
    return useAppStore().selectedDIDForRegister
  },
  set(value) {
    useAppStore().selectedDIDForRegister = value
  },
})

const address = ref('')
const privateKey = ref('')
const isImportDIDVisible = ref(false)

function showImportDIDInput() {
  isImportDIDVisible.value = true
}

async function generateDIDAndShowToast() {
  const did = await generateDID()
  toast.add({
    severity: 'success',
    summary: 'DID Generated',
    detail: 'New DID generated: \n' + did.did,
    life: 3000,
  })
}

async function importDIDAndShowToast() {
  const did = await importDID(address.value, privateKey.value)
  toast.add({
    severity: 'success',
    summary: 'DID Imported',
    detail: 'New DID imported: \n' + did.did,
    life: 3000,
  })
}

async function registerToServerAndShowToast() {
  const did = await registerToServer()
  toast.add({
    severity: 'success',
    summary: 'DID Registered',
  })
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
  gap: 1rem;
  align-items: center;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
  font-weight: 600;
}

.button-container {
  display: flex;
  gap: 1rem;
}

.import-did-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.did-select {
  width: 80%;
}
</style>
