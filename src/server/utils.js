import React from 'react';
import ReactDomServer from 'react-dom/server';

export const generatorHTML = (Component, cssList) => {
    const componentStr = ReactDomServer.renderToString(Component);
    const cssStr = cssList.join('\n');
    return {
        componentStr,
        cssStr
    };
};