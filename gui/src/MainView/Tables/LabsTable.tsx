import NiceTable from 'components/NiceTable/NiceTable';
import { TaskStatusView } from 'figurl';
import useQueryTask from 'MainView/useQueryTask';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {

}

type Lab = {
    lab_name: string
}

const fields = [
    {
        key: 'lab_name',
        label: 'lab_name'
    }
]
const primaryKey = 'lab_name'

const LabsTable: FunctionComponent<Props> = () => {
    const {returnValue: labs, task} = useQueryTask<Lab[]>('nwb_datajoint_view.fetch_labs.1', {})
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!labs) return []
        return labs.map((lab) => {
            const columnValues: {[key: string]: {text: string}} = {}
            for (let f of fields) {
                columnValues[f.key] = {
                    text: (lab as any)[f.key]
                }
            }
            return {
                key: lab[primaryKey],
                columnValues
            }
        })
    }, [labs])
    if (!labs) {
        return <TaskStatusView task={task} label="Fetching labs" />
    }
    return (
        <div>
            <h2>Labs</h2>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default LabsTable