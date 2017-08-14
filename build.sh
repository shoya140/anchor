#!/bin/sh

# https://github.com/koba04/react-fiber-resources
yarn add react@next react-dom@next
sed -i -e 's/fiberAsyncScheduling: false/fiberAsyncScheduling: true/' node_modules/react-dom/cjs/react-dom.development.js
yarn run build:dist
