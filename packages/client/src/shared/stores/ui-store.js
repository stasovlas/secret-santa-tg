import { types } from 'mobx-state-tree';

const UiStore = types
    .model('UiStore', {
        isShowNewParty: types.optional(types.boolean, false),
        isShowSelectedParty: types.optional(types.boolean, false)
    })
    .actions((self) => ({
        setIsShowNewParty(value) {
            self.isShowNewParty = value;
        },
        setIsShowSelectedParty(value) {
            self.isShowSelectedParty = value;
        }
    }));

export default UiStore;