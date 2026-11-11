import { createContext, useContext, useState } from 'react';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export const HUBS = [
  { k: 'buhangin', label: 'Buhangin Brgy. Hall Outpost', sub: 'CCTV public hub • well lighted' },
  { k: 'tugbok', label: 'Tugbok District Agrivet Parking', sub: 'Seller farm gate • free crating assist' },
  { k: 'sm', label: 'SM City Davao Annex (Ecoland)', sub: 'Open transport bay C' },
];
export const SLOTS = [
  { k: 'Tomorrow 8:00 AM', label: 'Cool Morning Slot', sub: 'Tomorrow, 8:00 – 10:00 AM' },
  { k: 'Saturday 3:00 PM', label: 'Weekend Dispatch', sub: 'Saturday, 3:00 PM' },
];
export const CATS = ['All', 'Native', 'Layers', 'Hatching', 'Chicks'];

const P = (id, name, cat, price, unit, farm, tag, own) => ({ id, name, cat, price, unit, farm, tag, own });
const SEED = [
  P('1', 'Darag Native Free-Range Hens', 'Native', 420, 'head', 'Matina Aviary', '5 Mos'),
  P('2', 'Black Australorp Layers', 'Layers', 580, 'head', 'Buhangin BioFarm', '18 Wks'),
  P('3', 'Fresh Hatching Eggs', 'Hatching', 750, 'tray', 'Davao Incubators', 'Tray of 30'),
  P('4', 'Day-Old Chicks (Cobb 500)', 'Chicks', 42, 'chick', 'Calinan Hatchery', 'Min 50'),
  P('5', 'Rhode Island Red Pullets', 'Layers', 650, 'head', 'Alviola Poultry Farm', '5.5 Mos'),
  P('6', 'Rhode Island Red (Layer Trio)', 'Layers', 1850, 'trio', 'Alviola Poultry Farm', '5 Mos', true),
  P('7', 'Ayam Cemani Hatching Eggs', 'Hatching', 350, 'piece', 'Alviola Poultry Farm', '85% fertile', true),
  P('8', 'Basilan Native Roosters (Pure)', 'Native', 950, 'head', 'Alviola Poultry Farm', '8 Mos', true),
];
const REPLIES = ['Oo bay, available pa gyud. Dasig kaayo ang mga manok!', 'Sige, ready na ang vaccination card para ma-check nimo.', 'Okay ra, kita-kita ta sa meetup hub. Salamat!', 'Pwede ra nimo makita ang video sa flock karon.'];
const now = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
const mid = () => String(Math.random()).slice(2);

export function Store({ children }) {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(14250);
  const [products, setProducts] = useState(SEED);
  const [bookings, setBookings] = useState([{ id: 'AGM-98214', pid: '5', qty: 5, total: 3250, hub: 'Buhangin Brgy. Hall Outpost', slot: 'Tomorrow 8:00 AM', pay: 'Cash on Meetup', status: 'Confirmed', farm: 'Alviola Poultry Farm' }]);
  const [chats, setChats] = useState({
    'AGM-98214': { seller: 'Kuya Carlo', farm: 'Alviola Heritage Farm', unread: 1, msgs: [
      { id: 'a', from: 'sys', text: 'Inquiry & 24h hold placed. Escrow active (₱3,250).', t: '9:15 AM' },
      { id: 'b', from: 'me', text: 'Maayong adlaw Kuya Carlo! Pwede ko mangayo ug 10-second flock video sa 5 heads?', t: '9:15 AM' },
      { id: 'c', from: 'them', text: 'Oo bay, bag-o lang nako gikuha ang video. Dasig kaayo ang mga baye.', t: '9:18 AM' },
      { id: 'd', from: 'them', text: 'Kumpirmado na ang schedule ugma sa Buhangin Brgy. Hall, 8:30 AM. Ready na ang ND/IB vaccination card.', t: '9:20 AM' },
    ] },
  });
  const [alerts, setAlerts] = useState([
    { id: 'a1', icon: 'shield-check', title: 'Davao & Region XI: AI-Free Green Zone active', body: 'Safe inter-provincial trade corridors to Bukidnon & Cotabato are open.', read: false },
    { id: 'a2', icon: 'thermometer', title: 'Heat stress advisory: 33°C in lowland coops', body: 'Peak 11 AM – 3 PM. Add electrolytes to drinking troughs.', read: false },
    { id: 'a3', icon: 'trending-up', title: 'Native manok farmgate up +2.4%', body: '₱240 – ₱265 / kg liveweight (Mindanao avg).', read: true },
  ]);

  const push = (id, m) => setChats((c) => ({ ...c, [id]: { ...c[id], msgs: [...c[id].msgs, { id: mid(), t: now(), ...m }] } }));
  const send = (id, text) => {
    push(id, { from: 'me', text });
    setTimeout(() => push(id, { from: 'them', text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }), 1200);
  };
  const read = (id) => setChats((c) => (c[id]?.unread ? { ...c, [id]: { ...c[id], unread: 0 } } : c));
  const book = (b) => {
    const id = 'AGM-' + Math.floor(10000 + Math.random() * 89999);
    setBookings((x) => [{ id, status: 'Pending', ...b }, ...x]);
    setChats((c) => ({ ...c, [id]: { seller: b.farm, farm: b.farm, unread: 0, msgs: [
      { id: 's', from: 'sys', text: `Inquiry & 24h hold placed (${b.qty} heads, ₱${b.total}). Waiting for breeder confirmation.`, t: now() },
      { id: 'm', from: 'me', text: b.note || 'Hello! Interested in this listing.', t: now() },
    ] } }));
    return id;
  };
  const cancel = (id) => setBookings((x) => x.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b)));
  const saveProduct = (p) => setProducts((x) => (p.id ? x.map((o) => (o.id === p.id ? { ...o, ...p } : o)) : [{ ...p, id: mid(), own: true, farm: 'Alviola Poultry Farm', cat: p.cat || 'Native', tag: 'New' }, ...x]));
  const toggleAlert = (id) => setAlerts((a) => a.map((x) => (x.id === id ? { ...x, read: !x.read } : x)));

  return <Ctx.Provider value={{ user, setUser, wallet, setWallet, products, bookings, chats, alerts, send, read, book, cancel, saveProduct, toggleAlert }}>{children}</Ctx.Provider>;
}
