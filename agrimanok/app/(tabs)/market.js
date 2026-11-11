import { useState } from 'react';
import { View, ScrollView, Pressable, Alert, Linking, Modal } from 'react-native';
import { router } from 'expo-router';
import { C, F, T, H, Icon, Screen, Card, Field, peso } from '../../src/theme';
import { useApp, CATS } from '../../src/store';

const CITIES = ['Buhangin, Davao City', 'Malaybalay, Bukidnon', 'General Santos City', 'Cotabato City'];
const CAT_ICON = { All: 'view-grid-outline', Native: 'bird', Layers: 'egg', Hatching: 'egg-outline', Chicks: 'baby-face-outline' };

export default function Market() {
  const { user, wallet, setWallet, products, alerts } = useApp();
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [find, setFind] = useState(false);
  const [city, setCity] = useState(0);
  const [menu, setMenu] = useState(false);
  const guest = !user || user.guest;
  const list = products.filter((p) => (cat === 'All' || p.cat === cat) && (p.name + p.farm).toLowerCase().includes(q.toLowerCase()));
  const needLogin = () => Alert.alert('Login required', 'Please log in to continue.', [{ text: 'Cancel' }, { text: 'Log in', onPress: () => router.push('/login') }]);
  const cashIn = () => (guest ? needLogin() : Alert.alert('Cash In', 'Add funds via GCash', [500, 1000, 2000].map((n) => ({ text: peso(n), onPress: () => setWallet((w) => w + n) })).concat([{ text: 'Cancel', style: 'cancel' }])));
  const actions = [
    ['store-plus', 'Post Birds for Sale', () => (guest ? needLogin() : router.push('/post'))],
    ['file-document-outline', 'BAI Pass & VHC Guide', () => Alert.alert('BAI Pass & VHC Guide', '1. Get a Veterinary Health Certificate from your city vet.\n2. Register birds with BAI Region XI.\n3. Carry a transit permit for inter-provincial trade.\n4. Keep ND/IB vaccination records for inspection.')],
    ['map-marker-radius', 'Safe Meetup Hubs', () => Alert.alert('Safe Meetup Hubs', '• Buhangin Brgy. Hall Outpost\n• Tugbok District Agrivet Parking\n• SM City Davao Annex (Ecoland)')],
    ['trending-up', 'Price Ticker: ₱240/kg', () => Alert.alert('Farmgate Native Manok', '₱240 – ₱265 / kg liveweight (Mindanao avg)\n+2.4% this week')],
  ];
  const nav = [['Profile', '/profile'], ['Inquiries', '/inquiries'], ['Bookings', '/bookings'], ['Alerts', '/alerts']];

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10, backgroundColor: '#fff' }}>
        <Pressable onPress={() => setMenu(true)}><Icon n="menu" c={C.primary} /></Pressable>
        <View style={{ flex: 1 }}>
          <H style={{ color: C.primary }}>AgriManok</H>
          <Pressable onPress={() => setCity((city + 1) % CITIES.length)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon n="map-marker" s={14} c={C.sec} /><T style={{ fontSize: 12, fontFamily: F.b }}>{CITIES[city]}</T><Icon n="chevron-down" s={14} />
          </Pressable>
        </View>
        <Pressable onPress={() => setFind(!find)}><Icon n="magnify" /></Pressable>
        <Pressable onPress={() => router.push('/alerts')}><Icon n="bell-outline" />{alerts.some((a) => !a.read) && <View style={{ position: 'absolute', right: 0, top: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: C.err }} />}</Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }} keyboardShouldPersistTaps="handled">
        {find && <Field placeholder="Search birds, eggs, farms..." value={q} onChangeText={setQ} autoFocus right={<Pressable onPress={() => { setQ(''); setFind(false); }}><Icon n="close" /></Pressable>} />}

        <View style={{ backgroundColor: C.primary, borderRadius: 16, padding: 16, gap: 12 }}>
          <T style={{ color: C.pf, fontFamily: F.b, fontSize: 12 }}>{guest ? 'GUEST MODE' : 'BAI Certified Grower #DX-4402'}</T>
          <H style={{ color: '#fff', fontSize: 22 }}>{guest ? 'Maayong Adlaw!' : 'Maayong Buntag, Pare Carlo!'}</H>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, gap: 10 }}>
            <Icon n="wallet-outline" c="#fff" />
            <View style={{ flex: 1 }}><T style={{ color: C.pf, fontSize: 11 }}>AgriManok Escrow • GCash Linked</T><H style={{ color: '#fff' }}>{guest ? '—' : peso(wallet)}</H></View>
            <Pressable onPress={cashIn} style={{ backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', gap: 4 }}><T style={{ color: C.primary, fontFamily: F.b }}>Cash In</T><Icon n="plus" s={16} c={C.primary} /></Pressable>
          </View>
        </View>

        <Card style={{ flexDirection: 'row', gap: 10, backgroundColor: '#f0fff4' }}>
          <Icon n="shield-check" c={C.pc} /><T style={{ flex: 1, fontSize: 12 }}>Davao & Region XI: AI-Free Green Zone active. Heat stress advisory: 33°C in lowland coops.</T>
        </Card>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {actions.map(([ic, l, fn]) => (
            <Pressable key={l} onPress={fn} style={{ width: '48%', backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: C.high, padding: 12, gap: 6 }}>
              <Icon n={ic} c={C.pc} /><T style={{ fontFamily: F.b, fontSize: 13 }}>{l}</T>
            </Pressable>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <H>Market Categories</H>
          <Pressable onPress={() => { setCat('All'); setQ(''); }}><T style={{ color: C.primary, fontFamily: F.b }}>View All</T></Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {CATS.map((c) => (
            <Pressable key={c} onPress={() => setCat(c)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 99, backgroundColor: cat === c ? C.pc : '#fff', borderWidth: 1, borderColor: cat === c ? C.pc : C.line }}>
              <Icon n={CAT_ICON[c]} s={18} c={cat === c ? '#fff' : C.pc} /><T style={{ fontFamily: F.b, color: cat === c ? '#fff' : C.text }}>{c}</T>
            </Pressable>
          ))}
        </ScrollView>

        <H>Live Market Spotlight</H>
        {list.length === 0 && <T style={{ color: C.sub }}>No listings match your search.</T>}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {list.map((p) => (
            <Card key={p.id} style={{ width: '48%', gap: 6, padding: 10 }}>
              <View style={{ height: 80, borderRadius: 10, backgroundColor: C.high, alignItems: 'center', justifyContent: 'center' }}><Icon n={CAT_ICON[p.cat]} s={36} c={C.pc} /></View>
              <T style={{ fontSize: 11, color: C.sec, fontFamily: F.b }}>{p.cat} • {p.tag}</T>
              <T style={{ fontFamily: F.b }} numberOfLines={2}>{p.name}</T>
              <H style={{ color: C.primary, fontSize: 17 }}>{peso(p.price)}<T style={{ fontSize: 11, color: C.sub }}> / {p.unit}</T></H>
              <T style={{ fontSize: 11, color: C.sub }} numberOfLines={1}>✔ {p.farm}</T>
              <Pressable onPress={() => (guest ? needLogin() : router.push({ pathname: '/inquiry', params: { pid: p.id } }))} style={{ backgroundColor: C.pc, borderRadius: 10, padding: 9, alignItems: 'center' }}><T style={{ color: '#fff', fontFamily: F.b }}>Inquire</T></Pressable>
            </Card>
          ))}
        </View>
        <T style={{ textAlign: 'center', fontSize: 11, color: C.sub }}>Backed by DA-BAI Livestock Biosecurity Standards</T>
      </ScrollView>

      <Pressable onPress={() => Linking.openURL('tel:+639171234567')} style={{ position: 'absolute', right: 16, bottom: 16, width: 52, height: 52, borderRadius: 26, backgroundColor: C.secc, alignItems: 'center', justifyContent: 'center', elevation: 4 }}><Icon n="phone-in-talk" c="#fff" /></Pressable>

      <Modal visible={menu} transparent animationType="fade" onRequestClose={() => setMenu(false)}>
        <Pressable onPress={() => setMenu(false)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ width: 240, flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60, gap: 18 }}>
            <H style={{ color: C.primary }}>AgriManok Mindanao</H>
            {nav.map(([l, r]) => <Pressable key={l} onPress={() => { setMenu(false); router.navigate(r); }}><T style={{ fontFamily: F.b, fontSize: 16 }}>{l}</T></Pressable>)}
            <Pressable onPress={() => { setMenu(false); router.replace('/'); }}><T style={{ fontFamily: F.b, fontSize: 16, color: C.err }}>{guest ? 'Exit' : 'Sign Out'}</T></Pressable>
          </View>
        </Pressable>
      </Modal>
    </Screen>
  );
}
