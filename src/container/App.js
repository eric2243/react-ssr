import React from 'react';
import {Provider} from 'react-redux'

export default (props) => {
    return (
        <Provider store={props.initState}>
            {props.children}
        </Provider>
    )
}