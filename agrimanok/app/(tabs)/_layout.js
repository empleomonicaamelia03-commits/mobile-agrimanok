import { Tabs } from 'expo-router';
import { C, F, Icon } from '../../src/theme';
import { useApp } from '../../src/store';

export default function TabsLayout() {
  const { chats, alerts } = useApp();
  const unreadChats = Object.values(chats).filter((c) => c.unread).length;
  const unreadAlerts = alerts.filter((a) => !a.read).length;
  const opt = (title, icon, badge) => ({ title, tabBarBadge: badge || undefined, tabBarIcon: ({ color }) => <Icon n={icon} c={color} /> });
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: C.primary, tabBarInactiveTintColor: '#6f7a6e', tabBarLabelStyle: { fontFamily: F.b, fontSize: 11 }, tabBarStyle: { backgroundColor: '#fff', borderTopColor: C.high } }}>
      <Tabs.Screen name="market" options={opt('Market', 'storefront-outline')} />
      <Tabs.Screen name="alerts" options={opt('Alerts', 'shield-check-outline', unreadAlerts)} />
      <Tabs.Screen name="inquiries" options={opt('Inquiries', 'chat-outline', unreadChats)} />
      <Tabs.Screen name="bookings" options={opt('Bookings', 'calendar-month-outline')} />
      <Tabs.Screen name="profile" options={opt('Profile', 'account-check-outline')} />
    </Tabs>
  );
}
