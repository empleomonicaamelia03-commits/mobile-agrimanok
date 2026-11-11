# AgriManok Mindanao (Expo SDK 58 / React Native 0.88, Expo Router)

    npm install
    npx expo install --fix     # pins every package to its SDK 58 version
    npx expo start             # SDK 58 Expo Go is still rolling out: use a dev build if needed (npx expo run:android / run:ios)

Routes: `/` splash · `/login` · `/reset` (3-step OTP flow) · tabs `/market /alerts /inquiries /bookings /profile`
· `/inquiry?pid=` booking form · `/chat/[id]` · `/post?id=` create/edit listing.
Demo: any 10-digit mobile + 4+ digit PIN logs in. Any 6-digit OTP passes reset.
