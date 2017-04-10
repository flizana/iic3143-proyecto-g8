# iic3143-proyecto-g8
# Proyecto Desarrollo de Software - Grupo 8

# Instalación

Después de hacer git pull, hay que instalar las siguientes dependencias:

## Mac OSX

En primer lugar, hay que instalar `node-gyp`.

    npm install -g node-gyp
    
Cualquier problema aquí está la ayuda: https://github.com/nodejs/node-gyp#installation

Antes de correr `npm install`, hay que instalar `libvips` via homebrew:

    brew install homebrew/science/vips --with-imagemagick --with-webp

Aquí pueden surgir dos errores:

1) `library not found for -ljpeg`

Para corregirlo basta correr

    xcode-select --install
    
2) `library not found for -lintl`

Para corregirlo basta correr

    brew link gettext --force
    
Cualquier problema aquí está la ayuda: http://sharp.dimens.io/en/stable/install/

## Windows

`libvips` se instala por sí solo al correr `npm install`.
