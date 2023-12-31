#!/usr/bin/bash

# Run command twice to ensure correct export of actual files instead of index
for i in {1..2}; do
	npx barrelsby --delete --location replace --singleQuotes
done
