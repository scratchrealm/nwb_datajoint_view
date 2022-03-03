import Hyperlink from 'components/Hyperlink/Hyperlink';
import NiceTable from 'components/NiceTable/NiceTable';
import { TaskStatusView } from 'figurl';
import { Selection, SelectionAction } from 'MainView/selectionReducer';
import useQueryTask from 'MainView/useQueryTask';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {
    selection: Selection
    selectionDispatch: (a: SelectionAction) => void
}

type SpikeSortingRecording = {
    nwb_file_name: string
    sort_group_id: number
    sort_interval_name: string
    preproc_params_name: string
    sort_interval_list_name: string
    figurl: string | null
}

const fields = [
    {
        key: 'figurl',
        label: 'View',
        formatValue: (x: any) => (x ? x : ''),
        formatElement: (x: any) => (x ? <a href={x} target="_blank" rel="noreferrer">view</a> : <span />)
    },
    {
        key: 'nwb_file_name',
        label: 'nwb_file_name'
    },
    {
        key: 'sort_group_id',
        label: 'sort_group_id',
        formatValue: (x: number[]) => (`${x}`)
    },
    {
        key: 'sort_interval_name',
        label: 'sort_interval_name',
    },
    {
        key: 'preproc_params_name',
        label: 'preproc_params_name'
    },
    {
        key: 'sort_interval_list_name',
        label: 'sort_interval_list_name'
    }
]
const primaryKey = (x: SpikeSortingRecording) => (x.nwb_file_name + ':' + x.sort_group_id + ':' + x.sort_interval_name + ':' + x.preproc_params_name + ':' + x.sort_interval_list_name)

const SpikeSortingRecordingsTable: FunctionComponent<Props> = ({selection}) => {
    const {returnValue: spikeSortingRecordings, task, refresh} = useQueryTask<SpikeSortingRecording[]>(
        'spyglassview.fetch_spike_sorting_recordings_for_nwb_file.1',
        {nwb_file_name: selection.nwb_file_name}
    )
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!spikeSortingRecordings) return []
        return spikeSortingRecordings.map((spikeSortingRecording) => {
            const columnValues: {[key: string]: {text: string, element?: any}} = {}
            for (let f of fields) {
                const value = (spikeSortingRecording as any)[f.key]
                columnValues[f.key] = {
                    text: f.formatValue ? f.formatValue(value) : value,
                    element: f.formatElement ? f.formatElement(value) : undefined
                }
            }
            return {
                key: primaryKey(spikeSortingRecording),
                columnValues
            }
        })
    }, [spikeSortingRecordings])
    if (!spikeSortingRecordings) {
        return <TaskStatusView task={task} label="Fetching spike sorting recordings for nwb file" />
    }
    return (
        <div>
            <h2>Spike sorting recordings for {selection.nwb_file_name}</h2>
            <Hyperlink onClick={refresh}>refresh</Hyperlink>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default SpikeSortingRecordingsTable