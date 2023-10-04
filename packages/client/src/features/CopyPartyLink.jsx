import { Button } from '../shared/components';
import store from '../shared/stores/root-store';
import { useState, useEffect } from 'react';

const CopyPartyLink = ({ partyId, mode, onCopied, isSmall }) => {
    const [ isShowCopied, setIsShowCopied ] = useState(false);

    useEffect(() => {
        let timer;

        if (isShowCopied) {
            timer = setTimeout(() => {
                setIsShowCopied(false);
                onCopied?.();
            }, 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [ isShowCopied ]);
    
    function copyLink() {
        navigator.clipboard.writeText(`t.me/santapartybot/app?startapp=j_${partyId}`).then(() => {
            store.tg.impactHaptic('light');
            setIsShowCopied(true);
        });
    }
    
    return (
        <Button mode={mode} isSmall={isSmall} onClick={copyLink} className={'w-32'}>{isShowCopied ? 'Copied' : 'Copy link'}</Button>
    );
};

export default CopyPartyLink;