
import React,{Component} from 'react'
import {Helmet} from "react-helmet";

class NotFound extends Component{
    render() {
        const { staticContext } = this.props;
        staticContext && (staticContext.status = 404);
        return (
            <div>
                <Helmet>
                    <title>react-ssr 找不到页面了</title>
                </Helmet>
                <h1>404 找不到页面啦</h1>
            </div>
        );
    }
}

export default NotFound
