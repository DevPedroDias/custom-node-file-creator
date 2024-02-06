#!/bin/bash
echo 'Preparando criacao'

fileName=''
rootPath='defaultRootPath'
localFilePath='defaultLocalFile'

while getopts ":f:s:c" opt; do
  case $opt in
    f)
      fileName="$OPTARG"
      fileName_required=true
      ;;
    s)
      rootPath="$OPTARG"
      ;;
    c)
      localFilePath='customLocalFile'
      ;;
    \?)
      echo "Opção inválida: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Verificar se fileName foi fornecido
if [ -z "$fileName" ]; then
  echo "A opção -f (fileName) é obrigatória."
  exit 1
fi

echo "fileName: $fileName"
echo "rootPath: $rootPath"
echo "localFilePath: $localFilePath"