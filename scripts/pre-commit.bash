#!/usr/bin/bash

npx tsc || exit
npx eslint . || exit
