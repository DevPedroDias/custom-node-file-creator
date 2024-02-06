const fs = require("fs");
const { execSync, spawnSync } = require("child_process");
const path = require("path");

const commandOptionsMap = {
  init: { method: init, hasParams: false },
  "create:model": { method: createModel, hasParams: true },
  "create:controller": { method: createController, hasParams: true },
};

const configFilePath = "./custom-creator.json";
const executorsPath = `${__dirname}/../executors/`;

const configFileContent = {
  rootDir: "src/",
  controllerDirPath: "controller/",
  modelDirPath: "model/",
  fileType: "JS",
};

function writeConfigFile(filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(configFileContent));
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
  const command = `bash ${executorsPath}model-creator.sh ${fileName}`;
  execSync(command);
}

function createController(fileName) {
  const command = `bash ${executorsPath}controller-creator.sh ${fileName}`;
  execSync(command);
}

function prepareInit() {
  const child = spawnSync("bash", [`${executorsPath}init.sh`], {
    stdio: "inherit",
    encoding: "utf-8",
  });
  const tmpFileLocation = `${executorsPath}tmp/init_choose.txt`;
  if (child.error || child.status !== 0) {
    console.error(
      "Erro ao executar o script shell:",
      child.error || child.stderr
    );
    process.exit(1);
  }

  const data = fs.readFileSync(tmpFileLocation, "utf8");
  deleteFile(`${executorsPath}tmp`);
  return data.trim();
}

function init() {
  const bashResponse = prepareInit();
  console.log(bashResponse);
  if (!bashResponse.length) {
    return console.error("Please, select a file type");
  } else {
    const command = `touch ${configFilePath}`;
    configFileContent.fileType = bashResponse;
    spawnSync("bash", ["-c", command], { stdio: "inherit" });
    writeConfigFile(configFilePath);
    console.log("Initialized with success");
  }
}

function callCreator(command, ...args) {
  if (!command) return console.error("command not valid!");
  const { method, hasParams } = commandOptionsMap[command];
  if (hasParams) {
    isInitialized();
    method(args);
  } else {
    method();
  }
}

function isInitialized() {
  if (!fs.existsSync(configFilePath))
    console.error("lib is not initialized or config file its not on root");
  return false;
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

function deleteFile(path) {
  const command = `rm -r ${path}`;
  execSync(command);
}

module.exports = {
  checkArgument,
  callCreator,
};
