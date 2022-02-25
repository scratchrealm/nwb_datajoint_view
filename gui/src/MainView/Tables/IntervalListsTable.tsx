import NiceTable from 'components/NiceTable/NiceTable';
import { TaskStatusView } from 'figurl';
import { Selection, SelectionAction } from 'MainView/selectionReducer';
import useQueryTask from 'MainView/useQueryTask';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {
    selection: Selection
    selectionDispatch: (a: SelectionAction) => void
}

type IntervalList = {
    nwb_file_name: string
    interval_list_name: string
    valid_times: number[][]
}

const fields = [
    {
        key: 'nwb_file_name',
        label: 'nwb_file_name'
    },
    {
        key: 'interval_list_name',
        label: 'interval_list_name'
    },
    {
        key: 'valid_times',
        label: 'valid_times',
        formatValue: (x: number[][]) => (x.map(a => ('[' + a.map(b => `${b}`).join(', ') + ']')).join(' '))
    }
]
const primaryKey = (x: IntervalList) => (x.nwb_file_name + ':' + x.interval_list_name)

const IntervalListsTable: FunctionComponent<Props> = ({selection}) => {
    const {returnValue: intervalLists, task} = useQueryTask<IntervalList[]>(
        'nwb_datajoint_view.fetch_interval_lists_for_nwb_file.1',
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
        return <TaskStatusView task={task} label="Fetching interval lists for nwb file" />
    }
    return (
        <div>
            <h2>Interval lists for {selection.nwb_file_name}</h2>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default IntervalListsTable