#!/bin/bash
cd /home/ubuntu/app
echo "CD Realizado"
npm install
npm install --save react react-dom react-scripts react-particles-js
npm install pm2 -g
echo "Instalações concluídas com sucesso"
sudo mv /home/ubuntu/app/build /var/www/observador/ 
echo "Atualizando Servidor com Novos Arquivos"
sudo rm -r /home/ubuntu/app/
echo "Limpando Pasta do Build"