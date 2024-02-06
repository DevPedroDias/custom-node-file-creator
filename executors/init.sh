#!/bin/bash

options=("JavaScript" "TypeScript" "Sair")
selectedOption=0
finalChoose=''
tempFilePath="./tmp/init_choose.txt"
tempFileDir=$(dirname "$tempFilePath")

trap 'tput sgr0' EXIT  # Restaura a cor ao sair do script

while true; do
  clear
  echo "Selecione uma opção:"
  for i in "${!options[@]}"; do
    if [ $i -eq $selectedOption ]; then
      tput setaf 2  # texto verde
      echo " > ${options[i]}"
    else
      tput sgr0     # restaurar cor
      echo "   ${options[i]}"
    fi
  done

  read -s -n 1 key
  case $key in
    "A")
      # Seta para cima
      selectedOption=$(( (selectedOption - 1 + ${#options[@]}) % ${#options[@]} ))
      ;;
    "B")
      # Seta para baixo
      selectedOption=$(( (selectedOption + 1) % ${#options[@]} ))
      ;;
    "")
      # Enter
      clear
      case $selectedOption in
        0)
          finalChoose="JS"
          break
          ;;
        1)
         finalChoose="TS"
          break
          ;;
        2)
          echo "Saindo..."
          exit 0
          ;;
      esac
      ;;
  esac
done

if [ ! -e "$tempFileDir" ]; then
  mkdir -p "$tempFileDir"
fi


echo $finalChoose > $tempFilePath