
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'

import routes from './index'

export default () => {
    return (
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    )
}