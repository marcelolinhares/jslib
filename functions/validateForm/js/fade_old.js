// mem?ria que empilhar? os fades setados pela recurs?o
	MEMORY_BUFFER = 0
	
	var fadeArray = []
	var saidaPage = ""
	var fadeCont  = []

	/**
	 *	Cria um efeito de FadeIn (transpar?ncia no objeto aparecendo) e fadeOut (transpar?ncia no objeto sumindo)
	 *  @author: Marcelo Linhares - marcelo.linhares@idle.com.br
	 *	@param: Object obj : Objeto que ter? o efeito atribu?do
	 *  @param: Integer valueAlpha: Valor do alpha (0 = 100% transparente, 1 = sem transpar?ncia )
	 *  @param: Integer velocity: Velocidade do alpha
	 */
	function startAlpha(objectFadeID,valueAlpha,velocityAlpha,typeFade){	
		
		alert("alpha -> " + valueAlpha)	 
		/**
		 * Condi??o de parada da recurs?o
		 */ 
		if(valueAlpha == 100 || valueAlpha == 0){
			if(!document.all){ // Gecko
				if(typeFade =="in"){
					document.getElementById(objectFadeID).style.MozOpacity= 1
				}
				else {
					document.getElementById(objectFadeID).style.MozOpacity= 0
				}
				//alert(MEMORY_BUFFER)
			}
			else { // I.E
				
				if(typeFade =="in"){
					document.getElementById(objectFadeID).style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100);"	
				}
				else {
					document.getElementById(objectFadeID).style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0);"	
				}
			}	
			return 0
		} 
		else {
			
			colorIE   	  = valueAlpha // ie
		    colorFIREFOX  = valueAlpha/100
		    
		   // alert("colorIE-> " + colorFIREFOX) 
		    
		 
			
			
			if(!document.all) { // se for Gecko, opacidade = nova cor
				document.getElementById(objectFadeID).style.MozOpacity= colorFIREFOX	
			}
			else { // se for I.E
				document.getElementById(objectFadeID).style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+ colorIE +");"	
			}
			
			
			if(typeFade =="in"){
				valueAlpha++
			} else {
				valueAlpha--
			}
			
			fadeCont[MEMORY_BUFFER++] = setTimeout("startAlpha('"+objectFadeID+"',"+ valueAlpha +","+velocityAlpha+",'" + typeFade + "')",velocityAlpha)
		} // fim da recurs?o
	} // startAlpha()
	
	function fadeIn(objectID,velocityAlpha){ 
		startAlpha(objectID,0,velocityAlpha,"in")
	}
	
	function fadeOut(objectID,velocityAlpha){ 
		startAlpha(objectID,100,velocityAlpha,"out")
	}