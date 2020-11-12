import React, {useRef, useEffect, useState, Fragment} from 'react'
import {Link} from "react-router-dom"

const Landing = () => {

    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null)

    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1000);
    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    }

    const removeLeftImg = () => {
        refWolverine.current.classList.remove("leftImg");
    }

    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }

    const removeRightImg = () => {
        refWolverine.current.classList.remove("rightImg");
    }

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox" onMouseLeave={removeLeftImg} onMouseOver={setLeftImg}>
                <Link className="btn-welcome" to="/signup">Inscription</Link>
            </div>
            <div className="rightBox" onMouseLeave={removeRightImg} onMouseOver={setRightImg}>
                <Link className="btn-welcome" to="/login">Connexion</Link>
            </div>
        </Fragment>
    )
    return(
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    )
}

export default Landing