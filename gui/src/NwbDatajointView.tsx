import React, { FunctionComponent } from 'react';
import NwbDatajointViewData from 'NwbDatajointViewData';
import MainView from 'MainView/MainView';

type Props = {
    data: NwbDatajointViewData
    width: number
    height: number
}

const NwbDatajointView: FunctionComponent<Props> = ({data, width, height}) => {
    if (data.type === 'nwb-datajoint-view') {
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

export default NwbDatajointView