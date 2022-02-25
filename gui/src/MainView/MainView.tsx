import NwbDatajointViewData from 'NwbDatajointViewData';
import React, { FunctionComponent, useReducer } from 'react';
import { selectionReducer } from './selectionReducer';
import InstitutionsTable from './Tables/InstitutionsTable';
import IntervalListsTable from './Tables/IntervalListsTable';
import LabsTable from './Tables/LabsTable';
import SessionsTable from './Tables/SessionsTable';
import SortIntervalsTable from './Tables/SortIntervalsTable';
import SubjectsTable from './Tables/SubjectsTable';
import ElectrodeGroupsTable from './Tables/ElectrodeGroupsTable'
import SortGroupsTable from './Tables/SortGroupsTable';
import SpikeSortingRecordingsTable from './Tables/SpikeSortingRecordingsTable';
import SpikeSortingsTable from './Tables/SpikeSortingsTable';

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
                        <ElectrodeGroupsTable
                            selection={selection}
                            selectionDispatch={selectionDispatch}
                        />
                        <SortGroupsTable
                            selection={selection}
                            selectionDispatch={selectionDispatch}
                        />
                        <SpikeSortingRecordingsTable
                            selection={selection}
                            selectionDispatch={selectionDispatch}
                        />
                        <SpikeSortingsTable
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