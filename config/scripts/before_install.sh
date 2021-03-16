#!/bin/bash
cd /home/ubuntu/app
echo "Cd realizado com Sucesso"
sudo cp -R /var/www/observador /home/ubuntu/app/$(date +'%Y-%m-%d-%T')
echo "BackUp do Fonte Anterior Salvo em: /home/ubuntu/api/"$(date +'%Y-%m-%d-%T')
sudo rm -rf /var/www/observador/ 
echo "Limpando Pasta do Servidor"w