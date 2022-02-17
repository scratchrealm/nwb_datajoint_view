export type Selection = {
    nwb_file_name?: string
}

export type SelectionAction = {
    type: 'setNwbFileName',
    nwb_file_name: string
}

export const selectionReducer = (state: Selection, action: SelectionAction) => {
    if (action.type === 'setNwbFileName') {
        return {...state, nwb_file_name: action.nwb_file_name}
    }
    return state
}