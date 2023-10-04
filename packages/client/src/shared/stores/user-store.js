import { types } from 'mobx-state-tree';

const UserStore = types
    .model('UserStore', {
        id: types.string,
        name: types.optional(types.string, 'Santa')
    })
    .actions((self) => ({
        setName(name) {
            self.name = name;
        }
    }));

export default UserStore;