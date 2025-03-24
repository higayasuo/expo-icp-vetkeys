# `expo-icp-vetkeys`

`expo-icp-vetkeys`プロジェクトへようこそ。
英語版は[こちら](README.md)です。

## デモ

<a href="https://fpdhi-rqaaa-aaaag-at7ra-cai.icp0.io/" target="_blank" rel="noopener noreferrer">https://fpdhi-rqaaa-aaaag-at7ra-cai.icp0.io/</a>
(Ctrl+Click or ⌘+Click to open in new tab)

### スクリーンショット

- iPhone
  ![iPhone](./docs/images/iphone.jpeg)

- Xperia
  ![Xperia](./docs/images/xperia.png)

## サービスコンセプト

Expo アプリで Internet Identity 認証すると、暗号鍵を管理することなく、暗号化/復号化ができるようになります。暗号鍵の管理はわずらわしく、セキュリティリスクも伴うため、これはユーザー体験を向上させます。

本システムでは、2 つの暗号化方式を効率的に組み合わせています：

1. 高速な対称暗号（AES）：データの暗号化/復号化に使用
2. Identity-Based Encryption（IBE）：AES 鍵の安全な管理に使用

この組み合わせにより、以下の利点を実現しています：

- 高速な暗号化/復号化処理：大部分のデータを AES で処理
- 安全な鍵管理：IBE を使用して AES 鍵を保護
- シンプルな実装：数行のコードで暗号化機能を実装可能

さらに、このソリューションはマルチプラットフォーム（iOS/Android/Web）で動作し、プラットフォーム間で一貫した暗号化機能を提供します。

## 利用ユーザ想定（ターゲット）

- エンドツーエンドの暗号化を実装したいアプリケーション開発者
- セキュアなデータ保護機能が必要なクロスプラットフォームアプリ開発者
- Internet Computer Protocol（ICP）上で暗号化機能を活用したいプロジェクト
- 鍵管理の負担を軽減したいセキュリティ重視のアプリケーション開発者

## メリットや特徴

- AES と IBE の組み合わせによる効率的な暗号化システム
  - 高速な暗号化/復号化処理（AES）
  - 安全な鍵管理（IBE）
  - 最小限のコードで実装可能
- マルチプラットフォーム対応
  - expo-crypto-universal による統一的な暗号化 API
  - Web/Native で同一のコードで実装可能
  - プラットフォーム固有の実装が不要
  - プラットフォーム間で一貫した暗号化機能
- Internet Identity 認証との統合
  - パスワードレスでセキュアな認証
  - 暗号鍵の自動管理

## 実装方法

### 1. Internet Identity 認証の実装

以下の手順で認証機能を実装できます：

1. **認証プロバイダーの設定**：アプリケーションの入り口ファイルでプロバイダーを設定

```typescript
// app/_layout.tsx で IIIntegrationProvider を準備
import { useIIIntegration, IIIntegrationProvider } from 'expo-ii-integration';

const auth = useIIIntegration({
  localIPAddress: LOCAL_IP_ADDRESS,
  dfxNetwork: ENV_VARS.DFX_NETWORK,
  iiIntegrationCanisterId: ENV_VARS.CANISTER_ID_II_INTEGRATION,
  iiCanisterId: ENV_VARS.CANISTER_ID_INTERNET_IDENTITY,
});

return <IIIntegrationProvider value={auth}>...</IIIntegrationProvider>;
```

2. **ログイン機能の実装**：わずか数行でログイン機能を追加

```typescript
// components/LogIn.tsx でログイン関数を利用
import { useIIIntegrationContext } from 'expo-ii-integration';

const { login } = useIIIntegrationContext();

await login();
```

3. **ログアウト機能の実装**：同様に簡単にログアウト機能も追加可能

```typescript
// components/LogOut.tsx でログアウト関数を利用
import { useIIIntegrationContext } from 'expo-ii-integration';

const { logout } = useIIIntegrationContext();

await logout();
```

### 2. AES/IBE 暗号化の実装

認証後、以下の手順で暗号化機能を実装できます：

1. **AES 暗号鍵の準備**：アプリケーションで暗号鍵を初期化

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

2. **暗号化/復号化の実装**：準備した鍵を使用して暗号化処理を実装

```typescript
// components/AesIbeCipher.tsx
import { aesRawKeyStorage } from '@/storage';
import { cryptoModule } from '@/crypto';

// 暗号化
const aesRawKey = await aesRawKeyStorage.retrieve();
const plaintextBytes = new TextEncoder().encode(inputText);
const ciphertext = await cryptoModule.aesEncryptAsync(
  plaintextBytes,
  aesRawKey,
);

// 復号化
const decrypted = await cryptoModule.aesDecryptAsync(ciphertext, aesRawKey);
const result = new TextDecoder().decode(decrypted);
```

この実装により、Web/Native の両環境で同じコードを使用して、安全な暗号化/復号化機能を実現できます。

## ICP の仕組みをどの部分で使っているか

- vetKeys による暗号化システム
  - IBE ベースの安全な鍵管理
  - キャニスターでの暗号鍵生成と管理
  - 分散型の鍵配布システム
- Internet Identity（II）による認証
  - パスワードレスでセキュアな認証
  - 暗号鍵へのアクセス制御
- ICP バックエンドとの連携
  - vetKeys システムとの安全な通信
  - マスター鍵の安全な管理

## なぜ ICP の仕組みを活用して開発したか、その優位性や理由

従来の暗号化システムでは、鍵の管理・配布が大きな課題でした。また、クロスプラットフォーム対応も実装が複雑になりがちです。
ICP の vetKeys 機能と Internet Identity を組み合わせることで、これらの課題を解決し、以下のメリットを実現しました：

### 主なメリット

- **セキュリティの向上**
  - IBE による安全な鍵管理
  - Internet Identity との統合による認証強化
  - 分散システムによるセキュリティ担保
- **開発効率の向上**
  - シンプルな API 設計
  - クロスプラットフォーム対応
  - 最小限のコードで実装可能
- **ユーザー体験の改善**
  - 高速な暗号化/復号化処理
  - 鍵管理の自動化
  - シームレスな認証連携

## AES/IBE 暗号化のために今回開発した関連ライブラリ

- [expo-aes-vetkeys](https://github.com/higayasuo/expo-aes-vetkeys) - Expo Web/Native から AES/IBE 暗号化を簡単に使えるようにするライブラリ
- [vetkeys-client-utils](https://github.com/higayasuo/vetkeys-client-utils) - ic-vetkd-utils-wasm2js を使いやすくするライブラリ
- ic-vetkd-utils-wasm2js - ic-vetkd-utils-0.1.0 は、WASM を JavaScript でラップしたもので、Expo では使えないので、add-wasm2js で pure JavaScript 化したもの
- [add-wasm2js](https://github.com/higayasuo/add-wasm2js) - wasm-pack で WASM を JavaScript でラップしているライブラリを pure JavaScript 化するライブラリ
- [expo-crypto-universal](https://github.com/higayasuo/expo-crypto-universal) - Web/Native から同じインターフェースで AES を使うライブラリ
- [expo-crypto-universal-web](https://github.com/higayasuo/expo-crypto-universal-web) - expo-crypto-universal の Web 実装
- [expo-crypto-universal-native](https://github.com/higayasuo/expo-crypto-universal-native) - expo-crypto-universal の Native 実装

## ドキュメント

- [セットアップガイド](docs/setup_ja.md)

## リポジトリの commits

以下のリンクから各リポジトリの開発履歴を確認できます。実装の詳細や変更履歴を追跡したい場合に参照してください：

- [expo-icp-vetkeys](https://github.com/higayasuo/expo-icp-vetkeys/commits?author=higayasuo)
- [expo-aes-vetkeys](https://github.com/higayasuo/expo-aes-vetkeys/commits?author=higayasuo)
- [vetkeys-client-utils](https://github.com/higayasuo/vetkeys-client-utils/commits?author=higayasuo)
- [add-wasm2js](https://github.com/higayasuo/add-wasm2js/commits?author=higayasuo)
- [expo-crypto-universal](https://github.com/higayasuo/expo-crypto-universal/commits?author=higayasuo)
- [expo-crypto-universal-web](https://github.com/higayasuo/expo-crypto-universal-web/commits?author=higayasuo)
- [expo-crypto-universal-native](https://github.com/higayasuo/expo-crypto-universal-native/commits?author=higayasuo)
