import NiceTable from 'components/NiceTable/NiceTable';
import { TaskStatusView } from 'figurl';
import useQueryTask from 'MainView/useQueryTask';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {

}

type Subject = {
    subject_id: string,
    description: string,
    genotype: string,
    sex: string,
    species: string,
    age: string
}

const fields = [
    {
        key: 'subject_id',
        label: 'subject_id'
    },
    {
        key: 'description',
        label: 'description'
    },
    {
        key: 'genotype',
        label: 'genotype'
    },
    {
        key: 'sex',
        label: 'sex'
    },
    {
        key: 'species',
        label: 'species'
    },
    {
        key: 'age',
        label: 'age'
    }
]
const primaryKey = 'subject_id'

const SubjectsTable: FunctionComponent<Props> = () => {
    const {returnValue: subjects, task} = useQueryTask<Subject[]>('nwb_datajoint_view.fetch_subjects.1', {})
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [])
    const rows = useMemo(() => {
        if (!subjects) return []
        return subjects.map((subject) => {
            const columnValues: {[key: string]: {text: string}} = {}
            for (let f of fields) {
                columnValues[f.key] = {
                    text: (subject as any)[f.key]
                }
            }
            return {
                key: subject[primaryKey],
                columnValues
            }
        })
    }, [subjects])
    if (!subjects) {
        return <TaskStatusView task={task} label="Fetching subjects" />
    }
    return (
        <div>
            <h2>Subjects</h2>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default SubjectsTable