import * as React from 'react';
import Loader from 'services/_config-services/loader';

const { useState, useEffect } = React;

export default function useLoader() {
    const loader = Loader.getInstance();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const subscription = loader.isLoading.subscribe(setIsLoading);
        return () => {
            subscription.unsubscribe();
        };
    }, [loader.isLoading]);

    return { ...loader, isLoading };
}
