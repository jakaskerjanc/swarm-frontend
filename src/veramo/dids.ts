import { agent } from './veramoAgent'
import { publicKeyCreate } from 'secp256k1'

export async function generateNewDID() {
  const did = await agent.didManagerCreate({
    provider: 'did:ethr',
  })
  return did
}

export async function getAvailableDIDs() {
  const dids = await agent.didManagerFind()
  return dids
}

export async function importAddressToDID(address: string, privateKey: string) {
  if (!address || !privateKey) {
    throw new Error('Address and private key are required')
  }

  const did = `did:ethr:${address}`

  // Convert private key hex string to Uint8Array
  const privateKeyBytes = new Uint8Array(
    privateKey.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
  )
  // Generate public key using secp256k1
  const publicKeyBytes = publicKeyCreate(privateKeyBytes, false).slice(1)
  // Convert public key bytes to hex string
  const publicKey = Array.from(publicKeyBytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

  console.log(publicKey)
  const importedDID = await agent.didManagerImport({
    did,
    provider: 'did:ethr',
    keys: [
      {
        privateKeyHex: privateKey,
        publicKeyHex: publicKey,
        kms: 'local',
        type: 'Secp256k1',
      },
    ],
  })
  return importedDID
}
