import Hyperlink from 'components/Hyperlink/Hyperlink';
import NiceTable from 'components/NiceTable/NiceTable';
import { TaskStatusView } from 'figurl';
import { Selection, SelectionAction } from 'MainView/selectionReducer';
import useQueryTask from 'MainView/useQueryTask';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {
    sessionGroupName: string
    selection: Selection
    selectionDispatch: (a: SelectionAction) => void
}

type Session = {
    session_id: string,
    experiment_description: string,
    institution_name: string,
    lab_name: string,
    nwb_file_name: string,
    session_description: string,
    session_start_time: string,
    subject_id: string,
    timestamps_reference_time: string
}

const SessionsTable: FunctionComponent<Props> = ({sessionGroupName, selectionDispatch}) => {
    const fields = useMemo(() => ([
        {
            key: 'session_id',
            label: 'session_id'
        },
        {
            key: 'experiment_description',
            label: 'experiment_description'
        },
        {
            key: 'institution_name',
            label: 'institution_name'
        },
        {
            key: 'lab_name',
            label: 'lab_name'
        },
        {
            key: 'nwb_file_name',
            label: 'nwb_file_name',
            onClick: (x: Session) => {selectionDispatch({type: 'setNwbFileName', nwb_file_name: x.nwb_file_name})}
        },
        {
            key: 'session_description',
            label: 'session_description'
        },
        {
            key: 'session_start_time',
            label: 'session_start_time'
        },
        {
            key: 'subject_id',
            label: 'subject_id'
        },
        {
            key: 'timestamps_reference_time',
            label: 'timestamps_reference_time'
        }
    ]), [selectionDispatch])
    const primaryKey = 'session_id'

    const {returnValue: sessions, task, refresh} = useQueryTask<Session[]>('spyglassview.fetch_sessions.1', {'session_group_name': sessionGroupName})
    const columns = useMemo(() => {
        return fields.map((f) => ({
            key: f.key,
            label: f.label
        }))
    }, [fields])
    const rows = useMemo(() => {
        if (!sessions) return []
        return sessions.map((session) => {
            const columnValues: {[key: string]: {text: string, element: any}} = {}
            for (let f of fields) {
                const text = (session as any)[f.key] as string
                columnValues[f.key] = {
                    text,
                    element: f.onClick ? <Hyperlink onClick={() => f.onClick && f.onClick(session)}>{text}</Hyperlink> : <span>{text}</span>
                }
            }
            return {
                key: session[primaryKey],
                columnValues
            }
        })
    }, [sessions, fields])
    if (!sessions) {
        return <TaskStatusView task={task} label="Fetching sessions" />
    }
    return (
        <div>
            <h2>Sessions</h2>
            <Hyperlink onClick={refresh}>refresh</Hyperlink>
            <NiceTable
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default SessionsTable