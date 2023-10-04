import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import store from '../shared/stores/root-store';
import { createWishList, joinParty, startParty, updateParty, updateWishList } from '../shared/api';
import { useTimeout } from '../shared/hooks';
import { Button, InputText, Party, Santa, Modal, Header3 } from '../shared/components';
import CopyPartyLink from '../features/CopyPartyLink';

const JoinedFeedback = () => {
    return (
        <div className={'flex flex-col justify-center items-center text-center space-y-4'}>
            <Party size={70} isAnimate={true}/>
            <Header3>{'You’ve joined the party! Wait for your Santa.'}</Header3>
        </div>
    );
};
const StartedFeedback = () => {
    return (
        <div className={'flex flex-col justify-center items-center text-center space-y-4'}>
            <Santa size={70} isAnimate={true}/>
            <Header3>{'Santas are assigned! Wait for your gift.'}</Header3>
        </div>
    );
};


const SelectedParty = observer(() => {
    const party = store.selectedParty;

    const [ name, setName ] = useState(party?.name);
    const [ budget, setBudget ] = useState(party?.budget);
    const [ wishListText, setWishListText ] = useState(party?.myWishList?.text || '');
    const [ isShowSaved, setIsShowSaved ] = useTimeout();
    const [ isShowSavedWishList, setIsShowSavedWishlist ] = useTimeout();
    const [ isShowSureAssign, setIsShowSureAssign ] = useTimeout({ timeout: 2000 });
    const [ isShowJoined, setIsShowJoined ] = useState(false);
    const [ isShowStarted, setIsShowStarted ] = useState(false);

    function join() {
        joinParty(store.me, store.selectedParty.id, { text: wishListText }).then((res) => {
            store.setMyParties(res.parties);
            store.setMyWishLists(res.wishLists);
            setIsShowJoined(true);
            store.tg.notificationHaptic('success');
        });
    }

    function start() {
        if (!isShowSureAssign) {
            setIsShowSureAssign(true);

            return;
        }

        startParty(store.me.id, party.id).then((res) => {
            store.setMyParties(res.parties);
            store.setMyGifts(res.gifts);
            setIsShowStarted(true);
            store.tg.notificationHaptic('success');
        });
    }

    function saveWishList() {
        if (isShowSavedWishList) {
            return;
        }

        if (!party.myWishList?.id) {
            return createWishList(store.me.id, {
                ownerId: store.me.id,
                partyId: party.id,
                text: wishListText
            }).then((wishLists) => {
                store.setMyWishLists(wishLists);
                setIsShowSavedWishlist(true);
                store.tg.impactHaptic('light');
            });
        }

        updateWishList(store.me.id, party.myWishList.id, { text: wishListText }).then((res) => {
            store.setMyWishLists(res);
            setIsShowSavedWishlist(true);
            store.tg.impactHaptic('light');
        });
    }

    function saveParty() {
        if (isShowSaved) {
            return;
        }

        updateParty(store.me.id, party.id, {
            name,
            budget
        }).then((res) => {
            store.setMyParties(res);
            setIsShowSaved(true);
            store.tg.impactHaptic('light');
        });
    }

    function close() {
        setIsShowJoined(false);
        setIsShowStarted(false);
        store.ui.setIsShowSelectedParty(false);
    }

    if (!party) {
        return null;
    }

    const editablePartyPanel = (
        <div className={'flex flex-col px-4 py-2 space-y-2 rounded-xl shadow-inner w-full theme-secondary-bg-color'}>
            <InputText label={'Name'} value={name} icon={'🎉'} onChange={setName} placeholder={'Cool party'}/>
            <InputText label={'Budget'} value={budget} icon={'💸'} onChange={setBudget} placeholder={'500$'}/>
            <div className={'flex justify-center space-x-2'}>
                <Button isSmall={true} onClick={saveParty}>{isShowSaved ? 'Saved' : 'Save'}</Button>
            </div>
        </div>
    );

    const partyPanel = (
        <>
            <div className={'flex items-start'}>
                <span className={'mr-2 text-xl'}>{'🎉'}</span>
                {party.name || '...'}
            </div>
            <div className={'flex items-start'}>
                <span className={'mr-2 text-xl'}>{'💸'}</span>
                {party.budget || '∞'}
            </div>
        </>
    );

    const editableWishList = (
        <div className={'flex flex-col px-4 py-2 space-y-2 rounded-xl shadow-inner w-full theme-secondary-bg-color'}>
            {isShowJoined && (<JoinedFeedback/>)}
            {!isShowJoined && (
                <>
                    <InputText label={'Your wish list'} value={wishListText} icon={'📝'} onChange={setWishListText} placeholder={'Iphone 15, PS 5'}/>
                    <div className={'flex justify-center space-x-2'}>
                        {!party.isJoined && <Button isSmall={false} onClick={join}>{'🎉 Join the party!'}</Button>}
                        {party.isJoined && <Button isSmall={true} isDisabled={!party.myWishList && !wishListText} onClick={saveWishList}>{isShowSavedWishList ? 'Saved' : 'Save'}</Button>}
                    </div>
                </>
            )}
        </div>
    );

    const wishList = (
        <div className={'flex items-start'}>
            <span className={'mr-2 text-xl'}>{'📝'}</span>
            {party.myWishList?.text || ''}
        </div>
    );

    const ownerParticipants = (
        <div className={'flex flex-col px-4 py-2 space-y-2 rounded-xl shadow-inner w-full theme-secondary-bg-color'}>
            {isShowStarted && <StartedFeedback/>}
            {!isShowStarted && (
                <>
                    <div className={'flex items-center font-bold'}>
                        <span className={'mr-2 text-xl'}>{'👨‍👩‍👧‍👦'}</span>
                        {'Participants'}
                    </div>
                    {party.participants.map((p) => p.name).join(', ')}
                    <div className={'flex justify-center space-x-2'}>
                        <Button isDisabled={party.participants.length < 2} onClick={start}>{isShowSureAssign ? 'Are you sure?' : '🎅 Asssign Santas!'}</Button>
                    </div>
                </>
            )}
        </div>
    );

    const participants = (
        <div className={'flex items-start'}>
            <span className={'mr-2 text-xl'}>{'👨‍👩‍👧‍👦'}</span>
            {party.participants.map((p) => p.name).join(', ')}
        </div>
    );

    const startedCaption = (
        <div className={'flex text-sm theme-hint-color text-center justify-center'}>{'The party has started! You can’t edit it.'}</div>
    );

    const actions = (
        <>
            <CopyPartyLink mode={'outline'} isSmall={true} partyId={party.id}/>
        </>
    );

    const partyComp = party.isOwner && !party.isStarted ? editablePartyPanel : partyPanel;
    const participantsComp = party.isOwner && (!party.isStarted || isShowStarted) ? ownerParticipants : participants;
    const wishListComp = party.isStarted ? wishList : editableWishList;

    return (
        <Modal isShow={store.ui.isShowSelectedParty} onClose={close} header={'Party'} actions={actions}>
            <div className={'flex flex-col space-y-4'}>
                {party.isStarted && party.isOwner && startedCaption}
                {partyComp}
                {party.isOwner ? wishListComp : participantsComp}
                {party.isOwner ? participantsComp : wishListComp}
            </div>
        </Modal>
    );
});

export default SelectedParty;