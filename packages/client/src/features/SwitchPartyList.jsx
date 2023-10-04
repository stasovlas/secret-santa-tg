import { Tabs } from '../shared/components';

const items = [
    {
        id: 'my',
        label: 'My parties'
    },
    {
        id: 'public',
        label: 'Public parties',
        isDisabled: true,
        badge: {
            caption: 'Soon'
        }
    }
];

const SwitchPartyList = ({ selectedPartyListId, onChange }) => {
    return (
        <Tabs items={items} selectedItemId={selectedPartyListId} onChange={onChange} />
    );
};

export default SwitchPartyList;