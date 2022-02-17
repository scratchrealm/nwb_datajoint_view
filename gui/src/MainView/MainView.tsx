import NwbDatajointViewData from 'NwbDatajointViewData';
import React, { FunctionComponent, useReducer } from 'react';
import { selectionReducer } from './selectionReducer';
import InstitutionsTable from './Tables/InstitutionsTable';
import IntervalListsTable from './Tables/IntervalListsTable';
import LabsTable from './Tables/LabsTable';
import SessionsTable from './Tables/SessionsTable';
import SortIntervalsTable from './Tables/SortIntervalsTable';
import SubjectsTable from './Tables/SubjectsTable';

type Props = {
    data: NwbDatajointViewData
    width: number
    height: number
}

const MainView: FunctionComponent<Props> = ({data, width, height}) => {
    const [selection, selectionDispatch] = useReducer(selectionReducer, {})
    const {nwb_file_name} = selection
    return (
        <div style={{margin: 30}}>
            <LabsTable />
            <InstitutionsTable />
            <SubjectsTable />
            <SessionsTable
                selection={selection}
                selectionDispatch={selectionDispatch}
            />
            {
                nwb_file_name && (
                    <span>
                        <IntervalListsTable
                            selection={selection}
                            selectionDispatch={selectionDispatch}
                        />
                        <SortIntervalsTable
                            selection={selection}
                            selectionDispatch={selectionDispatch}
                        />
                    </span>
                )
            }
        </div>
    )
}

export default MainView