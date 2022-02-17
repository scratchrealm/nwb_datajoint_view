import NiceTable from 'components/NiceTable/NiceTable';
import { TaskStatusView } from 'figurl';
import useQueryTask from 'MainView/useQueryTask';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {

}

type Institution = {
    institution_name: string
}

const fields = [
    {
        key: 'institution_name',
        label: 'institution_name'
    }
]
const primaryKey = 'institution_name'

const InstitutionsTable: FunctionComponent<Props> = () => {
    const {returnValue: institutions, task} = useQueryTask<Institution[]>('nwb_datajoint_view.fetch_institutions.1', {})
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!institutions) return []
        return institutions.map((institution) => {
            const columnValues: {[key: string]: {text: string}} = {}
            for (let f of fields) {
                columnValues[f.key] = {
                    text: (institution as any)[f.key]
                }
            }
            return {
                key: institution[primaryKey],
                columnValues
            }
        })
    }, [institutions])
    if (!institutions) {
        return <TaskStatusView task={task} label="Fetching institutions" />
    }
    return (
        <div>
            <h2>Institutions</h2>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default InstitutionsTable