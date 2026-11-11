import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { C, F, T, Icon, Btn, Screen } from '../src/theme';
import { useApp } from '../src/store';

export default function Splash() {
  const { setUser } = useApp();
  const [p, setP] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setP((x) => (x >= 100 ? 100 : x + 4)), 80);
    return () => clearInterval(i);
  }, []);
  return (
    <Screen style={{ backgroundColor: C.primary }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <View style={{ width: 112, height: 112, borderRadius: 56, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#ffb77d' }}>
          <Icon n="bird" s={60} c={C.primary} />
        </View>
        <T style={{ fontFamily: F.x, fontSize: 30, color: '#fff', marginTop: 20 }}>AgriManok <T style={{ fontFamily: F.x, fontSize: 30, color: C.secf }}>Mindanao</T></T>
        <T style={{ color: '#d3ffd5', textAlign: 'center', marginTop: 8, fontSize: 15 }}>Mindanao's Trusted Hyperlocal Poultry & Livestock Exchange</T>
        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 18, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <Icon n="shield-check" s={16} c={C.secf} />
          <T style={{ color: '#fff', fontSize: 11, fontFamily: F.b }}>DA-BAI LEVEL 2 CERTIFIED • SAFE TRADE HUB</T>
        </View>
      </View>
      <View style={{ padding: 20, gap: 12 }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 12, gap: 8 }}>
          <T style={{ color: '#fff', fontSize: 12, fontFamily: F.b }}>{p < 100 ? `Syncing livestock auctions & safe hubs... ${p}%` : 'Ready • Davao, Bukidnon, General Santos & Cotabato feeds live'}</T>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' }}><View style={{ width: `${p}%`, height: 6, borderRadius: 3, backgroundColor: C.pf }} /></View>
        </View>
        <Btn kind="light" label="Get Started / Breeder Login" icon="arrow-right" onPress={() => router.push('/login')} />
        <Btn kind="ghost" label="Browse Marketplace as Guest" onPress={() => { setUser({ guest: true }); router.replace('/market'); }} />
        <T style={{ color: '#d3ffd5', fontSize: 11, textAlign: 'center' }}>Version 1.0.4 • Powered by Mindanao Poultry Breeders Cooperative</T>
      </View>
    </Screen>
  );
}
