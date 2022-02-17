from setuptools import setup, find_packages

setup(
    packages=find_packages(),
    scripts=[
        'bin/nwb-datajoint-view-start-backend'
    ],
    include_package_data = True,
    install_requires=[
        'kachery-client>=1.1.7',
        'figurl>=0.1.8'
    ]
)
