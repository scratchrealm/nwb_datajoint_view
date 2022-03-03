# spyglassview

View [spyglass](https://github.com/LorenFrankLab/nwb_datajoint) database using figurl.

## Installation

spyglassview uses [kachery](https://github.com/kacheryhub/kachery-doc/blob/main/README.md) and [figurl](https://github.com/magland/figurl/blob/main/README.md). You must [set up a kachery node and run a kachery daemon](https://github.com/kacheryhub/kachery-doc/blob/main/doc/hostKacheryNode.md).

Use the same conda environment where spyglass is installed.

Install the latest version of spyglassview:

```bash
pip install --upgrade git+https://github.com/scratchrealm/spyglassview
```

Note: You must set the FIGURL_CHANNEL environment variable to the kachery channel you want to upload to.

## Usage

Start the backend:

```bash
# You should run this in the directory where the datajoint config file resides so that it can properly connect to the MySQL database
spyglassview-start-backend --channel <channelname>
```

* Set the FIGURL_CHANNEL environment variable to the same `<channelname>`

Then run `python examples/example1` to get the URL.
