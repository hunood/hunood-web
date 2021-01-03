import { languagesTypes } from './types/languages';
import i18next from 'i18next';

import {
    // imports pt-br
    areaAbertaBR
} from './translation';

const options = {
    interpolation: {
        escapeValue: false
    },
    lng: languagesTypes.portuguese_br,
    resources: {
        pt_br: {
            // exports pt-br
            areaAberta: areaAbertaBR
        }
    }
};

i18next.init(options);

function t(key: string, options?: any) {
    if (!!options) {
        return i18next.t(key, options);
    }
    return i18next.t(key);
}

export { t };
export default i18next;
