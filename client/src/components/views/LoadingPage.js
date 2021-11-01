import React from 'react';
import {Spin} from 'antd';
//css in index.css

function LoadingPage() {
    return (
        <div className="loadingPage">
            <Spin tip="Loading..."/>
        </div>
    )
}

export default LoadingPage
