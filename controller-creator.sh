#!/bin/bash

# createDomainModel.sh
# cria um arquivo de dominio de modelo customizado

if [ "$#" -ne 1 ]; then
    echo "Erro: Forneça o nome do arquivo como argumento."
    exit 1
fi

entity=$1
fileName="$1.controller.ts"
touch "$fileName"

echo "type ${entity}Properties = {
    id: string
    name: string
    members: User[]
}
export default class $entity {

}" > "$fileName"
echo "Arquivo $fileName criado com sucesso."
