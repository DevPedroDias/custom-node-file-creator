const fs = require("fs");
const { execSync } = require("child_process");

const commandOptionsMap = {
  init: { method: init, hasParams: false },
  "create:model": { method: createModel, hasParams: true },
  "create:controller": { method: createController, hasParams: true },
};

const configFilePath = "./custom-creator.json";

function writeConfigFile(filePath) {
  const content = `{
    "rootDir": "src/",
    "controllerDirPath": "controller/",
    "modelDirPath": "model/"
  }`;

  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`error on init lib ${error.message}`);
  }
}

function checkArgument(index, name, command) {
  if (!process.argv[index] && command !== Object.keys(commandOptionsMap)[0]) {
    console.error(`Erro: O argumento '${name}' é obrigatório.`);
    process.exit(1);
  }
}

function createModel(fileName) {
  const command = `bash ./executors/model-creator.sh ${fileName}`;
  execSync(command);
}

function createController(fileName) {
  const command = `bash ./executors/controller-creator.sh ${fileName}`;
  execSync(command);
}

function init() {
  const command = `touch ${configFilePath}`;
  execSync(command);
  writeConfigFile(configFilePath);
  console.log("intiliazed with success");
}

function callCreator(command, ...args) {
  if (!command) return console.error("command not valid!");
  const { method, hasParams } = commandOptionsMap[command];
  if (hasParams) {
    isInitialized() || method(args);
  } else {
    method();
  }
}

function isInitialized() {
  if (!fs.existsSync(configFilePath))
    return console.error(
      "lib is not initialized or config file its not on root"
    );
}

function getConfigFileContent() {
  try {
    isInitialized();
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`error to read config file`);
  }
}

module.exports = {
  commandOptionsMap,
  checkArgument,
  writeConfigFile,
  callCreator,
};
