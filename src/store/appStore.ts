import { registerAPI, requestChallengeAPI, verifyAPI } from '@/api'
import { generateNewDID, getAvailableDIDs, importAddressToDID } from '@/veramo/dids'
import { createVP, saveVC } from '@/veramo/vc'
import type { IIdentifier, VerifiableCredential } from '@veramo/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const availableDids = ref<IIdentifier[]>([])
  const vcs = ref<VerifiableCredential[]>([])
  const selectedDIDForRegister = ref<string | null>(null)
  const selectedDIDForLogin = ref<string | null>(null)

  const selectedVC = computed(() => {
    return vcs.value.find((vc) => vc.credentialSubject.did === selectedDIDForLogin.value)
  })

  const didsWithVC = computed(() => {
    return availableDids.value
      .filter((did) => vcs.value.find((vc) => vc.credentialSubject.did === did.did))
      .map((did) => did.did)
  })

  async function fetchAvailableDIDs() {
    const dids = await getAvailableDIDs()
    availableDids.value = dids
  }

  async function generateDID() {
    const did = await generateNewDID()
    await fetchAvailableDIDs()
    return did
  }

  async function importDID(address: string, privateKey: string) {
    const did = await importAddressToDID(address, privateKey)
    await fetchAvailableDIDs()
    return did
  }

  async function registerToServer() {
    if (!selectedDIDForRegister.value) {
      return
    }
    const { vc } = await registerAPI(selectedDIDForRegister.value)
    await saveVC(vc)
    vcs.value.push(vc)
    console.log(vcs.value)
    return vc
  }

  async function login() {
    if (!selectedVC.value) {
      return
    }
    const did = selectedVC.value.credentialSubject.did

    const { challenge } = await requestChallengeAPI(did)

    const vp = await createVP(challenge, selectedVC.value)

    const { success } = await verifyAPI(vp)
    return success
  }

  return {
    availableDids,
    selectedDIDForRegister,
    selectedDIDForLogin,
    vcs,
    selectedVC,
    didsWithVC,
    fetchAvailableDIDs,
    generateDID,
    importDID,
    registerToServer,
    login,
  }
})
