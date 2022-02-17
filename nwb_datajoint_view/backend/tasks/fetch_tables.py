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