#!/bin/sh

#### for tests uncomment two lines below
# npm install expect
# npm install mocha

#### check your local paths to binaries and update if needed
METEOR_BINARY="/usr/local/bin/meteor"
GIT_BINARY="/usr/bin/git"




$METEOR_BINARY create xxo
cd xxo
rm -rf xxo*
$GIT_BINARY init

$GIT_BINARY pull https://github.com/proczniak/xxo.git

$METEOR_BINARY add accounts-password accounts-ui aldeed:collection2 blaze-html-templates dburles:collection-helpers \
    ecmascript es5-shim jquery juliancwirko:s-alert juliancwirko:s-alert-genie kadira:flow-router kadira:react-layout \
    meteor-base mobile-experience mongo msavin:mongol ongoworks:security react session standard-minifiers \
    tracker twbs:bootstrap
$METEOR_BINARY remove autopublish insecure

echo "###################################################"
echo "#                                                 #"
echo "# to play the game open http://localhost:3000     #"
echo "# in your browser (need to support v8 JS engine   #"
echo "#                                                 #"
echo "###################################################"

$METEOR_BINARY
