# `expo-icp-vetkeys`

Welcome to the `expo-icp-vetkeys` project.
The Japanese version is available [here](README_ja.md).

## Demo

<a href="https://fpdhi-rqaaa-aaaag-at7ra-cai.icp0.io/" target="_blank" rel="noopener noreferrer">https://fpdhi-rqaaa-aaaag-at7ra-cai.icp0.io/</a>
(Ctrl+Click or ⌘+Click to open in new tab)

### Screen shots

- iPhone
  ![iPhone](./docs/images/iphone.jpeg)

- Xperia
  ![Xperia](./docs/images/xperia.png)

## Service Concept

When you authenticate with Internet Identity in an Expo app, you can encrypt/decrypt data without managing cryptographic keys. This improves user experience by eliminating the hassle and security risks associated with key management.

The system efficiently combines two encryption methods:

1. Fast symmetric encryption (AES): Used for data encryption/decryption
2. Identity-Based Encryption (IBE): Used for secure AES key management

This combination provides the following benefits:

- Fast encryption/decryption processing: Most data is processed using AES
- Secure key management: AES keys are protected using IBE
- Simple implementation: Encryption functionality can be implemented with just a few lines of code

Furthermore, this solution works across multiple platforms (iOS/Android/Web) and provides consistent encryption functionality across platforms.

## Target Users

- Application developers who want to implement end-to-end encryption
- Cross-platform app developers who need secure data protection features
- Projects looking to leverage encryption functionality on Internet Computer Protocol (ICP)
- Security-focused application developers who want to reduce key management burden

## Benefits and Features

- Efficient encryption system combining AES and IBE
  - Fast encryption/decryption processing (AES)
  - Secure key management (IBE)
  - Minimal code implementation
- Multi-platform support
  - Unified encryption API through expo-crypto-universal
  - Same code implementation for Web/Native
  - No platform-specific implementation needed
  - Consistent encryption functionality across platforms
- Integration with Internet Identity authentication
  - Passwordless secure authentication
  - Automatic key management

## Implementation Guide

### 1. Internet Identity Authentication Implementation

You can implement authentication with these simple steps:

1. **Set up Authentication Provider**: Configure the provider in your app entry file

```typescript
// Set up IIIntegrationProvider in app/_layout.tsx
import { useIIIntegration, IIIntegrationProvider } from 'expo-ii-integration';

const auth = useIIIntegration({
  localIPAddress: LOCAL_IP_ADDRESS,
  dfxNetwork: ENV_VARS.DFX_NETWORK,
  iiIntegrationCanisterId: ENV_VARS.CANISTER_ID_II_INTEGRATION,
  iiCanisterId: ENV_VARS.CANISTER_ID_INTERNET_IDENTITY,
});

return <IIIntegrationProvider value={auth}>...</IIIntegrationProvider>;
```

2. **Implement Login Functionality**: Add login feature with just a few lines

```typescript
// Use login function in components/LogIn.tsx
import { useIIIntegrationContext } from 'expo-ii-integration';

const { login } = useIIIntegrationContext();

await login();
```

3. **Implement Logout Functionality**: Add logout feature just as easily

```typescript
// Use logout function in components/LogOut.tsx
import { useIIIntegrationContext } from 'expo-ii-integration';

const { logout } = useIIIntegrationContext();

await logout();
```

### 2. AES/IBE Encryption Implementation

After authentication, you can implement encryption functionality with these steps:

1. **Prepare AES Encryption Key**: Initialize the encryption key in your application

```typescript
// app/(tabs)/index.tsx
import { useAesKey, AesProcessingView } from 'expo-aes-vetkeys';
import { createAesBackend } from '@/backend';
import { aesRawKeyStorage } from '@/storage';
import { cryptoModule } from '@/crypto';

const { identity } = useIIIntegrationContext();
const backend = createAesBackend(identity);
const { isProcessingAes, aesError } = useAesKey({
  identity,
  backend,
  cryptoModule,
  aesRawKeyStorage,
});

if (isProcessingAes) {
  return <AesProcessingView />;
}
```

2. **Implement Encryption/Decryption**: Implement encryption processing using the prepared key

```typescript
// components/AesIbeCipher.tsx
import { aesRawKeyStorage } from '@/storage';
import { cryptoModule } from '@/crypto';

// Encryption
const aesRawKey = await aesRawKeyStorage.retrieve();
const plaintextBytes = new TextEncoder().encode(inputText);
const ciphertext = await cryptoModule.aesEncryptAsync(
  plaintextBytes,
  aesRawKey,
);

// Decryption
const decrypted = await cryptoModule.aesDecryptAsync(ciphertext, aesRawKey);
const result = new TextDecoder().decode(decrypted);
```

This implementation allows you to achieve secure encryption/decryption functionality using the same code in both Web and Native environments.

## How We're Using ICP's Mechanisms

- Encryption system through vetKeys
  - IBE-based secure key management
  - Encryption key generation and management in canisters
  - Distributed key distribution system
- Authentication through Internet Identity (II)
  - Passwordless secure authentication
  - Access control for encryption keys
- Integration with ICP backend
  - Secure communication with the vetKeys system
  - Secure management of the master key

## Why We Chose to Develop with ICP and Its Advantages

Traditional encryption systems face significant challenges with key management and distribution. Cross-platform support also tends to make implementation complex.
By combining ICP's vetKeys functionality with Internet Identity, we solve these challenges and achieve the following benefits:

### Key Benefits

- **Enhanced Security**
  - Secure key management through IBE
  - Authentication strengthening through Internet Identity integration
  - Security guarantee through distributed systems
- **Improved Development Efficiency**
  - Simple API design
  - Cross-platform support
  - Minimal code implementation
- **Better User Experience**
  - Fast encryption/decryption processing
  - Automated key management
  - Seamless authentication integration

## Libraries Developed for This Project

- [expo-aes-vetkeys](https://github.com/higayasuo/expo-aes-vetkeys) - Library for easy AES/IBE encryption in Expo Web/Native
- [vetkeys-client-utils](https://github.com/higayasuo/vetkeys-client-utils) - Library to make ic-vetkd-utils-wasm2js easier to use
- ic-vetkd-utils-wasm2js - ic-vetkd-utils-0.1.0 wrapped in JavaScript for WASM, which can't be used in Expo, so converted to pure JavaScript using add-wasm2js
- [add-wasm2js](https://github.com/higayasuo/add-wasm2js) - Library to convert WASM libraries wrapped in JavaScript by wasm-pack to pure JavaScript
- [expo-crypto-universal](https://github.com/higayasuo/expo-crypto-universal) - Library for using AES with the same interface from Web/Native
- [expo-crypto-universal-web](https://github.com/higayasuo/expo-crypto-universal-web) - Web implementation of expo-crypto-universal
- [expo-crypto-universal-native](https://github.com/higayasuo/expo-ctypto-universal-native) - Native implementation of expo-crypto-universal

## Documentation

- [Setup guide](docs/setup.md)

## Repository Commits

You can check the development history of each repository from the links below. Refer to these if you want to track implementation details or change history:

- [expo-icp-vetkeys](https://github.com/higayasuo/expo-icp-vetkeys/commits?author=higayasuo)
- [expo-aes-vetkeys](https://github.com/higayasuo/expo-aes-vetkeys/commits?author=higayasuo)
- [vetkeys-client-utils](https://github.com/higayasuo/vetkeys-client-utils/commits?author=higayasuo)
- [add-wasm2js](https://github.com/higayasuo/add-wasm2js/commits?author=higayasuo)
- [expo-crypto-universal](https://github.com/higayasuo/expo-crypto-universal/commits?author=higayasuo)
- [expo-crypto-universal-web](https://github.com/higayasuo/expo-crypto-universal-web/commits?author=higayasuo)
- [expo-crypto-universal-native](https://github.com/higayasuo/expo-crypto-universal-native/commits?author=higayasuo)
