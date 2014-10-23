Autor: Esmit Pérez 
Twitter: @esmitperez
Fecha: Jun 2013

Copyright (c) 2013 Esmit Pérez (@esmiterez)
http://www.apache.org/licenses/LICENSE-2.0

Release Notes
=============

0.01:
- Despliega mapa de todos los distritos del país
- API permite escoger (filtrar) con granularidad de provincia, canton, o
- distrito
- API permite personalizar colores y uso de animación
- Mapa expone datos sobre distrito apuntado en ese momento


Futuras Versiones
=================

- Compatibilidad con jvectormap/jvqmap
- Reimplementacion de base de datos en HTML5
- Reducción del tamaño del .svg (depende de los mapas fuentes)


Personalizacion (opcional)
==========================

- Modifique header y footer snippet conforme lo necesite
- Corra bin/make.sh para generar los archivos necesarios en el folder "release"
- Cambios de look/comportamiento pueden ser realizados en los .css y .js


User Guide
==========

Ponga el mapa en formato <svg> en un <div> e invoque .MapaCR() para activar el widget.
Vea el código de ejemplo en /src/js/crmapa.js

Historia y créditos
===================

tl;dr
 
   .shp >> .kml >> .svg >> .html+.js :)


Una tarde de verano (texano) me dí cuenta que no existía un mapa detallado interactivo de los distritos de Costa Rica. Si uno quiere ver, qué se yo, los cantones o distritos más pobres y ricos del país, no se puede.

El geógrafo del ICE Carlos Castillo Alfaro  puso en ARCGIS un [ShapeFile](http://www.arcgis.com/home/item.html?id=29462fe665444063b69ac35fa82f4bc0) con justo los datos que necesitaba, sin embargo esto no sirve en un browser de manera nativa.

Tomé ese .shp file y lo convertí a KML (famoso por ser usado en Google Earth) usando [Shp2kml 2.0](http://www.zonums.com/shp2kml.html) utilizando Zona UTM 14 (eso es lo que internet dice para CR) y dejando los defaults restantes.

Posterior a obtener el .kml lo convertí a .svg usando [IndieMapper](http://indiemapper.com) y usando inspección visual para darle el look final que quería. Una vez obtenido el .svg lo "limpié" usando `bin/cleanKML.sh` para disminuir el tamaño y convertir los atributos a algo usable en .svg.

Una vez obtenido el .svg pues era ya cuestión de "pegarlo" con jQuery.

Enjoy.  

Wikipedia
=========

Si se necesita el .svg original lo he hecho disponible en:

[Archivo SVG](http://commons.wikimedia.org/wiki/File:Mapa_de_Distritos_de_Costa_Rica_(alta_definici%C3%B3n),_formato_SVG.svg)

[Distritos de CR](http://es.wikipedia.org/wiki/Distritos_de_Costa_Rica)

