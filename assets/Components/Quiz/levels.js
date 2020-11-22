import React, {useEffect, useState} from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = (props) => {

    const [levels, setLevels] = useState([]);

    /**
     * Pour chaque levelsName recu on foreach et on le met
     * dans le state levels avec la convention "title : xxxx"
     * pour utiliser au niveau du stepper
     */
    useEffect(() => {
        setLevels(props.levelsName.map(level => ({title: level.toUpperCase()})))
    }, [props.levelsName]);

    return (
        <div className="levelsContainer">
                <Stepper steps={ levels }
                         activeStep={ props.quizLevel }
                         circleTop={0}
                         activeTitleColor={'#d31017'}
                         activeColor={'#d31017'}
                         completeTitleColor={'#E0E0E0'}
                         defaultTitleColor={'#E0E0E0'}
                         completeColor={'#E0E0E0'}
                         completeBarColor={'#E0E0E0'}
                         size={42}
                         circleFontSize={20}
                />
        </div>
    )
}

export default React.memo(Levels)