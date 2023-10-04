import { observer } from 'mobx-react-lite';
import { useState, useRef } from 'react';
import { getSnapshot } from 'mobx-state-tree';

import { Modal, InputText, Button, Party, Header2 } from '../shared/components';
import store from '../shared/stores/root-store';
import { createParty } from '../shared/api';
import CopyPartyLink from '../features/CopyPartyLink';

const Feedback = () => {
    return (
        <div className={'flex flex-col justify-center items-center text-center space-y-4'}>
            <Party size={100} isAnimate={true}/>
            <Header2>{'You’ve created a new party! Copy link and share to your friends.'}</Header2>
        </div>
    );
};

const NewParty = observer(() => {
    const [ name, setName ] = useState();
    const [ budget, setBudget ] = useState();
    const [ isCreated, setIsCreated ] = useState(false);
    const createdPartyIdRef = useRef();

    function create() {
        createParty(getSnapshot(store.me), { name, budget }).then((res) => {
            store.setMyParties(res.parties);
            setName(undefined);
            setBudget(undefined);
            createdPartyIdRef.current = res.partyId;
            setIsCreated(true);
            store.tg.notificationHaptic('success');
        });
    }

    function close() {
        store.ui.setIsShowNewParty(false);
        setIsCreated(false);
    }

    return (
        <Modal isShow={store.ui.isShowNewParty} header={'New party'}>
            <div className={'flex flex-col space-y-4'}>
                {isCreated && <Feedback/>}
                {!isCreated && (
                    <>
                        <InputText label={'Name'} value={name} onChange={setName} placeholder={'Cool party'}/>
                        <InputText label={'Budget'} value={budget} onChange={setBudget} placeholder={'500$'}/>
                    </>
                )}
                <div className={'flex justify-end space-x-2'}>
                    {!isCreated && <Button isDisabled={!name} onClick={create}>{'Create'}</Button>}
                    {isCreated && <CopyPartyLink partyId={createdPartyIdRef.current} onCopied={close}/>}
                    <Button mode={'outline'} onClick={close}>
                        {isCreated ? 'Close' : 'Cancel'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
});

export default NewParty;