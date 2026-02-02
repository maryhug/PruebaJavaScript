- Token:
  - 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


- Front
  - https://www.figma.com/design/K3PmKIOlfEsjnbwP54Yc2x/Sin-t%C3%ADtulo?node-id=33-2&p=f


- git config --global --unset user.name
- git config --global --unset user.email


- git config --global user.name ""
- git config --global user.email ""



## Actualizar Node.js a 20 o 22

1. Instalar nvm (si no lo tienes):
   1. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

2. source ~/.bashrc

3. Instalar Node 22
   1. nvm install 22
   2. nvm use 22

4. Verifica:
   1. node -v

5. Limpiar e instalar dependencias de nuevo (importante)
   1. rm -rf node_modules package-lock.json
   2. npm install
   3. npm run dev