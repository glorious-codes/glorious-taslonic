#!/bin/sh

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ "$branch" = "master" ]; then
    npm run deploy -- --token=$FIREBASE_TOKEN
else
    echo "skipped"
fi
