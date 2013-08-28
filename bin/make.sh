#!/bin/bash
#Autor: Esmit Pérez 
#Twitter: @esmitperez
#Fecha: Jun 2013
#
#Copyright (c) 2013 Esmit Pérez (@esmiterez)
#http://www.apache.org/licenses/LICENSE-2.0

# Usar el mapa de mas baja resolución (low) el otro genera 18MB....
rm -fr release
mkdir release
cp -av src/js src/lib src/css release
cat src/snippets/header.snippet src/svg/CRMapaHTML.low.svg src/snippets/footer.snippet > release/mapa.html
