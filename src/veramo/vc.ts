import type { VerifiableCredential } from '@veramo/core'
import { agent } from './veramoAgent'

export async function saveVC(vc: VerifiableCredential) {
  await agent.dataStoreSaveVerifiableCredential({
    verifiableCredential: vc,
  })
}

export async function createVP(challenge: string, vc: VerifiableCredential) {
  const did = vc.credentialSubject.did

  if (!did) {
    throw new Error('DID is required')
  }

  const vp = await agent.createVerifiablePresentation({
    presentation: {
      holder: did,
      verifiableCredential: [vc],
    },
    proofFormat: 'jwt',
    challenge,
  })
  return vp
}
