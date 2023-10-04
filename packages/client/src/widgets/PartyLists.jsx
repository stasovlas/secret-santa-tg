import { useState } from 'react';

import SwitchPartyList from '../features/SwitchPartyList';
import { Header1, Party } from '../shared/components';
import PartyList from './PartyList';
import store from '../shared/stores/root-store';

const PartyLists = () => {
    const [ partyListId, setPartyListId ] = useState('my');

    return (
        <div className={'flex flex-col space-y-2 items-center'}>
            <Party/>
            <Header1>{'Parties'}</Header1>
            <SwitchPartyList selectedPartyListId={partyListId} onChange={setPartyListId} />
            <PartyList parties={store.myParties} placeholder={'Create or join the parties.'}/>
        </div>
    );
};

export default PartyLists;