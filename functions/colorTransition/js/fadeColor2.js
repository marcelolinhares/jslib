idle_Effects = {
	/****************************
		Atributos publicos
	*****************************/
	idObjectEffect: Object(),
	velocity:'1',
	contEffect: 0,
	__GLOBAL__: 0,
	__GLOBALOUT__: 0,
	/****************************
		Metodos e Funcoes
	*****************************/
	
	/******** EFEITO FADE COLOR *************/
	fadeColor: function(objectFade,startColor,endColor,velocity){
		this.velocity = velocity
		startColor = startColor.split("|")
		endColor = endColor.split("|")
	
		/* ---- Recebendo o RGB da cor inicial ---- */
		 startColorRed   = startColor[0];
		 startColorGreen = startColor[1]
		 startColorBlue  = startColor[2]
		
		/* ---- Recebendo o RGB da cor final ---- */
		 endColorRed   = endColor[0]
		 endColorGreen = endColor[1]
		 endColorBlue  = endColor[2]
		
		/* ---- Condicaoo de parada da recursao ---- */
		if(startColorRed == endColorRed && startColorGreen == endColorGreen && startColorBlue == endColorBlue){
			return 0
		}
		
		/* ---- Consistencia de cores -----  */
		/* --- Cor vermelha ---- */
		if(eval(startColorRed) > eval(endColorRed)){
			startColorRed--
		}
		else if(eval(startColorRed) < eval(endColorRed)) {
			startColorRed++
		}
		/* ---- Cor verde ----- */
		if(eval(startColorGreen) > eval(endColorGreen)){
			startColorGreen--
		}
		else if(eval(startColorGreen) < eval(endColorGreen)) {
			startColorGreen++
		}
	
		/* ----- Cor azul ----- */
		if(eval(startColorBlue) > eval(endColorBlue)){
			startColorBlue--
		}
		else if(eval(startColorBlue) < eval(endColorBlue)) {
			startColorBlue++
		}
		color = "rgb("+startColorRed+","+startColorGreen+","+startColorBlue+")"
		document.getElementById(objectFade).style.backgroundColor = color
		
		
		/* Criando as cores */
		stringStartColor =  startColorRed + "|" + startColorGreen + "|" + startColorBlue
		stringEndColor = endColorRed + "|" + endColorGreen + "|" + endColorBlue 
		
		this.__GLOBAL__ = setTimeout("idle_Effects.fadeColor( '" + objectFade + "' , '"+stringStartColor + "','" + stringEndColor + "', " + velocity + ")",velocity)

	},
	
	/******** EFEITO FADE COLOR *************/
	fadeColorOut: function(objectFade,endColor,velocity){
		this.velocity = velocity
		clearTimeout(this.__GLOBAL__) // retira o efeito anterior
		stringStartColor =  startColorRed + "|" + startColorGreen + "|" + startColorBlue
		stringEndColor = endColor
		idle_Effects.fadeColor(objectFade , stringStartColor , stringEndColor,velocity)
	}		
}