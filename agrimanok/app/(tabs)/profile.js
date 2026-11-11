import { useState } from 'react';
import { View, ScrollView, Pressable, Share, Alert } from 'react-native';
import { router } from 'expo-router';
import { C, F, T, H, Icon, Screen, Card, Btn, peso } from '../../src/theme';
import { useApp } from '../../src/store';

const BADGES = [['medal', 'BAI Livestock Registry', '#R11-2023-882 (Davao Region)'], ['shield-plus', 'Avian Flu Negative Surveillance', 'Official BAI Certificate'], ['office-building', 'LGU Barangay Farm Clearance', 'Brgy. Tugbok Health Office approved']];
const SETTINGS = [['map-marker', 'Default Safe Meetup Points', 'Buhangin Outpost, Calinan Police Station'], ['spray-bottle', 'Farm Biosecurity Protocols', 'Disinfection booth log, footbath mandatory'], ['cash', 'GCash / Maya Payout Settings', '0917 ••• •482 (Connected & Protected)'], ['bell-ring-outline', 'Notification Preferences', 'SMS alerts & in-app chat push'], ['gavel', 'Help & BAI Regulations', 'Live bird shipping guidelines & permits']];
const LOGS = [['Danilo R. (Tagum City)', 'Bought 2x Australorp Breeders (₱3,200 via GCash)', 'Yesterday • 4:15 PM'], ['Mae L. (Digos)', 'Bought 10x Darag Pullets (₱4,200 via Cash)', 'Mon • 10:30 AM'], ['Jun P. (Panabo)', 'Bought 1 tray Ayam Cemani eggs (₱3,500)', 'Last week']];

export default function Profile() {
  const { user, products, setUser } = useApp();
  const [all, setAll] = useState(false);
  const mine = products.filter((p) => p.own);
  if (!user || user.guest) return (
    <Screen><View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14 }}>
      <Icon n="account-lock-outline" s={48} c={C.sub} /><H>Log in to view your farm profile</H>
      <Btn label="Log In" onPress={() => router.push('/login')} style={{ alignSelf: 'stretch' }} />
    </View></Screen>
  );
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Card style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: C.pc, alignItems: 'center', justifyContent: 'center' }}><T style={{ color: '#fff', fontFamily: F.x, fontSize: 24 }}>C</T></View>
            <View style={{ flex: 1 }}>
              <T style={{ fontSize: 11, color: C.primary, fontFamily: F.b }}>✔ BAI Level 2 Certified</T>
              <H>Carlo "Kuya Carlo" Alviola</H>
              <T style={{ fontSize: 12, color: C.sub }}>Alviola Heritage Poultry & Gamefowl</T>
              <T style={{ fontSize: 12, color: C.sub }}>Brgy. Tugbok, Davao City • Region XI</T>
            </View>
          </View>
          <Btn label="Post Live Bird Listing" icon="plus-circle-outline" onPress={() => router.push('/post')} />
        </Card>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {[['star', '4.9 ★', '148 Farm Reviews'], ['handshake', '99%', 'Meetup Completion'], ['wallet-outline', 'GCash Ready', 'Verified Payee'], ['calendar-today', 'Since 2022', '3+ Yrs Trader']].map(([ic, a, b]) => (
            <Card key={a} style={{ width: '48%', flexDirection: 'row', gap: 8, alignItems: 'center', padding: 10 }}><Icon n={ic} c={C.sec} /><View><T style={{ fontFamily: F.h }}>{a}</T><T style={{ fontSize: 11, color: C.sub }}>{b}</T></View></Card>
          ))}
        </View>

        <H>Biosecurity & Verification</H>
        {BADGES.map(([ic, a, b]) => <Card key={a} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><Icon n={ic} c={C.pc} /><View style={{ flex: 1 }}><T style={{ fontFamily: F.b }}>{a}</T><T style={{ fontSize: 12, color: C.sub }}>{b}</T></View><Icon n="check-circle" c={C.pc} s={18} /></Card>)}

        <H>Active Bird Listings ({mine.length} Live)</H>
        {mine.map((p) => (
          <Card key={p.id} style={{ gap: 6 }}>
            <T style={{ fontFamily: F.b }}>{p.name}</T>
            <T style={{ fontSize: 12, color: C.sub }}>{p.tag} • {p.cat}</T>
            <H style={{ color: C.primary }}>{peso(p.price)}<T style={{ fontSize: 12, color: C.sub }}> / {p.unit}</T></H>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Btn kind="out" label="Edit" icon="note-edit-outline" style={{ flex: 1, height: 40 }} onPress={() => router.push({ pathname: '/post', params: { id: p.id } })} />
              <Btn kind="out" label="Share" icon="share-variant" style={{ flex: 1, height: 40 }} onPress={() => Share.share({ message: `${p.name} — ${peso(p.price)} / ${p.unit} on AgriManok Mindanao` })} />
            </View>
          </Card>
        ))}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><H>Recent Trade & Meetup Logs</H><Pressable onPress={() => setAll(!all)}><T style={{ color: C.primary, fontFamily: F.b }}>{all ? 'Show Less' : 'View All'}</T></Pressable></View>
        {LOGS.slice(0, all ? 3 : 1).map(([n, d, t]) => <Card key={n} style={{ gap: 2 }}><T style={{ fontSize: 11, color: C.pc, fontFamily: F.b }}>✔ Completed • {t}</T><T style={{ fontFamily: F.b }}>{n}</T><T style={{ fontSize: 12, color: C.sub }}>{d}</T></Card>)}

        <H>Account & Farm Settings</H>
        {SETTINGS.map(([ic, a, b]) => (
          <Pressable key={a} onPress={() => Alert.alert(a, b)}>
            <Card style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><Icon n={ic} c={C.pc} /><View style={{ flex: 1 }}><T style={{ fontFamily: F.b }}>{a}</T><T style={{ fontSize: 12, color: C.sub }}>{b}</T></View><Icon n="chevron-right" c={C.sub} /></Card>
          </Pressable>
        ))}
        <Btn kind="out" label="Sign Out from AgriManok" icon="logout" onPress={() => { setUser(null); router.replace('/'); }} />
        <T style={{ textAlign: 'center', fontSize: 11, color: C.sub }}>AgriManok Mindanao v2.4.1 • BAI Region XI Livestock Development Council</T>
      </ScrollView>
    </Screen>
  );
}
