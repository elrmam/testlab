import { useState } from 'react';

function Checkbox ({lableOn, lableOff}) {
    const  [checked, setChecked] = useState(false);
    
    return (
        <div className="flex items-center">
            <input id="checkbox" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            <label htmlFor="checkbox" className="ml-2 text-gray-800" >{checked ? lableOn : lableOff}</label>

        </div>
        
        )}



export default Checkbox;