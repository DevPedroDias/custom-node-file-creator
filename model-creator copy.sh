#!/bin/bash

# createDomainModel.sh
# cria um arquivo de dominio de modelo customizado

if [ "$#" -ne 1 ]; then
    echo "Erro: Forneça o nome do arquivo como argumento."
    exit 1
fi

touch "$1.controller.ts"
echo "Arquivo $1.controller.ts criado com sucesso."
