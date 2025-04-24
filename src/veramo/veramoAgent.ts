import {
  createAgent,
  type IKeyManager,
  type ICredentialStatusManager,
  type IDataStore,
  type IDIDManager,
  type IResolver,
  type ICredentialPlugin,
} from '@veramo/core'
import { DIDManager } from '@veramo/did-manager'
import { KeyManager } from '@veramo/key-manager'
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'
import { EthrDIDProvider } from '@veramo/did-provider-ethr'
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { CredentialPlugin } from '@veramo/credential-w3c'
import {
  BrowserLocalStorageStore,
  DIDStoreJson,
  KeyStoreJson,
  PrivateKeyStoreJson,
  DataStoreJson,
} from '@veramo/data-store-json'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'

const INFURA_PROJECT_ID = '7fc206dd573c4b3eac512956ee63645e'
const DB_KEY = '3144367becd6dff0f29336c3a2ac977abb5bc312c491668b0fbdc938bc0be7ac' // encryption key for local keys

const dataStore = BrowserLocalStorageStore.fromLocalStorage('veramo-state')

export const agent = createAgent<
  IDIDManager & IKeyManager & IDataStore & IResolver & ICredentialPlugin & ICredentialStatusManager
>({
  plugins: [
    new KeyManager({
      store: new KeyStoreJson(dataStore),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStoreJson(dataStore, new SecretBox(DB_KEY))),
      },
    }),
    new DIDManager({
      store: new DIDStoreJson(dataStore),
      defaultProvider: 'did:ethr',
      providers: {
        'did:ethr': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'mainnet',
          rpcUrl: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({
          networks: [
            {
              name: 'mainnet',
              rpcUrl: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
            },
          ],
        }),
      }),
    }),
    new DataStoreJson(dataStore),
    new CredentialPlugin(),
  ],
})
