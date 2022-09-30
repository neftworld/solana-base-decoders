#!/bin/bash
rm -rf dist && yarn && yarn build && npm publish --access public
