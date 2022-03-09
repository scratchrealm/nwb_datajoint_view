# 2/22/2022
# https://figurl.org/f?v=gs://figurl/spyglassview-1&d=a1e343d538bf4772503cfe5fe929cdbe1c86913b&channel=flatiron1&label=spyglassview

import os
import numpy as np
import spyglassview as sgv

def main():
    assert os.getenv('FIGURL_CHANNEL'), 'Environment variable not set: FIGURL_CHANNEL'

    F = sgv.create_spyglass_view('group1')
    url = F.url(label='spyglass view')
    print(url)


if __name__ == '__main__':
    main()