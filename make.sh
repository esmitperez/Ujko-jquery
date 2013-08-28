#!/bin/sh
#Autor: Esmit Pérez
#Twitter: @esmitperez
#Fecha: Jun 2013
#
#:::text
#   Copyright 2013 Esmit Pérez
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.
#

# Usar el mapa de mas baja resolución (low) el otro genera 18MB....
rm -fr release
mkdir release
cp -av src/js src/lib src/css release
cat src/snippets/header.snippet src/svg/CRMapaHTML.low.svg src/snippets/footer.snippet > release/mapa.html
