import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Pressable, View, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export const C = { primary: '#00652c', pc: '#15803d', surface: '#f9f9ff', low: '#f0f3ff', high: '#dee8ff', text: '#111c2d', sub: '#3f493f', line: '#becabc', sec: '#904d00', secc: '#fe932c', secf: '#ffdcc3', pf: '#95f8a7', err: '#ba1a1a' };
export const F = { r: 'Inter_400Regular', b: 'Inter_600SemiBold', h: 'PlusJakartaSans_700Bold', x: 'PlusJakartaSans_800ExtraBold' };
export const peso = (n) => '₱' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const Icon = ({ n, s = 22, c = C.text }) => <MaterialCommunityIcons name={n} size={s} color={c} />;
export const T = ({ style, ...p }) => <Text {...p} style={[{ fontFamily: F.r, color: C.text, fontSize: 14 }, style]} />;
export const H = ({ style, ...p }) => <T {...p} style={[{ fontFamily: F.h, fontSize: 18 }, style]} />;
export const Screen = ({ children, style }) => <SafeAreaView style={[{ flex: 1, backgroundColor: C.surface }, style]}>{children}</SafeAreaView>;
export const Card = ({ style, ...p }) => <View {...p} style={[{ backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.high }, style]} />;

export const Btn = ({ label, icon, onPress, loading, kind, style }) => {
  const fg = kind === 'light' ? C.primary : kind === 'out' ? C.text : '#fff';
  return (
    <Pressable onPress={onPress} disabled={loading} style={({ pressed }) => [{ height: 48, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 14, backgroundColor: kind === 'light' ? '#fff' : kind === 'ghost' || kind === 'out' ? 'transparent' : C.pc, borderWidth: kind === 'out' ? 1 : 0, borderColor: C.line, opacity: pressed || loading ? 0.7 : 1 }, style]}>
      {loading ? <ActivityIndicator color={fg} /> : <><T style={{ fontFamily: F.h, fontSize: 15, color: fg }}>{label}</T>{icon && <Icon n={icon} s={20} c={fg} />}</>}
    </Pressable>
  );
};

export const Bar = ({ title, sub, right }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: C.high }}>
    <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/market'))} hitSlop={12}><Icon n="arrow-left" /></Pressable>
    <View style={{ flex: 1 }}><H>{title}</H>{sub ? <T style={{ fontSize: 11, color: C.sub }}>{sub}</T> : null}</View>
    {right}
  </View>
);

export const Field = ({ label, prefix, right, style, ...p }) => (
  <View style={{ gap: 6 }}>
    {label ? <T style={{ fontFamily: F.b, fontSize: 12 }}>{label}</T> : null}
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: C.line, borderRadius: 10, backgroundColor: '#fff', paddingHorizontal: 12 }}>
      {prefix}
      <TextInput placeholderTextColor="#9aa59a" {...p} style={[{ flex: 1, paddingVertical: 12, fontFamily: F.r, fontSize: 15, color: C.text }, style]} />
      {right}
    </View>
  </View>
);

export const Radio = ({ opts, val, set }) => (
  <View style={{ gap: 8 }}>
    {opts.map((o) => {
      const on = val === o.k;
      return (
        <Pressable key={o.k} onPress={() => set(o.k)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, borderWidth: on ? 2 : 1, borderColor: on ? C.pc : C.line, backgroundColor: on ? '#f0fff4' : '#fff' }}>
          <Icon n={on ? 'radiobox-marked' : 'radiobox-blank'} c={on ? C.pc : C.line} />
          <View style={{ flex: 1 }}><T style={{ fontFamily: F.b }}>{o.label}</T>{o.sub ? <T style={{ fontSize: 12, color: C.sub }}>{o.sub}</T> : null}</View>
        </Pressable>
      );
    })}
  </View>
);
