import { useEffect } from 'react';
import { fetchAdminData } from '../shared/api';
import { PartyList } from '../widgets';
import { Card } from '../shared/components';
import store from '../shared/stores/root-store';
import { observer } from 'mobx-react-lite';

const SelectedParty = observer(() => {
    if (!store.selectedParty) {
        return null;
    }

    const party = store.selectedParty;

    const startedCaption = (
        <div className={'flex text-sm theme-hint-color text-center justify-center'}>{'The party has started! You can’t edit it.'}</div>
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

    const participants = (
        <div className={'flex items-start'}>
            <span className={'mr-2 text-xl'}>{'👨‍👩‍👧‍👦'}</span>
            {party.participants.map((p) => p.name).join(', ')}
        </div>
    );

    return (
        <div className={'flex flex-col space-y-4'}>
            {party.isStarted && startedCaption}
            {partyPanel}
            {participants}
            {/*{party.isOwner ? participantsComp : wishListComp}*/}
        </div>
    );
});

const Admin = observer(({ token }) => {
    useEffect(() => {
        fetchAdminData(token).then((res) => {
            if (res) {
                console.log(res.parties);
                store.setMyParties(res.parties);
            }
        });
    }, []);


    return (
        <div className={'flex space-x-4 p-4 w-full h-full'}>
            <Card className={'w-1/3 overflow-auto'}>
                <PartyList parties={store.myParties} placeholder={'Create or join the parties.'}/>
            </Card>
            <Card className={'flex flex-col grow'}>
                <SelectedParty />
            </Card>
        </div>
    );
});

export default Admin;