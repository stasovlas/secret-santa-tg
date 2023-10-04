import { types } from 'mobx-state-tree';

const app = window.Telegram?.WebApp;
const data = app?.initDataUnsafe;

const TgStore = types
    .model('TgStore', {})
    .volatile(() => ({
        app,
        data: data?.user ? data : { user: { id: '0', first_name: 'Unknown', last_name: 'User' } },
        isTgPlatform: app && app.platform !== 'unknown',
        impactHaptic(style) {
            app?.HapticFeedback?.impactOccurred(style);
        },
        notificationHaptic(type) {
            app?.HapticFeedback?.notificationOccurred(type);
        }
    }));

export default TgStore;