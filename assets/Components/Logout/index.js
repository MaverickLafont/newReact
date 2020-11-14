import React, {useState, useEffect} from 'react';

const Logout = () => {

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        checked && localStorage.clear();
    },  [checked]);

    const handleChange = e => {
        setChecked(e.target.checked);
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input type="checkbox" checked={checked} onChange={handleChange}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}
export default Logout