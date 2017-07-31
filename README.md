# 959.js

A simple FTP server written in pure ECMAScript 6. 

## Features:

* User management through simple JSON configuration file
* Implements RFC 959 (but without active data transfer)
* Implements RFC 697 (CWD)
* CHMOD of files

## Planned features:

I plan implementing the following features. Pull requests are welcomed.

* Simple installation: `npm install -g 959.js && 959.js`
* Working directories per user
* port ranges for passive mode (currently only leet ports supported)
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

Because there is no npm module published, you need to `git clone` this repository directly and run the following command:

    grunt babel && node dist/user.js [YOUR_USERNAME] [YOUR_PASSWORD]

This outputs something like:
    
    sha512#9ba1f63365a6caf66e46348f43cdef956015bea997adeb06e69007ee3ff517df10fc5eb860da3d43b82c2a040c931119d2dfc6d08e253742293a868cc2d82015

Copy this string and put it in a file named ftp-config.json

    {
      "users": [
        {
          "username": "[YOUR_USERNAME]",
          "password": "sha512#9ba1f63365a6caf66e46348f43cdef956015bea997adeb06e69007ee3ff517df10fc5eb860da3d43b82c2a040c931119d2dfc6d08e253742293a868cc2d82015"
        }
      ]
    }

After this, you can start your FTP-Server like the following:

    sudo node dist/server.js

`sudo` is necessary, because it has to be bound to port 21.

## License
Copyright (c) 2017 Timm Decker  
Licensed under the MIT license.
