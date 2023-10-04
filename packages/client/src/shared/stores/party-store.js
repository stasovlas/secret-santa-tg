import { getRoot, types } from 'mobx-state-tree';
import UserStore from './user-store';

const PartyStore = types
    .model('PartyStore', {
        id: types.identifier,
        budget: types.optional(types.string, ''),
        name: types.string,
        ownerId: types.string,
        isStarted: types.optional(types.boolean, false),
        participants: types.array(UserStore)
    })
    .views((self) => ({
        get isJoined() {
            const root = getRoot(self);
            return !!self.participants.find((p) => p.id === root.me.id);
        },
        get isOwner() {
            const root = getRoot(self);
            return self.ownerId === root.me.id;
        },
        get myWishList() {
            const root = getRoot(self);
            return root.myWishLists.find((w) => w.partyId === self.id);
        }
    }));

export default PartyStore;