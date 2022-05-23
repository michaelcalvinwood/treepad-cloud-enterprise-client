#/bin/bash

clear
npm run build
cd build
rsync -a . root@treepadcloudenterprise.com:/var/www/treepadcloudenterprise.com/curBuild
cd ..
