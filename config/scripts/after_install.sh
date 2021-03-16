#!/bin/bash
cd /home/ubuntu/app
echo "CD Realizado"
npm install
npm install --save react react-dom react-scripts react-particles-js
npm install pm2 -g
echo "Instalações concluídas com sucesso"