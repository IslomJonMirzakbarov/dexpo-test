import React from 'react'
import FlipCountdown from '@rumess/react-flip-countdown';
import './style.scss'

const Countdown = () => {
    return (
        <FlipCountdown
            hideYear
            hideMonth
            endAtZero
            theme='light'
            size='extra-small' // Options (Default: medium): large, medium, small, extra-small.
            endAt={'2022-07-30 01:26:58'} // Date/Time
        />
    )
}

export default Countdown