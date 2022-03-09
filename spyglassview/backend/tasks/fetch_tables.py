from attr import asdict
import kachery_client as kc
import nwb_datajoint.common as ndc
import nwb_datajoint.figurl_views as ndf
from .serialize_wrapper import serialize_wrapper

# Session
@kc.taskfunction('spyglassview.fetch_sessions.1', type='query')
@serialize_wrapper
def task_fetch_sessions(session_group_name: str):
    sessions = ndc.SessionGroup.get_group_sessions(session_group_name)
    return [
        (ndc.Session & {'nwb_file_name': session['nwb_file_name']}).fetch1()
        for session in sessions
    ]

# IntervalList for nwbfile
@kc.taskfunction('spyglassview.fetch_interval_lists_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_interval_lists_for_nwb_file(nwb_file_name: str):
    x = (ndc.IntervalList & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    return x

# SortIntervals for nwbfile
@kc.taskfunction('spyglassview.fetch_sort_intervals_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_sort_intervals_for_nwb_file(nwb_file_name: str):
    x = (ndc.SortInterval & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    return x

# ElectrodeGroups for nwbfile
@kc.taskfunction('spyglassview.fetch_electrode_groups_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_electrode_groups_for_nwb_file(nwb_file_name: str):
    x = (ndc.ElectrodeGroup & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    for electrode_group in x:
        y = (ndc.Electrode & {'nwb_file_name': nwb_file_name, 'electrode_group_name': electrode_group['electrode_group_name']}).fetch(as_dict=True)
        electrode_group['electrodes'] = y
    return x

# SortGroups for nwbfile
@kc.taskfunction('spyglassview.fetch_sort_groups_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_sort_groups_for_nwb_file(nwb_file_name: str):
    x = (ndc.SortGroup & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    for sort_group in x:
        y = (ndc.SortGroup.SortGroupElectrode & {'nwb_file_name': nwb_file_name, 'sort_group_id': sort_group['sort_group_id']}).fetch(as_dict=True)
        sort_group['sort_group_electrodes'] = y
    return x

# SpikeSortingRecordings for nwbfile
@kc.taskfunction('spyglassview.fetch_spike_sorting_recordings_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_spike_sorting_recordings_for_nwb_file(nwb_file_name: str):
    x = (ndc.SpikeSortingRecording & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    for a in x:
        b = (ndf.SpikeSortingRecordingView & a).fetch(as_dict=True)
        a['figurl'] = b[0]['figurl'] if len(b) == 1 else None
    return x

# SpikeSorting for nwbfile
@kc.taskfunction('spyglassview.fetch_spike_sortings_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_spike_sortings_for_nwb_file(nwb_file_name: str):
    x = (ndc.SpikeSorting & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    for a in x:
        b = (ndf.SpikeSortingView & a).fetch(as_dict=True)
        a['figurl'] = b[0]['figurl'] if len(b) == 1 else None
    return x