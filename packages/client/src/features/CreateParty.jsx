import { Button } from '../shared/components';
import store from '../shared/stores/root-store';

const CreateParty = () => {
    function create() {
        store.ui.setIsShowNewParty(true);
    }

    return (
        <Button onClick={create}>{'Create party'}</Button>
    );
};

export default CreateParty;