var libreriaPalabras = new Array("aristocracia","biodegradable","cuaternario","decodificar","emoticono","focalizar","galvanometro","hemisferio","ingenioso","jurasico","karateca","limosna","momificada","neardental","odisea","pentaculo","quesadilla","resonancia","sarcasmo", "tolerancia","universal","vulnerable","windows","xilofono","yoduro","zoologia","aplicacion","bucle","compilador","digitalizar","explorador","formulario","georeferenciado","hipervinculo","informatica","javascript","katana","libreria","marcador","navegador","ofimatica","polimorfismo","query","resolucion","sistema","tablas","unidireccional","variable","web","xml","youtube","zip");

var abecedario = "abcdefghijklmnñopqrstuvwxyz";


var app = {
	inicio: function () {
		this.vidas=7;
		this.letras= new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		this.palabra = app.obtienePalabra();

		app.dibujarLetras();
		app.dibujarBotones();
		app.dibujarVidas();
	},
	dibujarVidas: function (){
		var texto="";
		 
		if (app.vidas == 0) texto= "<h3>Lo siento, HAS PERDIDO! Fin de la partida.  <button id='bt-play' onclick='document.location.reload();'><span>Jugar!</span></button></h3>"; 
		else texto= "<h3>Te quedan "+this.vidas+" intentos para averiguar la palabra!</h3>"; 
		
		document.getElementById('horca').innerHTML="<img id='vida' src='img/"+app.vidas+"vidas.jpg'>";		
		document.getElementById('vidas').innerHTML= texto;
	},
	obtienePalabra: function(){
		//obtiene la palabra a adivinar de forma aleatoria
   		var indice = Math.round ( Math.random() * libreriaPalabras.length );
		return new String( libreriaPalabras[indice] );   			
	},
	dibujarBotones: function(){
		for(var i =0; i <abecedario.length; i++) {
			document.getElementById('botones').innerHTML+= 
			"<button id='"+abecedario[i]+"' onclick='app.jugarLetra("+i+");'>"+abecedario[i]+"</button>";
		}
	},
	dibujarLetras: function(){
		var htmlLetras = "";
		var adivinada="";
		for(var i =0; i <app.palabra.length; i++) {
			if (app.letras[i]){ 
				htmlLetras += app.palabra[i]+" ";
				adivinada+=app.palabra[i];
			}
			else{ 
				htmlLetras += "_ ";
				adivinada+="_";
			}
		}
		if (adivinada == app.palabra){
			 document.getElementById('vidas').innerHTML= "<h3>Enhorabuena, HAS GANADO! Fin de la partida.  <button id='bt-play' onclick='document.location.reload();'><span>Jugar!</span></button></h3>";
			 app.vidas = 0;
		}
		document.getElementById('palabra').innerHTML="<h1>"+htmlLetras+ "</h1>";
	},
	jugarLetra: function(iLetra){
		var acierto = false;
		if (app.vidas > 0){
			for(var i =0; i<app.palabra.length; i++) {
				if (app.palabra[i] == abecedario[iLetra]){
					acierto=true;
					app.letras[i]= 1;
				}			
			}
			if (acierto) app.dibujarLetras();
			else{
				app.vidas -= 1;
				app.dibujarVidas();
			}
			document.getElementById(abecedario[iLetra]).className="disabled";
			document.getElementById(abecedario[iLetra]).onclick="";
		}
	}
}

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', 
		function () { app.inicio();},
		 false);
}