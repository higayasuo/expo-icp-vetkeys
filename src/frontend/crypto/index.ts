import { Platform } from 'react-native';
import { webCryptoModule } from 'expo-crypto-universal-web';
import { nativeCryptoModule } from 'expo-crypto-universal-native';

export const cryptoModule =
  Platform.OS === 'web' ? webCryptoModule : nativeCryptoModule;
