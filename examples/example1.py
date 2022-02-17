# 1/6/2022
# https://figurl.org/f?v=gs://figurl/volumeview-2&d=e9d66edac2246a9db4aca6c515d4b79aaa450796&channel=flatiron1&label=Test%20volumeview%20workspace

import os
import numpy as np
import nwb_datajoint_view as ndv

def main():
    assert os.getenv('FIGURL_CHANNEL'), 'Environment variable not set: FIGURL_CHANNEL'

    F = ndv.create_nwb_datajoint_view()
    url = F.url(label='nwb_datajoint view')
    print(url)


if __name__ == '__main__':
    main()