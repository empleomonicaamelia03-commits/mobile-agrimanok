import { View, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { C, F, T, H, Screen, Card, Btn, peso } from '../../src/theme';
import { useApp } from '../../src/store';

const COL = { Confirmed: C.pc, Pending: C.sec, Cancelled: C.err };

export default function Bookings() {
  const { bookings, products, cancel } = useApp();
  return (
    <Screen>
      <View style={{ padding: 16, backgroundColor: '#fff' }}><H>Bookings</H></View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        {bookings.length === 0 && <T style={{ color: C.sub, textAlign: 'center' }}>No bookings yet.</T>}
        {bookings.map((b) => {
          const p = products.find((x) => x.id === b.pid);
          return (
            <Card key={b.id} style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T style={{ fontFamily: F.b }}>#{b.id}</T><T style={{ fontFamily: F.b, color: COL[b.status] }}>{b.status}</T>
              </View>
              <T>{b.qty}× {p?.name || 'Listing'} • {peso(b.total)}</T>
              <T style={{ fontSize: 12, color: C.sub }}>{b.slot} • {b.hub}</T>
              <T style={{ fontSize: 12, color: C.sub }}>{b.pay} • {b.farm}</T>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                <Btn kind="out" label="Open Chat" style={{ flex: 1, height: 40 }} onPress={() => router.push(`/chat/${b.id}`)} />
                {b.status !== 'Cancelled' && <Btn kind="out" label="Cancel" style={{ flex: 1, height: 40 }} onPress={() => Alert.alert('Cancel booking?', 'Your 24h hold will be released.', [{ text: 'Keep' }, { text: 'Cancel booking', style: 'destructive', onPress: () => cancel(b.id) }])} />}
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
