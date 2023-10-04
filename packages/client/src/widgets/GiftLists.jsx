import { useState } from 'react';
import { Header1, Gift } from '../shared/components';
import SwitchGiftList from '../features/SwitchGiftList';
import GiftList from './GiftList';
import store from '../shared/stores/root-store';

const GiftLists = () => {
    const [ giftListId, setGiftListId ] = useState('to-give');

    return (
        <div className={'flex flex-col space-y-2 items-center'}>
            <Gift />
            <Header1>{'Gifts'}</Header1>
            <SwitchGiftList selectedGiftListId={giftListId} onChange={setGiftListId}/>
            <GiftList
                className={giftListId === 'to-give' ? '' : 'hidden'}
                gifts={store.myGiftsToGive}
                placeholder={'Join the parties to be a Santa.'}
            />
            <GiftList
                className={giftListId === 'to-take' ? '' : 'hidden'}
                gifts={store.myGiftsToTake}
                placeholder={'Your Santa is coming.'}
            />
        </div>
    );
};

export default GiftLists;