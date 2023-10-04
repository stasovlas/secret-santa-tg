import { types } from 'mobx-state-tree';
import UserStore from './user-store';
import PartyStore from './party-store';
import GiftStore from './gift-store';
import WishListStore from './wish-list-store';
import UiStore from './ui-store';
import TgStore from './tg-store';

const RootStore = types
    .model('RootStore', {
        me: types.maybe(UserStore),
        myParties: types.array(PartyStore),
        myGifts: types.array(GiftStore),
        myWishLists: types.array(WishListStore),
        selectedParty: types.maybe(types.reference(PartyStore)),
        ui: types.optional(UiStore, {}),
        tg: types.optional(TgStore, {})
    })
    .views((self) => ({
        get myGiftsToGive() {
            return self.myGifts.filter((g) => g.from.id === self.me.id);
        },
        get myGiftsToTake() {
            return self.myGifts.filter((g) => g.to.id === self.me.id);
        }
    }))
    .actions((self) => ({
        setMyParties(parties) {
            self.myParties.replace(parties);
        },
        setMyGifts(gifts) {
            self.myGifts.replace(gifts);
        },
        setMyWishLists(wishLists) {
            self.myWishLists.replace(wishLists);
        },
        setSelectedParty(party) {
            self.selectedParty = party;
        },
        setMe(user) {
            self.me = user;
        }
    }));



const root = RootStore.create({});

window.store = root;

export default root;