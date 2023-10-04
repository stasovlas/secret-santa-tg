import { observer } from 'mobx-react-lite';

import CreateParty from '../features/CreateParty';
import { Santa, Header1 } from '../shared/components';
import store from '../shared/stores/root-store';

const UserInfo = observer(() => {
    return (
        <div className={'flex flex-col space-y-4 items-center'}>
            <Santa isAnimate={true} />
            {store.me && (
                <>
                    <Header1>{store.me.name}</Header1>
                    <CreateParty />
                </>
            )}
        </div>
    );
});

export default UserInfo;