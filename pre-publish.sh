#!/bin/sh

npm run build:clear
NODE_ENV=production npm run build
cp -r ./dist/react ./react
cp -r ./dist/vue ./vue
cp ./dist/taslonic.css ./taslonic.css
