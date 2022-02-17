import { getFigureData, useWindowDimensions } from 'figurl';
import getFileData from 'figurl/getFileData';
import NwbDatajointView from 'NwbDatajointView';
import NwbDatajointViewData, { isNwbDatajointViewData } from 'NwbDatajointViewData';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<NwbDatajointViewData>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const {width, height} = useWindowDimensions()

  useEffect(() => {
    getFigureData().then((data: any) => {
      loadArrays(data).then(data2 => {
        if (!isNwbDatajointViewData(data2)) {
          setErrorMessage(`Invalid figure data`)
          console.error('Invalid figure data', data2)
          return
        }
        setData(data2)
      })
    }).catch(err => {
      setErrorMessage(`Error getting figure data`)
      console.error(`Error getting figure data`, err)
    })
  }, [])

  if (errorMessage) {
    return <div style={{color: 'red'}}>{errorMessage}</div>
  }

  if (!data) {
    return <div>Waiting for data</div>
  }

  return (
    <NwbDatajointView
      data={data}
      width={width - 10}
      height={height - 5}
    />
  )
}

const loadArrays = async (data: any): Promise<any> => {
  if (typeof(data) === 'string') {
    if (data.startsWith('sha1://')) {
      const ret = await getFileData(data)
      return ret
    }
    else return data
  }
  else if (typeof(data) === 'object') {
    if (Array.isArray(data)) {
      const ret = []
      for (let x of data) {
        ret.push(await loadArrays(x))
      }
      return ret
    }
    else {
      const ret: {[key: string]: any} = {}
      for (let k in data) {
        ret[k] = await loadArrays(data[k])
      }
      return ret
    }
  }
  else return data
}

export default App;
