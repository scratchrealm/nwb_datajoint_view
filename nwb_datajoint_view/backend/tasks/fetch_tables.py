from attr import asdict
import kachery_client as kc
import nwb_datajoint.common as nd
from .serialize_wrapper import serialize_wrapper

# Lab
@kc.taskfunction('nwb_datajoint_view.fetch_labs.1', type='query')
@serialize_wrapper
def task_fetch_labs():
    x = nd.Lab().fetch(as_dict=True)
    return x

# Institution
@kc.taskfunction('nwb_datajoint_view.fetch_institutions.1', type='query')
@serialize_wrapper
def task_fetch_institutions():
    x = nd.Institution().fetch(as_dict=True)
    return x

# Subject
@kc.taskfunction('nwb_datajoint_view.fetch_subjects.1', type='query')
@serialize_wrapper
def task_fetch_subjects():
    x = nd.Subject().fetch(as_dict=True)
    return x

# Session
@kc.taskfunction('nwb_datajoint_view.fetch_sessions.1', type='query')
@serialize_wrapper
def task_fetch_sessions():
    x = nd.Session().fetch(as_dict=True)
    return x

# IntervalList for nwbfile
@kc.taskfunction('nwb_datajoint_view.fetch_interval_lists_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_interval_lists_for_nwb_file(nwb_file_name: str):
    x = (nd.IntervalList & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    return x

# SortIntervals for nwbfile
@kc.taskfunction('nwb_datajoint_view.fetch_sort_intervals_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_sort_intervals_for_nwb_file(nwb_file_name: str):
    x = (nd.SortInterval & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    return x

# ElectrodeGroups for nwbfile
@kc.taskfunction('nwb_datajoint_view.fetch_electrode_groups_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_electrode_groups_for_nwb_file(nwb_file_name: str):
    x = (nd.ElectrodeGroup & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    for electrode_group in x:
        y = (nd.Electrode & {'nwb_file_name': nwb_file_name, 'electrode_group_name': electrode_group['electrode_group_name']}).fetch(as_dict=True)
        electrode_group['electrodes'] = y
    return x

# SortGroups for nwbfile
@kc.taskfunction('nwb_datajoint_view.fetch_sort_groups_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_sort_groups_for_nwb_file(nwb_file_name: str):
    x = (nd.SortGroup & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    for sort_group in x:
        y = (nd.SortGroup.SortGroupElectrode & {'nwb_file_name': nwb_file_name, 'sort_group_id': sort_group['sort_group_id']}).fetch(as_dict=True)
        sort_group['sort_group_electrodes'] = y
    return x

# SpikeSortingRecordings for nwbfile
@kc.taskfunction('nwb_datajoint_view.fetch_spike_sorting_recordings_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_spike_sorting_recordings_for_nwb_file(nwb_file_name: str):
    x = (nd.SpikeSortingRecording & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    return x

# SpikeSorting for nwbfile
@kc.taskfunction('nwb_datajoint_view.fetch_spike_sortings_for_nwb_file.1', type='query')
@serialize_wrapper
def task_fetch_spike_sortings_for_nwb_file(nwb_file_name: str):
    x = (nd.SpikeSorting & {'nwb_file_name': nwb_file_name}).fetch(as_dict=True)
    return x