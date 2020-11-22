import React, {useState, useEffect} from 'react';
import ReactTooltip from "react-tooltip";

const Logout = () => {

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(checked){
            checked && localStorage.clear();
            location.reload();
        }
    },  [checked]);

    const handleChange = e => {
        setChecked(e.target.checked);
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input type="checkbox" checked={checked} onChange={handleChange}/>
                <span data-tip="Déconnexion" className="slider round"></span>
            </label>
            <ReactTooltip place="left" effect="solid"/>
        </div>
    )
}
export default Logout