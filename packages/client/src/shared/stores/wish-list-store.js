import { types } from 'mobx-state-tree';

const WishListStore = types
    .model('WishListStore', {
        id: types.string,
        ownerId: types.string,
        partyId: types.string,
        text: types.maybe(types.string)
    });

export default WishListStore;