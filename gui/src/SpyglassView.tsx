import React, { FunctionComponent } from 'react';
import SpyglassViewData from 'SpyglassViewData';
import MainView from 'MainView/MainView';

type Props = {
    data: SpyglassViewData
    width: number
    height: number
}

const SpyglassView: FunctionComponent<Props> = ({data, width, height}) => {
    if (data.type === 'spyglassview') {
        return (
            <MainView
                data={data}
                width={width}
                height={height}
            />
        )
    }
    else {
        return <div>Unexpected data type</div>
    }
}

export default SpyglassView