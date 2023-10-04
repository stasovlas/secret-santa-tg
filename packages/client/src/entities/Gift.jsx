import { useState } from 'react';
import store from '../shared/stores/root-store';
import { observer } from 'mobx-react-lite';

const GiftTitle = observer(({ from, to, onClick, isExpanded }) => {
    return (
        <div className={'flex items-center justify-between text-md font-bold cursor-pointer select-none'} onClick={onClick}>
            <div className={'flex items-center truncate'}>
                <span className={'mr-2 text-2xl'}>{'🎁'}</span>
                {to.id === store.me.id ? 'Santa' : (from.id === store.me.id ? 'Me' : from.name)}
                <span className={'ml-2 mr-2'}>{'→'}</span>
                {to.name}
            </div>
            <span className={'ml-2'}>{isExpanded ? '▲' : '▼'}</span>
        </div>
    );
});

const GiftPartySummary = observer(({ party, wishList, isExpanded }) => {
    const { name, budget } = party || {};
    return (
        <div className={`flex flex-col space-y-1 mt-2 ${!isExpanded ? 'hidden' : ''}`}>
            {name && (
                <div className={'flex items-center'}>
                    <span className={'mr-2 text-2xl'}>{'🎉'}</span>
                    {name}
                </div>
            )}
            <div className={'flex items-center'}>
                <span className={'mr-2 text-2xl'}>{'📝'}</span>
                {wishList?.text || '...'}
            </div>
            {budget && (
                <div className={'flex items-center'}>
                    <span className={'mr-2 text-2xl'}>{'💸'}</span>
                    {budget || <span className={'text-2xl'}>{'∞'}</span>}
                </div>
            )}
        </div>
    );
});

const Gift = ({ gift: { from, to, party, wishList } }) => {
    const [ isExpanded, setIsExpanded ] = useState(false);

    return (
        <div className={'flex flex-col py-2 px-4 rounded-xl shadow-inner w-full theme-bg-color'}>
            <GiftTitle to={to} from={from} isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}/>
            <GiftPartySummary party={party} wishList={wishList} isExpanded={isExpanded}/>
        </div>
    );
};

export default Gift;