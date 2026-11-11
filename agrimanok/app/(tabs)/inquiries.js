import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { C, F, T, H, Icon, Screen, Card } from '../../src/theme';
import { useApp } from '../../src/store';

export default function Inquiries() {
  const { chats } = useApp();
  const ids = Object.keys(chats);
  return (
    <Screen>
      <View style={{ padding: 16, backgroundColor: '#fff' }}><H>Inquiries</H></View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        {ids.length === 0 && <T style={{ color: C.sub, textAlign: 'center' }}>No inquiries yet. Tap "Inquire" on a listing.</T>}
        {ids.map((id) => {
          const c = chats[id];
          const last = c.msgs[c.msgs.length - 1];
          return (
            <Pressable key={id} onPress={() => router.push(`/chat/${id}`)}>
              <Card style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: C.pc, alignItems: 'center', justifyContent: 'center' }}><Icon n="account" c="#fff" /></View>
                <View style={{ flex: 1 }}>
                  <T style={{ fontFamily: F.b }}>{c.seller} <T style={{ fontSize: 11, color: C.sub }}>#{id}</T></T>
                  <T style={{ fontSize: 12, color: C.sub }} numberOfLines={1}>{last.text}</T>
                </View>
                {c.unread ? <View style={{ minWidth: 20, height: 20, borderRadius: 10, backgroundColor: C.err, alignItems: 'center', justifyContent: 'center' }}><T style={{ color: '#fff', fontSize: 11 }}>{c.unread}</T></View> : null}
              </Card>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
