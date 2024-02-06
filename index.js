#!/usr/bin/env node
const { checkArgument, callCreator } = require("./config/config.js");

const command = process.argv[2];
const fileName = process.argv[3] || null;

checkArgument(3, "fileName", command);

callCreator(command, fileName);
