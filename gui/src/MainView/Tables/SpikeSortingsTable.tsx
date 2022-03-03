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

type SpikeSorting = {
    nwb_file_name: string
    sort_group_id: number
    sort_interval_name: string
    preproc_params_name: string
    sorter_name: string
    spikesorter_parameter_set_name: string
    sorting_id: string
    analysis_file_name: string
    time_of_sort: number
    units_object_id: string
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
        key: 'sorter_name',
        label: 'sorter_name'
    },
    {
        key: 'spikesorter_parameter_set_name',
        label: 'spikesorter_parameter_set_name'
    },
    {
        key: 'sorting_id',
        label: 'sorting_id'
    },
    {
        key: 'analysis_file_name',
        label: 'analysis_file_name'
    },
    {
        key: 'time_of_sort',
        label: 'time_of_sort',
        formatValue: (x: number[]) => (`${x}`)
    },
    {
        key: 'units_object_id',
        label: 'units_object_id'
    }
]
const primaryKey = (x: SpikeSorting) => (x.nwb_file_name + ':' + x.sort_group_id + ':' + x.sort_interval_name + ':' + x.preproc_params_name + ':' + x.sorter_name + ':' + x.spikesorter_parameter_set_name)

const SpikeSortingsTable: FunctionComponent<Props> = ({selection}) => {
    const {returnValue: spikeSortings, task, refresh} = useQueryTask<SpikeSorting[]>(
        'spyglassview.fetch_spike_sortings_for_nwb_file.1',
        {nwb_file_name: selection.nwb_file_name}
    )
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!spikeSortings) return []
        return spikeSortings.map((spikeSorting) => {
            const columnValues: {[key: string]: {text: string, element?: any}} = {}
            for (let f of fields) {
                const value = (spikeSorting as any)[f.key]
                columnValues[f.key] = {
                    text: f.formatValue ? f.formatValue(value) : value,
                    element: f.formatElement ? f.formatElement(value) : undefined
                }
            }
            return {
                key: primaryKey(spikeSorting),
                columnValues
            }
        })
    }, [spikeSortings])
    if (!spikeSortings) {
        return <TaskStatusView task={task} label="Fetching spike sortings for nwb file" />
    }
    return (
        <div>
            <h2>Spike sortings for {selection.nwb_file_name}</h2>
            <Hyperlink onClick={refresh}>refresh</Hyperlink>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default SpikeSortingsTable