import { useEffect, useRef, useState } from 'react';
import { View, FlatList, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Platform, Linking, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { C, F, T, H, Icon, Screen, peso } from '../../src/theme';
import { useApp } from '../../src/store';

const CHIPS = ['Confirm 8:30 AM slot', 'Request vaccination card', 'Ask about feed diet', 'Escrow proof sent'];

export default function Chat() {
  const { id } = useLocalSearchParams();
  const { chats, bookings, send, read } = useApp();
  const c = chats[id];
  const b = bookings.find((x) => x.id === id);
  const [txt, setTxt] = useState('');
  const ref = useRef(null);
  useEffect(() => { read(id); }, [id]);
  useEffect(() => { const t = setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 100); return () => clearTimeout(t); }, [c?.msgs.length]);
  if (!c) return <Screen><Pressable onPress={() => router.back()} style={{ padding: 16 }}><T>← Chat not found</T></Pressable></Screen>;
  const go = (t) => { const v = (t ?? txt).trim(); if (!v) return; send(id, v); setTxt(''); };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10, backgroundColor: '#fff' }}>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/inquiries'))} hitSlop={12}><Icon n="arrow-left" /></Pressable>
        <View style={{ flex: 1 }}><H style={{ fontSize: 16 }}>{c.seller} ✔</H><T style={{ fontSize: 11, color: C.sub }}>{c.farm} • ~15m reply</T></View>
        <Pressable onPress={() => Linking.openURL('tel:+639171234567')}><Icon n="phone" c={C.primary} /></Pressable>
        <Pressable onPress={() => Alert.alert(c.seller, `Booking #${id}`, [{ text: 'View Bookings', onPress: () => router.navigate('/bookings') }, { text: 'Close' }])}><Icon n="dots-vertical" /></Pressable>
      </View>
      {b && (
        <Pressable onPress={() => router.navigate('/bookings')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, backgroundColor: '#f0fff4', borderBottomWidth: 1, borderColor: C.high }}>
          <Icon n="shield-check" c={C.pc} />
          <View style={{ flex: 1 }}><T style={{ fontFamily: F.b, fontSize: 12 }}>#{id} • {b.qty}× • {peso(b.total)}</T><T style={{ fontSize: 11, color: C.sub }}>{b.slot} • {b.hub}</T></View>
          <T style={{ color: C.primary, fontFamily: F.b, fontSize: 12 }}>View Details</T>
        </Pressable>
      )}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList ref={ref} data={c.msgs} keyExtractor={(m) => m.id} contentContainerStyle={{ padding: 14, gap: 10 }}
          renderItem={({ item: m }) => m.from === 'sys' ? (
            <View style={{ backgroundColor: '#fff3e6', borderRadius: 12, padding: 10, flexDirection: 'row', gap: 8 }}><Icon n="lock-clock" s={18} c={C.sec} /><T style={{ flex: 1, fontSize: 12 }}>{m.text}</T></View>
          ) : (
            <View style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <View style={{ backgroundColor: m.from === 'me' ? C.pc : '#fff', borderRadius: 16, padding: 10, borderWidth: m.from === 'me' ? 0 : 1, borderColor: C.high }}>
                <T style={{ color: m.from === 'me' ? '#fff' : C.text }}>{m.text}</T>
              </View>
              <T style={{ fontSize: 10, color: C.sub, alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', marginTop: 2 }}>{m.t}</T>
            </View>
          )} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 12, paddingVertical: 6 }} keyboardShouldPersistTaps="handled">
          {CHIPS.map((t) => <Pressable key={t} onPress={() => go(t)} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 99, borderWidth: 1, borderColor: C.pc, backgroundColor: '#fff' }}><T style={{ color: C.primary, fontFamily: F.b, fontSize: 12 }}>{t}</T></Pressable>)}
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: '#fff' }}>
          <TextInput value={txt} onChangeText={setTxt} onSubmitEditing={() => go()} placeholder="Type Bisaya, Tagalog, or English..." placeholderTextColor="#9aa59a" returnKeyType="send" style={{ flex: 1, backgroundColor: C.low, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 10, fontFamily: F.r }} />
          <Pressable onPress={() => go()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: C.pc, alignItems: 'center', justifyContent: 'center' }}><Icon n="send" c="#fff" s={20} /></Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
