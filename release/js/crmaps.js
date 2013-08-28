/*
Autor: Esmit Pérez 
Twitter: @esmitperez
Fecha: Jun 2013

Copyright (c) 2013 Esmit Pérez (@esmiterez)
http://www.apache.org/licenses/LICENSE-2.0
*/

$( document ).ready(function() {
$(function() {

	$("#nombre_prov").html("Provincia");
	$("#nombre_canton").html("Canton");
	$("#nombre_distrito").html("Distrito");

	
	$("#btn1").html("Alajuela");
	$("#btn2").html("Todo Animado");
	$("#btn3").html("Todo Un Solo Color");
	$("#btn4").html("Alajuela y Cartago");
	$("#btn5").html("GAM");

	$("#datos").MapaCR();


	// *************************************************
	
	$("#btn1").click(function(){	
		$("#datos").MapaCR("pintarMapa",{filtro:{lista:[2]}});
	});


	$("#btn2").click(function(){
		$("#datos").MapaCR("pintarTodo",{colorAlAzar:true,colores:"blue",usarAnimacion:true});
	});

	$("#btn3").click(function(){
		$("#datos").MapaCR("pintarTodo",{colorAlAzar:false,colores:"green"});	
	});

	$("#btn4").click(function(){	
		$("#datos").MapaCR("pintarMapa",{
			filtro:{lista:["3","2"]}, // pinte las provincias 3 y 2
			usarAnimacion:true, // pinte cada distrito en forma separada
			colorAlAzar:true, // pinte cada distrito de un color distinto
			colores:"yellow" // ignorado pq colorAlAzar = true
		});
	});


	$("#btn5").click(function(){	
		$("#datos").MapaCR("pintarMapa",{
			//filtro: {lista:["5","6","7"]}, 
			filtro: {lista: distritos_GAM}, 
			usarAnimacion:true, 
			colores: "#99CC00" // ahora si se usa
		});
	});


});
});

