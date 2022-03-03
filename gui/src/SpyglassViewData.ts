import { validateObject } from "figurl"
import { isEqualTo } from "figurl/viewInterface/validateObject"

type SpyglassViewData = {
    type: 'spyglassview'
}

export const isSpyglassViewData = (x: any): x is SpyglassViewData => {
    return validateObject(x, {
        type: isEqualTo('spyglassview')
    })
}

export default SpyglassViewData