#!/usr/bin/env node
const { execSync } = require("child_process");

const command = process.argv[2];

switch (command) {
  case "create:model":
    createModel(3, "fileName");
    createFileX(process.argv[3]);
    break;
  case "create:controller":
    checkArgument(3, "fileName");
    createController(process.argv[3]);
    break;
  case "init":
    init();
    break;
  default:
    console.error("Comando não reconhecido");
    break;
}

function checkArgument(index, name) {
  if (!process.argv[index]) {
    console.error(`Erro: O argumento '${name}' é obrigatório.`);
    process.exit(1);
  }
}

function createModel(fileName) {
  const command = `bash ${__dirname}/model-creator.sh ${fileName}`;
  execSync(command);
}

function createController(fileName) {
  const command = `bash ${__dirname}/controller-creator.sh ${fileName}`;
  execSync(command);
}

function init() {
  const command = `bash ${__dirname}/init.sh`;
  execSync(command);
}
