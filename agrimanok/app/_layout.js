import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import { Store } from '../src/store';

export default function Root() {
  const [ok] = useFonts({ Inter_400Regular, Inter_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold });
  if (!ok) return null;
  return (
    <Store>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </Store>
  );
}
