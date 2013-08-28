/*
Widget basado en http://www.erichynds.com/blog/tips-for-developing-jquery-ui-widgets

Autor: Esmit Pérez 
Twitter: @esmitperez
Fecha: Jun 2013

Copyright (c) 2013 Esmit Pérez (@esmiterez)
http://www.apache.org/licenses/LICENSE-2.0

*/

( function( $ ) {
    // The jQuery.aj namespace will automatically be created if it doesn't exist
    $.widget( "esmitperez.MapaCR", {
	
        // These options will be used as defaults
        options: { 
		listaDistritos	: {},
		arbolDistritos	: {},
		distritosGAM	: {},
		colores		: ["#1AF161","#6F216C", "#F34B0D","#C50102", "#5DA537", "#F1D81B", "#A1D81B"],
		className 	: "CRMap",
		debug		: true
	},

        _create: function() {
		$.ui.dialog.instances.push(this.element);
		$this = this;

		
		$.each(distritos_costa_rica,function(key,value){
			$this.options.listaDistritos[value.cod] = value;
			$this._insertToTree(value.cod,value)
		});

		this._debug($this.options.arbolDistritos);

		// todos los elementos <path>, marcados con la clase "distrito"
	    	$("path.distrito")
			.mouseenter(function() {
				var coddist = ""+($(this).attr("description_kml"));
				var coddistValue = coddist.split(",")[0];
				$this._debug($this.options.listaDistritos[coddist.split(",")[0]]);

				$(".dist_"+coddistValue).css('fill',$this._colorAlAzar());

				$this._encenderCanton($this.options.listaDistritos[coddistValue]); 
			})
		   
			.mouseleave(function(){
				//$(this).css('fill','#000');
			
				var coddist = ""+($(this).attr("description_kml"));
				var coddistValue = coddist.split(",")[0];
				$(".dist_"+coddistValue).css('fill',"black");
			
				//apagarCanton($(this).attr("coddist"));
			});
        },
        // Keep various pieces of logic in separate methods
        filter: function() {
            // Methods without an underscore are "public"
        },

	pintarTodo: function(fnOptions){
		this._debug("Pintando Todo");
		this.pintarMapa({
			distritos:	this.options.listaDistritos,
			colorAlAzar:	fnOptions.colorAlAzar,
			colores:	fnOptions.colores,
			usarAnimacion: 	fnOptions.usarAnimacion
		});
		this._debug("Todo Pintado");
	},


	pintarMapa: function (fnOptions) {
		$this = this;

		// set up default options 
		var defaults = { 
			distritos:	$this.options.listaDistritos, 
			colorAlAzar: 	false, 
			colores: 	"red", 
			usarAnimacion: 	false,
			filtro: {},
		}; 

		// Overwrite default options 
		// with user provided ones 
		// and merge them into "fnOptions". 
		var fnOptions = $.extend({}, defaults, fnOptions); 

		if (! $.isEmptyObject(fnOptions.filtro)){
			fnOptions.distritos = $this._buscarDistritos(fnOptions.filtro);
			console.log(fnOptions.distritos.length)
		}

		if (fnOptions.usarAnimacion){
			var lastItem = 0;
			var keys = [];
			for (var key in fnOptions.distritos) {      
				if (fnOptions.distritos.hasOwnProperty(key)){
					keys.push(key)
				};
			}

			this._debug("Usando animación");
			function frame() {
				color = fnOptions.colorAlAzar? $this._colorAlAzar(): fnOptions.colores;
				$(".dist_"+(fnOptions.distritos[keys[lastItem]].cod)).css('fill',color);
				lastItem++;
				if (lastItem >= keys.length)  // check finish condition
					clearInterval(id)
			}
			
			if (keys.length>0){	                
		       		var id = setInterval(frame, 5) // draw every 10ms
			}

		}else{
			this._debug("Sin animación");
			
			$.each(fnOptions.distritos, function(distId,distrito){
				var color = fnOptions.colorAlAzar? $this._colorAlAzar(): fnOptions.colores;

				$(".dist_"+(distrito.cod)).css('fill',color);
			});
		}                  
	},


	_buscarDistritos: function (filtro){
		$this = this;	

		$this._debug("filtro.lista");
		$this._debug(filtro.lista);

		var resultados = {};
		
		// recorra TODOS los distritos, y compare contra CADA distrito en lista filtro.
		$.each($this.options.arbolDistritos, function(provId,provincia){
	
			$.each(filtro.lista, function(key, value){
				var toCompare = $this._obtainHash(value+"");
				$this._debug(toCompare);
				
				pId = parseInt(provId,10);
				
				$.each($this.options.arbolDistritos[toCompare.p],function(cantonId,canton){
					if (toCompare.c == cantonId || toCompare.c == "" || toCompare.c == null){
						$.each(canton,function(distId,distrito){
							if (toCompare.d == distId || toCompare.d == "" || toCompare.d == null){
								resultados[distrito.cod] = distrito;
							}		
						});
					}		
				});

			});

		});
		
		this._debug("resultados busqueda");
		this._debug(resultados);

		return resultados;
	},

	_colorAlAzar: function (){
		var pick = Math.floor(Math.random()*7);
		return this.options.colores[pick];
	},

	_obtainHash: function (id){
		// 10102
		// ^------ 0, get 1 = 1
		//  ^----- 1, get 2 = 01
                //    ^--- 3, get 2 = 02
		this._debug(id);
		pn = id.substr(0,1);
		cn = id.substr(1,2);
		dn = null;		
		if (id.length >= 3){
			dn = id.substr(3,2);
		}
		return {p:pn,c:cn,d:dn};
	},
	
	_insertToTree: function (id,obj){
		idKey = this._obtainHash(id+"");
		var arbol = this.options.arbolDistritos;
		if (arbol[idKey.p] == null){
			arbol[idKey.p] = {};
		}
		if (arbol[idKey.p][idKey.c] == null){
			arbol[idKey.p][idKey.c] = {};
		}
		arbol[idKey.p][idKey.c][idKey.d] = obj;
	},

	_encenderCanton: function (distInfo){
		//$("#"+cId).css("fill","cornflowerblue");
		//$(".etiq_dist_nombre[coddist='"+cId+"']:first").css("visibility","visible");
		//alert("etiq_dist_"+cId);
		$("#nombre_prov").html(distInfo.p);
		$("#nombre_canton").html(distInfo.c);
		$("#nombre_distrito").html(distInfo.d);
	},

	_apagarCanton: function (cId){
		$("#"+cId).css("fill","#ddd");
		$(".etiq_dist_nombre[coddist='"+cId+"']").css("visibility","hidden");
	},


        _setOption: function( key, value ) {
            // Use the _setOption method to respond to changes to options
            switch( key ) {
                case "length":
                    break;
            }
            // and call the parent function too!
            return this._superApply( arguments );
        },

        _destroy: function() {
            	// Use the destroy method to reverse everything your plugin has applied
		// the DOM element associated with this instance
		var element = this.element;

		// the index, or location of this instance in the instances array
		var position = $.inArray(element, $.ui.dialog.instances);

		// if this instance was found, splice it off
		if(position > -1){
		$.ui.dialog.instances.splice(position, 1);
		}
            	return this._super();
        },

	_debug: function (msg){
		if (this.options.debug){
			console.debug(msg)
		}
	},
    });

	// extend $.ui.dialog, adding a public "instances" property
	$.extend($.ui.dialog, {
	instances: []
	});
})( jQuery );

