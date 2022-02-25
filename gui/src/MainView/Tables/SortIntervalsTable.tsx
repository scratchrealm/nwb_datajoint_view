import NiceTable from 'components/NiceTable/NiceTable';
import { TaskStatusView } from 'figurl';
import { Selection, SelectionAction } from 'MainView/selectionReducer';
import useQueryTask from 'MainView/useQueryTask';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {
    selection: Selection
    selectionDispatch: (a: SelectionAction) => void
}

type SortInterval = {
    nwb_file_name: string
    sort_interval_name: string
    sort_interval: number[]
}

const fields = [
    {
        key: 'nwb_file_name',
        label: 'nwb_file_name'
    },
    {
        key: 'sort_interval_name',
        label: 'sort_interval_name'
    },
    {
        key: 'sort_interval',
        label: 'sort_interval',
        formatValue: (x: number[]) => ('[' + x.map(a => (`${a}`)).join(', ') + ']')
    }
]
const primaryKey = (x: SortInterval) => (x.nwb_file_name + ':' + x.sort_interval_name)

const SortIntervalsTable: FunctionComponent<Props> = ({selection}) => {
    const {returnValue: intervalLists, task} = useQueryTask<SortInterval[]>(
        'nwb_datajoint_view.fetch_sort_intervals_for_nwb_file.1',
        {nwb_file_name: selection.nwb_file_name}
    )
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!intervalLists) return []
        return intervalLists.map((intervalList) => {
            const columnValues: {[key: string]: {text: string}} = {}
            for (let f of fields) {
                const value = (intervalList as any)[f.key]
                columnValues[f.key] = {
                    text: f.formatValue ? f.formatValue(value) : value
                }
            }
            return {
                key: primaryKey(intervalList),
                columnValues
            }
        })
    }, [intervalLists])
    if (!intervalLists) {
        return <TaskStatusView task={task} label="Fetching sort intervals for nwb file" />
    }
    return (
        <div>
            <h2>Sort intervals for {selection.nwb_file_name}</h2>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default SortIntervalsTable