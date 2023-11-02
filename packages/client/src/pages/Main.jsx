import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Card } from '../shared/components';
import { UserInfo, GiftLists, PartyLists, NewParty, SelectedParty } from '../widgets';
import { fetchInitData } from '../shared/api';
import store from '../shared/stores/root-store';
import Tg from '../shared/components/Tg';

const Main = observer(() => {
    const [ isInited, setIsInited ] = useState(false);

    useEffect(() => {
        store.tg.app?.ready();

        const user = store.tg.data?.user;
        const id = user.id.toString();
        const name = `${user.first_name} ${user.last_name}`;

        const params = new URLSearchParams(window.location.search);
        const startParam = store.tg.data?.start_param;
        const selectedPartyId = params.get('j') || (startParam && startParam.includes('j_') ? startParam.split('_')[1] : undefined);

        fetchInitData(id, selectedPartyId).then((res) => {
            setTimeout(() => {
                store.setMe({ id, name });
                store.setMyParties(res.parties);
                store.setMyGifts(res.gifts);
                store.setMyWishLists(res.wishLists);

                const selectedParty = selectedPartyId ? store.myParties.find((s) => s.id === selectedPartyId) : undefined;

                if (selectedParty) {
                    store.setSelectedParty(selectedPartyId);

                    if (!store.selectedParty.isJoined) {
                        store.ui.setIsShowSelectedParty(true);
                    }
                }

                setIsInited(true);
            }, 1000);
        });
    }, []);

    if (!store.tg.isTgPlatform && process.env.REACT_APP_ENV !== 'dev') {
        return (
            <div className={'flex flex-col justify-center text-center h-full'}>
                <div className={'flex flex-col space-y-2 items-center'}>
                    <Tg isAnimate={true} isLoop={true}/>
                    <span>{'This is Telegram application.'}</span>
                    <a className={'underline font-medium'} href={'https://t.me/santapartybot/app'}>{'Open in Telegram'}</a>
                </div>
            </div>
        );
    }
    
    const translate = isInited ? 'translate-y-0' : 'translate-y-32';
    
    return (
        <div className={'relative h-full mx-auto max-w-md'}>
            { isInited && (
                <>
                    <NewParty />
                    {store.selectedParty && store.ui.isShowSelectedParty && <SelectedParty />}
                </>
            )}
            <div className={`transition ease-in-out duration-300 flex flex-col space-y-4 p-4 justify-center ${translate}`}>
                <UserInfo isAnimate={!isInited}/>
                { isInited && (
                    <>
                        <Card>
                            <GiftLists />
                        </Card>
                        <Card>
                            <PartyLists />
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
});

export default Main;