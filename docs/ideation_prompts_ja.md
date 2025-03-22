Internet Computer Protocol(ICP)のハッカソンの提出ドキュメントを書きましょう。

[実現したこと]をベースに[ICP の特徴]を踏まえて、[出力フォーマット]に従って出力してください

---

ICP の特徴

1. **分散型コンピューティング**

   - グローバル分散ノード構成
   - マルチリージョンクラウド並みの高可用性
   - 中央集権型インフラからの脱却

2. **高度なスケーラビリティ**

   - サブネットの追加による水平方向の拡張性
   - キャニスター単位で最大 500GiB までのステーブルメモリ
   - キャニスター単位で最大 4GiB までのヒープメモリ
   - 複数キャニスターの連携による大規模システム構築

3. **システム全体一括管理**

   - フロントエンドからバックエンドまで ICP 上に一括デプロイ
   - クラウドサービス不要のフルスタック環境
   - WebAssembly ベースの統一実行環境

4. **コード検証**

   - GitHub など公開ソースと Canister（プログラム）の完全一致を確認可能
   - 不正コード混入の防止を保証
   - システム全体の透過的なセキュリティ検証が可能

5. **ユーザー認証**

   - 「Internet Identity (II)」によるパスワード不要の安全な認証
   - 生体認証レベルの簡便さとセキュリティ
   - 複数デバイスでの認証情報共有

6. **高速トランザクション**

   - 1-2 秒での取引完全確定
   - ファイナリティ保証による即時取引確定
   - 大規模な並列処理による高スループット

7. **自動防御と修復**

   - プロトコルレベルでの異常トラフィック検知と防御
   - ノード間の自動負荷分散による攻撃緩和
   - 障害ノードの自動検知と切り離し
   - レプリケーションによるデータ整合性の維持

8. **分散型署名システム**

   - 秘密鍵を 34 ノードに分散して保管
   - 複数ノードの協調による安全な署名処理
   - キャニスター自身による自律的な署名実行
   - 単一障害点のない堅牢な鍵管理

9. **マルチチェーン統合**

   - Bitcoin ノードとの直接統合による安全な連携
   - EVM チェーンとの複数 RPC ノードを介した信頼性の高い通信
   - ブリッジ不要のセキュアな相互運用性

10. **リバースガス方式**

    - 従来型ブロックチェーンと異なりユーザーの手数料不要
    - 開発者がサイクル（計算資源）を提供
    - エンドユーザーの利用障壁を排除

11. **ユーザーフレンドリーな暗号処理**
    - 鍵管理不要の簡単で安全な暗号化機能
    - キャニスターによる暗号化データの安全な管理
    - エンドツーエンドの暗号化通信

---

出力フォーマット

## サービスコンセプト

サービスのコンセプトを魅力的に感じる一言で表現してください。

## 利用ユーザ想定（ターゲット）

## メリットや特徴

## ICP の仕組みをどの部分で使っているか

## なぜ ICP の仕組みを活用して開発したか、その優位性や理由

---

実現したこと

- これまで、Internet Identity をスマホネイティブアプリで使うことは難しかったが、簡単に使えるライブラリを作成したことで、誰でも簡単にネイティブアプリで Internet Identity が使えるようになった
- Expo Native だけでなく、Expo Web でも同じライブラリで使えるようにした
- 作成したライブラリ
  - [expo-ii-integration](https://github.com/higayasuo/expo-ii-integration)
    - Expo Web/Native から Internet Identity にアクセスするための ii-integration web アプリに接続するためのライブラリ
    - [commits](https://github.com/higayasuo/expo-ii-integration/commits?author=higayasuo)
  - [@higayasuo/iframe-messenger](https://github.com/higayasuo/iframe-messenger)
    - iframe 経由でサイトを開き、postMessage で type-safe にメッセージをやりとりするためのライブラリ
    - [commits](https://github.com/higayasuo/iframe-messenger/commits?author=higayasuo)
  - [canister-manager](https://github.com/higayasuo/canister-manager)
    - canister の URL は、ローカルでの開発の場合でも、Chrome と Safari でも違うし、PC とスマホでも違う。このような問題をスマートに解決するライブラリ
    - [commits](https://github.com/higayasuo/canister-manager/commits?author=higayasuo)
  - [expo-storage-universal](https://github.com/higayasuo/expo-storage-universal)
    - セキュアなストレージと通常ストレージに Web/Native から統一的にアクセスできるようにするベースライブラリ
    - [commits](https://github.com/higayasuo/expo-storage-universal/commits?author=higayasuo)
  - [expo-storage-universal-web](https://github.com/higayasuo/expo-storage-universal-web)
    - expo-storage-universal の Web 実装
    - [commits](https://github.com/higayasuo/expo-storage-universal-web/commits?author=higayasuo)
  - [expo-storage-universal-native](https://github.com/higayasuo/expo-storage-universal-native)
    - expo-storage-universal の Native 実装
    - [commits](https://github.com/higayasuo/expo-storage-universal-native/commits?author=higayasuo)
