import React from 'react'
import {Spinner} from 'react-bootstrap'

const buffer = () => {
    return (
        <Spinner
            animation='border'
            role= 'status'
            style = {{
                width: '150px',
                height: '150px',
                margin: 'auto',
                display: 'block',
            }}> <span class='sr-only'>Loading..</span>
        </Spinner>
    )
}

export default buffer
