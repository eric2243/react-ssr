import React from 'react';
import {StaticRouter, Route, Switch} from 'react-router-dom';
import { renderRoutes } from 'react-router-config'

import routes from './index'

export default (req, res, context) => {
    return () => (
        <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
        </StaticRouter>
    )
}