import { validateObject } from "figurl"
import { isEqualTo, isString } from "figurl/viewInterface/validateObject"

type SpyglassViewData = {
    type: 'spyglassview'
    sessionGroupName: string
}

export const isSpyglassViewData = (x: any): x is SpyglassViewData => {
    return validateObject(x, {
        type: isEqualTo('spyglassview'),
        sessionGroupName: isString
    })
}

export default SpyglassViewData