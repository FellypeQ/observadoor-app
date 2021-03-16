#!/bin/bash
cd /home/ubuntu/app
echo "CD Realizado Com Sucesso"
sudo nginx -t
echo "comando NGINX -t executado com sucesso"
sudo systemctl restart nginx
echo "comando NGINX RESTART executado com sucesso"