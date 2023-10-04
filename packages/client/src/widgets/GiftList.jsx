import Gift from '../entities/Gift';
import { Header3 } from '../shared/components';

const GiftList = ({ className, gifts, placeholder }) => {
    if (!gifts || gifts.length === 0) {
        return (
            <div className={`flex flex-col space-y-2 items-center w-full p-4 ${className || ''}`}>
                <Header3>{placeholder}</Header3>
            </div>
        );
    }
    return (
        <div className={`flex flex-col space-y-2 items-center w-full ${className || ''}`}>
            {gifts.map((g) => (
                <Gift gift={g} key={g.id}/>
            ))}
        </div>
    );
};

export default GiftList;