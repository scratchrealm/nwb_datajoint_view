import os
from typing import List
import kachery_client as kc
import numpy as np
import figurl as fig
from figurl.core.serialize_wrapper import _serialize

def create_spyglass_view(session_group_name: str):
    FIGURL_CHANNEL = os.getenv('FIGURL_CHANNEL')
    assert FIGURL_CHANNEL, 'Environment variable not set: FIGURL_CHANNEL'
    data = {
        'type': 'spyglassview',
        'sessionGroupName': session_group_name
    }
    F = fig.Figure(view_url='gs://figurl/spyglassview-1', data=data)
    return F
