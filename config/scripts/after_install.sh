#!/bin/bash
cd /home/ubuntu/app
echo "CD Realizado"
sudo mv /home/ubuntu/app/build /var/www/observador/ 
echo "Atualizando Servidor com Novos Arquivos"
sudo rm -r /home/ubuntu/app/
echo "Limpando Pasta do Build"