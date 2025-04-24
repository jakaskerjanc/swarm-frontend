import type { VerifiableCredential, VerifiablePresentation } from '@veramo/core'

export async function registerAPI(did: string): Promise<{ vc: VerifiableCredential }> {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        did,
      }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error registering:', error)
    throw error
  }
}

export async function requestChallengeAPI(did: string): Promise<{ challenge: string }> {
  try {
    const response = await fetch('http://localhost:3000/api/request-challenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        did,
      }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error requesting challenge:', error)
    throw error
  }
}

export async function verifyAPI(
  vp: VerifiablePresentation,
): Promise<{ success: boolean; error?: string }> {
  try {
    const verifyResponse = await fetch('http://localhost:3000/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vp,
      }),
    })
    return await verifyResponse.json()
  } catch (error) {
    console.error('Error verifying:', error)
    throw error
  }
}

export async function login(vc: VerifiableCredential): Promise<any> {
  try {
    const loginResponse = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vc,
      }),
    })
    return await loginResponse.json()
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}
