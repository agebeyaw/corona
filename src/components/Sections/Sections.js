import Remind from './remind';
import Symptoms from './symptoms';

import React, {useState, useEffect} from 'react';

function Sections() {
    return (
        <div className="cards-container">
            <Symptoms/>
            <Remind/>
        </div>
    );
}

export default Sections;
