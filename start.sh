#!/bin/bash

pm2 stop ./pm2.json && pm2 start ./pm2.json

# (export PORT=4101 && forever start index.js -c "node")
