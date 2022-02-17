import useTask from "figurl/useTask"
import { TaskFunctionId, TaskKwargs } from "figurl/viewInterface/kacheryTypes"

const useQueryTask = <ReturnType>(functionId: TaskFunctionId | string | undefined, kwargs: TaskKwargs | {[key: string]: any}) => {
    return useTask<ReturnType>(functionId, kwargs, 'query', {queryUseCache: true})
}

export default useQueryTask