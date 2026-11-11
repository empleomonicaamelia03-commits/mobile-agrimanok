import { View, ScrollView, Pressable } from 'react-native';
import { C, F, T, H, Icon, Screen, Card } from '../../src/theme';
import { useApp } from '../../src/store';

export default function Alerts() {
  const { alerts, toggleAlert } = useApp();
  return (
    <Screen>
      <View style={{ padding: 16, backgroundColor: '#fff' }}><H>Biosecurity & Weather Alerts</H></View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        {alerts.map((a) => (
          <Pressable key={a.id} onPress={() => toggleAlert(a.id)}>
            <Card style={{ flexDirection: 'row', gap: 10, opacity: a.read ? 0.65 : 1, borderColor: a.read ? C.high : C.pc }}>
              <Icon n={a.icon} c={C.pc} />
              <View style={{ flex: 1, gap: 2 }}><T style={{ fontFamily: F.b }}>{a.title}</T><T style={{ fontSize: 12, color: C.sub }}>{a.body}</T><T style={{ fontSize: 11, color: C.primary }}>{a.read ? 'Tap to mark unread' : 'Tap to mark as read'}</T></View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
