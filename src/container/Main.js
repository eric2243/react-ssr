import React from 'react';
import { renderRoutes } from 'react-router-config'
import Header from '../components/header/'

export default (props) => {
    return (
        <>
            <Header {...props}/>
            {renderRoutes(props.route.routes)}
        </>
    )
}