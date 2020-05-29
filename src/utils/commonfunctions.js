import {
    STATE_CODES,
} from '../constants';

export const getStateName = (code) => {
    return STATE_CODES[code.toUpperCase()];
};

export const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

