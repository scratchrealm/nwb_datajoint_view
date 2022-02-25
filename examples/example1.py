# 2/22/2022
# https://figurl.org/f?v=gs://figurl/nwb-datajoint-view-1&d=a1e343d538bf4772503cfe5fe929cdbe1c86913b&channel=flatiron1&label=nwb_datajoint%20view

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