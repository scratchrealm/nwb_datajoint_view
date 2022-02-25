# nwb_datajoint_view

View [nwb_datajoint](https://github.com/LorenFrankLab/nwb_datajoint) database.

## Installation

nwb_datajoint_view uses [kachery](https://github.com/kacheryhub/kachery-doc/blob/main/README.md) and [figurl](https://github.com/magland/figurl/blob/main/README.md). You must [set up a kachery node and run a kachery daemon](https://github.com/kacheryhub/kachery-doc/blob/main/doc/hostKacheryNode.md).

Use the same conda environment where nwb_datajoint is installed.

Install the latest version of nwb_datajoint_view:

```bash
pip install --upgrade git+https://github.com/scratchrealm/nwb_datajoint_view
```

Note: You must set the FIGURL_CHANNEL environment variable to the kachery channel you want to upload to.

## Usage

Start the backend:

```bash
# You should run this in the directory where the datajoint config file resides so that it can properly connect to the MySQL database
nwb-datajoint-view-start-backend --channel <channelname>
```

* Set the FIGURL_CHANNEL environment variable to the same `<channelname>`

Then run `python examples/example1` to get the URL.
