import React, {Fragment} from 'react'
import './loader.css'

const Loader = ({loadingMsg, styling}) => {
    return(
        <Fragment>
            <div className="loader"></div>
            <p style={styling}>
                {loadingMsg}
            </p>
        </Fragment>
    )
}
export default Loader