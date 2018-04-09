#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}/..

path="${MESSENGER_REMOTE_PATH}"
user="${MESSENGER_REMOTE_USER}"
host="${MESSENGER_REMOTE_HOST}"

if [[ "$user" == "" ]]; then
  "Error: Missing env variables"
  exit 1
fi

### Backup
tarName="backup.`date +%s`.tgz"
ssh \
    ${user}@${host} \
    "tar --exclude='node_modules' --exclude='backup.*' --exclude='*.log' -zcvf /tmp/${tarName} -C `dirname ${path}` `basename ${path}` && mv /tmp/${tarName} ${path}/"

### File Transfer
rsync \
    -arvP \
    node_modules \
    ecosystem.config.js \
    server.js \
    start.sh \
    ${user}@${host}:${path}/

