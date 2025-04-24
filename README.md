# Swarm Frontend

A decentralized identity-based authentication and management frontend for the TrustManagement system, built with Vue.js.

## Overview

Swarm Frontend provides a user interface for managing decentralized identifiers (DIDs) and verifiable credentials. It enables users to register, authenticate, and manage their identity in a decentralized manner without relying on traditional username/password systems.

## Key Features

- **DID Creation and Management**: Generate and manage DIDs (Decentralized Identifiers)
- **Verifiable Credential Handling**: Store and present verifiable credentials
- **Secure Authentication**: Challenge-response authentication using cryptographic proofs
- **Identity Verification**: Verify issued credentials during the authentication process
- **User-friendly Interface**: Modern UI with intuitive identity management workflows

## Technology Stack

- **Vue.js 3**: Core frontend framework with Composition API
- **Vite**: Fast development server and build tool
- **TypeScript**: Type-safe JavaScript development
- **Pinia**: State management store
- **Vue Router**: Client-side routing
- **PrimeVue**: UI component library for a consistent, modern look
- **Veramo SDK**: Framework for DIDs and verifiable credentials
- **Ethereum Integration**: Support for ethr-did method for blockchain-based DIDs

## Project Setup

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- A running instance of the Verifiable Data Service

### Installation

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd swarm-frontend

# Install dependencies
npm install
```

### Running for Development

```bash
npm run dev
```

The application will be available at http://localhost:5173 (or another port specified by Vite).

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

### Linting and Formatting

```bash
# Lint files
npm run lint

# Format files
npm run format
```

## Usage Flow

1. **Registration**:
   - Navigate to the Register page
   - The system will create a new DID for you
   - A verifiable credential will be issued from the backend
   - The credential is stored in your local browser storage

2. **Authentication**:
   - Navigate to the Login page
   - The system will retrieve your stored credential
   - A challenge is requested from the backend
   - Your credential and the signed challenge are submitted for verification
   - Upon successful verification, you'll be authenticated

## API Integration

The frontend interacts with the Verifiable Data Service API through these endpoints:

- **Registration**: `POST /api/register` - Registers a new DID and receives a verifiable credential
- **Challenge Request**: `POST /api/request-challenge` - Requests a challenge for authentication
- **Verification**: `POST /api/verify` - Verifies a signed challenge presentation
- **Login**: `POST /api/login` - Authenticates using a verifiable credential

## Folder Structure

- `src/` - Source code
  - `components/` - Vue components
  - `router/` - Vue Router configuration
  - `store/` - Pinia stores
  - `veramo/` - Veramo SDK configuration
  - `views/` - Page components
  - `api.ts` - API integration functions
  - `main.ts` - Application entry point

## Security Considerations

- All credentials are securely stored in browser storage
- Private keys never leave the client
- Challenge-based authentication prevents replay attacks
- Cryptographic signatures ensure credential integrity
- No passwords are stored or transmitted
