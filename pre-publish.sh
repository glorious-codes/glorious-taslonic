#!/bin/sh

rm -rf ./dist
rm -rf ./react
rm -rf ./vue
rm ./taslonic.css
NODE_ENV=production npm run build
cp -r ./dist/react ./react
cp -r ./dist/vue ./vue
cp ./dist/taslonic.css ./taslonic.css
