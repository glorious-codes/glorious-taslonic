#!/bin/sh

npm run build:clear
NODE_ENV=production npm run build
cp ./dist/react.js ./react.js
cp ./dist/vue-plugin.js ./vue-plugin.js
cp ./dist/taslonic.css ./taslonic.css
