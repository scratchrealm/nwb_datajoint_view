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

type SortGroupElectrode = {
    nwb_file_name: 'RN2_20191110_.nwb'
    sort_group_id: number
    electrode_group_name: string
    electrode_id: number
}

type SortGroup = {
    nwb_file_name: string
    sort_group_id: number
    sort_reference_electrode_id: number
    sort_group_electrodes: SortGroupElectrode[]
}

const fields = [
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
        key: 'sort_reference_electrode_id',
        label: 'sort_reference_electrode_id',
        formatValue: (x: number[]) => (`${x}`)
    },
    {
        key: 'sort_group_electrodes',
        label: 'electrodes',
        formatValue: (x: SortGroupElectrode[]) => (
            x.map(y => (`${y.electrode_id}`)).join(', ')
        )
    }
]
const primaryKey = (x: SortGroup) => (x.nwb_file_name + ':' + x.sort_group_id)

const SortGroupsTable: FunctionComponent<Props> = ({selection}) => {
    const {returnValue: sortGroups, task, refresh} = useQueryTask<SortGroup[]>(
        'spyglassview.fetch_sort_groups_for_nwb_file.1',
        {nwb_file_name: selection.nwb_file_name}
    )
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!sortGroups) return []
        return sortGroups.map((sortGroup) => {
            const columnValues: {[key: string]: {text: string}} = {}
            for (let f of fields) {
                const value = (sortGroup as any)[f.key]
                columnValues[f.key] = {
                    text: f.formatValue ? f.formatValue(value) : value
                }
            }
            return {
                key: primaryKey(sortGroup),
                columnValues
            }
        })
    }, [sortGroups])
    if (!sortGroups) {
        return <TaskStatusView task={task} label="Fetching sort groups for nwb file" />
    }
    return (
        <div>
            <h2>Sort groups for {selection.nwb_file_name}</h2>
            <Hyperlink onClick={refresh}>refresh</Hyperlink>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default SortGroupsTable