import { Tabs } from '../shared/components';

const items = [
    {
        id: 'to-give',
        label: 'Gifts to give'
    },
    {
        id: 'to-take',
        label: 'Gifts to take'
    }
];

const SwitchGiftList = ({ selectedGiftListId, onChange }) => {
    return (
        <Tabs items={items} selectedItemId={selectedGiftListId} onChange={onChange} />
    );
};

export default SwitchGiftList;