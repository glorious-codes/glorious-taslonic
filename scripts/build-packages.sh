#!/bin/sh

function init {
  clear_distributables
  build_css
  build_js
  copy_css
}

function clear_distributables {
  rm -rf ./packages/base/dist
  rm -rf ./packages/react/dist
  rm -rf ./packages/vue/dist
}

function build_css {
  NODE_ENV=production npm run build -w=packages/base
}

function build_js {
  NODE_ENV=production npm run build -w=packages/react -w=packages/vue
}

function copy_css {
  cp ./packages/base/dist/taslonic.css ./packages/react/dist/taslonic.css
  cp ./packages/base/dist/taslonic.css ./packages/vue/dist/taslonic.css
}

init
