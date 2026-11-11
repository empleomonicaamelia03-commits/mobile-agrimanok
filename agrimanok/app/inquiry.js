import { useState } from 'react';
import { View, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { C, F, T, H, Icon, Screen, Bar, Card, Field, Btn, Radio, peso } from '../src/theme';
import { useApp, HUBS, SLOTS } from '../src/store';

export default function Inquiry() {
  const { pid } = useLocalSearchParams();
  const { products, book } = useApp();
  const p = products.find((x) => x.id === pid) || products[0];
  const [qty, setQty] = useState(5);
  const [hub, setHub] = useState('buhangin');
  const [slot, setSlot] = useState(SLOTS[0].k);
  const [pay, setPay] = useState('Cash on Meetup');
  const [vax, setVax] = useState(true);
  const [video, setVideo] = useState(false);
  const [note, setNote] = useState('Maayong adlaw Kuya! Interested ko kuha ug ' + 5 + ' heads. Available ba karong Sabado?');
  const [busy, setBusy] = useState(false);
  const bulk = qty >= 20;
  const unitPrice = bulk ? Math.round(p.price * 0.892) : p.price;
  const total = qty * unitPrice;
  const step = (d) => setQty((q) => Math.min(50, Math.max(1, q + d)));
  const submit = () => {
    setBusy(true);
    setTimeout(() => {
      const id = book({ pid: p.id, qty, total, hub: HUBS.find((h) => h.k === hub).label, slot, pay, farm: p.farm, note: note + (vax ? '\n(Please bring vaccination card)' : '') + (video ? '\n(Requesting flock video)' : '') });
      router.replace(`/chat/${id}`);
    }, 1200);
  };
  const Sw = ({ on, set, label }) => (
    <Pressable onPress={() => set(!on)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Icon n={on ? 'checkbox-marked' : 'checkbox-blank-outline'} c={on ? C.pc : C.line} /><T style={{ flex: 1 }}>{label}</T>
    </Pressable>
  );
  return (
    <Screen>
      <Bar title="Poultry Inquiry & Meetup" sub={`${p.farm} • ✔ BAI Registered`} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }} keyboardShouldPersistTaps="handled">
          <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}><T style={{ fontFamily: F.b }}>{p.name}</T><T style={{ fontSize: 12, color: C.sub }}>{p.tag}</T></View>
            <H style={{ color: C.primary }}>{peso(p.price)}<T style={{ fontSize: 11 }}> / {p.unit}</T></H>
          </Card>

          <H>Quantity</H>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <Pressable onPress={() => step(-1)} disabled={qty <= 1} style={{ opacity: qty <= 1 ? 0.3 : 1 }}><Icon n="minus-circle-outline" s={40} c={C.pc} /></Pressable>
            <H style={{ fontSize: 32, minWidth: 60, textAlign: 'center' }}>{qty}</H>
            <Pressable onPress={() => step(1)} disabled={qty >= 50} style={{ opacity: qty >= 50 ? 0.3 : 1 }}><Icon n="plus-circle" s={40} c={C.pc} /></Pressable>
          </View>
          <T style={{ textAlign: 'center', fontSize: 12, color: C.sec }}>{bulk ? '🎉 Bulk rate applied!' : `Add ${20 - qty} more to unlock the ${peso(Math.round(p.price * 0.892))} wholesale rate.`}</T>

          <H>Safe Meetup Hub</H>
          <Radio opts={HUBS} val={hub} set={setHub} />
          <H>Inspection Schedule</H>
          <Radio opts={SLOTS} val={slot} set={setSlot} />
          <H>Biosecurity & Media</H>
          <Sw on={vax} set={setVax} label="Provide Complete Vaccination Card (ND & IB)" />
          <Sw on={video} set={setVideo} label="Request Video of Live Flock" />
          <H>Message to Breeder</H>
          <Field multiline maxLength={300} value={note} onChangeText={setNote} style={{ minHeight: 80, textAlignVertical: 'top' }} />
          <H>Settlement Method</H>
          <Radio val={pay} set={setPay} opts={[{ k: 'Cash on Meetup', label: 'Cash on Meetup', sub: 'Pay only after checking bird vigor and weight' }, { k: 'GCash Escrow', label: 'GCash AgriManok Escrow', sub: 'Funds locked until you confirm release' }]} />
        </ScrollView>
        <View style={{ padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: C.high, gap: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T style={{ color: C.sub }}>{qty} × {peso(unitPrice)} • Due at inspection</T><H style={{ color: C.primary }}>{peso(total)}</H></View>
          <Btn label="Send Inquiry & Hold Birds" icon="send" onPress={submit} loading={busy} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
