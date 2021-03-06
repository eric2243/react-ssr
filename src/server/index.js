import express from 'express';
import favicon from 'serve-favicon';
import proxy from 'express-http-proxy';
import React from 'react';
import { matchRoutes } from 'react-router-config'
import Helmet from 'react-helmet'

import serverConfig from '../request/serverConfig'
import createServerRouter from '../routers/ServerRouter'
import AppComponent from '../container/App'
import { generatorHTML } from './utils'
import routes from "../routers";
import createStore from '../store'


const app = express();

app.use('/', express.static("src/client/dist"));
app.use(favicon('src/favicon.ico'));
app.set('view engine','ejs');
app.set('views', 'src/server/');
app.use('/api/v2', proxy(serverConfig.baseURL, {
    https: true,
}));

app.get('*', (req, res) => {
    const helmet = Helmet.renderStatic();
    const store = createStore({}, true);
    const cssList = [];
    const context = {
        status: 200,
        insertCss: (style) => cssList.push(style._getCss())
    };
    console.log(req.url);
    /*
     * 这里将通过matchRoutes匹配的路由，过滤一下没有loadData方法的数据.全部执行一下loadData方法，将返回的promise填充回去
     */
    const promises = matchRoutes(routes, req.url)
        .filter(route => typeof route.route.loadData === 'function')
        .map(route => {
            // 这里将所有loadData返回返回的结果，都以成功状态的promise返回回去，保证整个页面的渲染效果
            return new Promise(resolve => {
                const loadDataCallback = route.route.loadData(store);
                if(loadDataCallback instanceof Promise){
                    loadDataCallback.then(resolve,resolve);
                }else{
                    resolve(loadDataCallback);
                }
            });
        });
    Promise.all(promises).then(() => {
        const ServerApp = createServerRouter(req, res, context);
        const {componentStr, cssStr} = generatorHTML(( <AppComponent initState={store}><ServerApp /></AppComponent>), cssList);
        /**
         * JSON.parse转json字符串时遇到一些特殊字符需要先转义,否则服务器端解析会报错
         * @link http://qnimate.com/json-parse-throws-unexpected-token-error-for-valid-json/
         * @type {string}
         */
        const storeState = JSON.stringify(store.getState()).replace(/\\n/g, "\\\\n")
            .replace(/\\r/g, "\\\\r")
            .replace(/\\t/g, "\\\\t")
            .replace(/\\f/g, "\\\\f");

        if(context.action === 'REPLACE'){
            res.redirect( 301, context.url );
        }else{
            // TODO 服务器端渲染个404 后，加入再点击公共组件的连接，那么就会使用浏览器端的路由组件，这时候，页面不会重新请求，虽然页面展示正确状态，但是状态码就不会再更新成200了。
            res.status(context.status);
            res.render('index', {
                title: 'react-ssr',
                cssStr,
                componentStr,
                storeState,
                helmet,
            });
        }
    });
});


app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});