export const STATE_CODES = {
    AA: 'Addis Abeba',
    AF: 'Afar',
    AM: 'Amhara',
    BG: 'Beneshangul Gumuz',
    GA: 'Gambela',
    OR: 'Oromia',
    SO: 'Somali',
    DD: 'Dire Dawa',
    HR: 'Hareri',
    SN: 'SNNP',
    TG: 'Tigray',
};

const stateCodes = [];
const reverseStateCodes = {};
Object.keys(STATE_CODES).map((key, index) => {
    reverseStateCodes[STATE_CODES[key]] = key;
    stateCodes.push({code: key, name: STATE_CODES[key]});
    return null;
});
