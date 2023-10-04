import { observer } from 'mobx-react-lite';

import Party from '../entities/Party';
import { Header3 } from '../shared/components';

const PartyList = observer(({ className, parties, placeholder }) => {
    if (!parties || parties.length === 0) {
        return (
            <div className={`flex flex-col space-y-2 items-center w-full p-4 ${className || ''}`}>
                <Header3>{placeholder}</Header3>
            </div>
        );
    }

    return (
        <div className={`flex flex-col space-y-2 items-center w-full ${className || ''}`}>
            {parties.map((p) => (
                <Party party={p} key={p.id}/>
            ))}
        </div>
    );
});

export default PartyList;