
import axios from 'axios'

import clientConfig from './clientConfig';
import serverConfig from './serverConfig';
import baseConfig from './baseConfig'

const createRequest = (isServer) => {

    const config = isServer ? serverConfig : clientConfig;
    const instance = axios.create({...baseConfig, ...config});
    instance.interceptors.request.use(function (config) {
        // console.log('config', config);
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    return instance;
};

export default createRequest;