# Custom Creator 🚀

![Versão](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Licença](https://img.shields.io/badge/license-MIT-green.svg)

Custom Creator é uma ferramenta de linha de comando desenhada para acelerar o desenvolvimento de aplicações, permitindo a rápida criação de modelos e controladores com base em configurações definidas pelo usuário.

## 🌟 Início Rápido

Este guia assume a pré-instalação do Node.js e npm.

### 🛠 Instalação

Intale a biblioteca em seu projeto:

```bash
npm install custom-node-file-creator
```

## ⚙ Configuração

Inicialize a ferramenta no seu projeto com:

```
npx custom-node-file-creator init
```

Isso gera um custom-creator.json no seu projeto com configurações iniciais.

## 📚 Uso

Comandos disponíveis:

init: Prepara a ferramenta para uso no projeto.</br>
create:model <nome>: Cria um modelo.</br>
create:controller <nome>: Cria um controlador.

Criar um modelo:

```
npx custom-node-file-creator create:model MeuModelo
```

Criar um controlador:

```
npx custom-node-file-creator create:controller MeuControlador
```

## 🛠 Configuração Avançada

Edite custom-creator.json para personalizar configurações:

rootDir: Diretório raiz para criação de arquivos.</br>
controllerDirPath: Onde os controladores serão salvos.</br>
modelDirPath: Onde os modelos serão salvos.</br>
fileType: Tipo de arquivo (JS ou TS).

📂 Scripts de Criação
Localizados em executors, esses scripts definem templates de arquivos. Sinta-se livre para ajustá-los.

🤝 Contribuindo
Contribuições, questões e solicitações de pull são bem-vindas!
