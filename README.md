# 959.js

A simple FTP server written in pure ECMAScript 6. 

## Features:

* User management through simple JSON configuration file
* Implements RFC 959 (but without active data transfer)
* Implements RFC 697 (CWD)
* CHMOD of files
* Working directories per user
* port ranges for passive mode
* instant configuration reloading. you do not have to restart the ftp server when you change the ftp-config.json

## Planned features:

I plan implementing the following features. Pull requests are welcomed.

* configurable configuration file name
* Docker image
* Windows compatibility
* Anonymous support
* Testing...
* Remove moment.js dependency
* TLS support (FTPS, FTPES)
* RFC 2428 (IPv6)
* RFC 7151 (Virtual Hosts)
* RFC 3659

## Usage

Install 959.js with the following command:

    npm install -g 959.js

Then create a file named `ftp-config.json` in a directory which will contain the server configuration.

    {}

Then you can add and remove users by using `nftp add-user [YOUR_USERNAME]` and answer the questions that are asked.

After this, you can start your FTP-Server like the following:

    sudo nftp serve

`sudo` is necessary, because it has to be bound to port 21.

To configure the passive ports, server address and control port you can edit the configuration file like this:

    {
        "address": "[YOUR_IP_ADDRESS]",
        "port": 21,
        "passivePorts": ["10000-11000", "1337"],
        "users": [
            // ...
        ]
    }

## Troubleshooting

* `sudo: nftp: command not found`

  If you encounter this error, then you can workaround this with the following command:

  `sudo $(which nftp) serve`

## License
Copyright (c) 2017 Timm Decker
Licensed under the MIT license.
