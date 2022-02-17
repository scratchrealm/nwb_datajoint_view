import { validateObject } from "figurl"
import { isEqualTo } from "figurl/viewInterface/validateObject"

type NwbDatajointViewData = {
    type: 'nwb-datajoint-view'
}

export const isNwbDatajointViewData = (x: any): x is NwbDatajointViewData => {
    return validateObject(x, {
        type: isEqualTo('nwb-datajoint-view')
    })
}

export default NwbDatajointViewData