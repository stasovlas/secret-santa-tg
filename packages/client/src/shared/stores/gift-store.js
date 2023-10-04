import { types, getRoot } from 'mobx-state-tree';
import UserStore from './user-store';
import PartyStore from './party-store';
import WishListStore from './wish-list-store';

const GiftStore = types
    .model('GiftStore', {
        id: types.string,
        from: UserStore,
        to: UserStore,
        party: types.maybe(types.reference(PartyStore)),
        wishList: types.maybe(WishListStore)
    })
    .views((self) => ({
        get myWishList() {
            const root = getRoot(self);
            return root.myWishLists.find((w) => w.partyId === self.party.id);
        }
    }));

export default GiftStore;