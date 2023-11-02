import store from '../shared/stores/root-store';
import { observer } from 'mobx-react-lite';

const PartyTitle = observer(({ party: { name, ownerId }, onClick }) => {
    const isOwner = ownerId === store.me?.id;

    return (
        <div className={'flex items-center justify-between text-md font-bold cursor-pointer select-none'} onClick={onClick}>
            <div className={'flex items-center truncate'}>
                <span className={'mr-2 text-2xl'}>{isOwner ? '👑' : '🎉'}</span>
                {name}
            </div>
        </div>
    );
});

const Party = ({ party }) => {
    function onClick() {
        store.setSelectedParty(party);
        store.ui.setIsShowSelectedParty(true);
    }

    return (
        <div className={'flex flex-col px-4 py-2 rounded-xl shadow-inner w-full theme-bg-color'}>
            <PartyTitle party={party} onClick={onClick}/>
        </div>
    );
};

export default Party;