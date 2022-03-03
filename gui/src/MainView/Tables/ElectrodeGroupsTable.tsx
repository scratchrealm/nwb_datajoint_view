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

type Electrode = {
    nwb_file_name: string
    electrode_group_name: string
    electrode_id: number
    probe_type: string
    probe_shank: number
    probe_electrode: number
    region_id: number
    name: string
    original_reference_electrode: number
    x: number
    y: number
    z: number
    filtering: string
    impedance: number
    bad_channel: string
    x_warped: number
    y_warped: number
    z_warped: number
    contacts: string
}

type ElectrodeGroup = {
    nwb_file_name: string
    electrode_group_name: string
    region_id: number
    probe_type: string
    description: string
    target_hemisphere: string
    electrodes: Electrode[]
}

const fields = [
    {
        key: 'nwb_file_name',
        label: 'nwb_file_name'
    },
    {
        key: 'electrode_group_name',
        label: 'electrode_group_name'
    },
    {
        key: 'region_id',
        label: 'region_id',
        formatValue: (x: number[]) => (`${x}`)
    },
    {
        key: 'probe_type',
        label: 'probe_type'
    },
    {
        key: 'description',
        label: 'description'
    },
    {
        key: 'target_hemisphere',
        label: 'target_hemisphere'
    },
    {
        key: 'electrodes',
        label: 'electrodes',
        formatValue: (x: Electrode[]) => (
            x.map(y => (`${y.electrode_id}`)).join(', ')
        )
    },
]
const primaryKey = (x: ElectrodeGroup) => (x.nwb_file_name + ':' + x.electrode_group_name)

const ElectrodeGroupsTable: FunctionComponent<Props> = ({selection}) => {
    const {returnValue: electrodeGroups, task, refresh} = useQueryTask<ElectrodeGroup[]>(
        'spyglassview.fetch_electrode_groups_for_nwb_file.1',
        {nwb_file_name: selection.nwb_file_name}
    )
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!electrodeGroups) return []
        return electrodeGroups.map((electrodeGroup) => {
            const columnValues: {[key: string]: {text: string}} = {}
            for (let f of fields) {
                const value = (electrodeGroup as any)[f.key]
                columnValues[f.key] = {
                    text: f.formatValue ? f.formatValue(value) : value
                }
            }
            return {
                key: primaryKey(electrodeGroup),
                columnValues
            }
        })
    }, [electrodeGroups])
    if (!electrodeGroups) {
        return <TaskStatusView task={task} label="Fetching electrode groups for nwb file" />
    }
    return (
        <div>
            <h2>Electrode groups for {selection.nwb_file_name}</h2>
            <Hyperlink onClick={refresh}>refresh</Hyperlink>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default ElectrodeGroupsTable