import { useEffect, useState } from 'react';

export function useTimeout(props) {
    const { cb, timeout } = (props || {});
    const [ state, setState ] = useState(false);

    useEffect(() => {
        let timer;

        if (state) {
            timer = setTimeout(() => {
                setState(false);
                cb?.();
            }, timeout || 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [ state ]);

    return [ state, setState ];
}
