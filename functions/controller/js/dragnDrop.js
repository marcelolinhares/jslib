
Object.prototype.Top = function(){
				result = 0;
				idObj2 = this
				while(idObj2){
					result += idObj2.offsetTop	
					idObj2 = idObj2.offsetParent
				}
				return result
}
	
Object.prototype.Left = function(){
				result = 0;
				idObj2 = this
				while(idObj2){
					result += idObj2.offsetLeft
					idObj2 = idObj2.offsetParent
				}
				return result
}

dragnDrop = function() {
	this.set = setDrag	

}

// fun??o para setar dragnDrop do objeto destino e origem
function setDrag(idOrigem, idDestino, functionParameter){
	/* recebendo os objetos pelo ID */
	var calc = document.getElementById(idOrigem)
	var lixo = document.getElementById(idDestino)
	
	this.mouseXant = "-999"
	this.mouseYant = "-999"
	
	var flagObject = true

	calc.onmousedown = function() {
		//alert("clicado")
		//	if(flagObject){
				document.onmousemove=function(e){			
									var lixoss = lixo
	
									if(document.all){ // se for IE
												movX = event.clientX 
												movY = event.clientY
												object = event.srcElement
												
												// recebendo propriedades dos elementos destino e origem
												lixoX = lixoss.offsetLeft // recebe o valor de X do elemento condi??o
												lixoXFinal = (lixoX + lixoss.offsetWidth)
												lixoY= lixoss.offsetTop  // recebe o valor de Y do elemento condi??o
												lixoYFinal = (lixoY + lixoss.offsetHeight ) 
												calcLeft = calc.offsetLeft
												calcTop = calc.offsetTop
												
									}else{ // se for Mozilla
												movX = e.clientX 
												movY = e.clientY
												object = e.target
												
												// recebendo propriedades dos elementos destino e origem
												lixoX = lixoss.Left() // recebe o valor de X do elemento condi??o
												lixoXFinal = (lixoX + lixoss.offsetWidth)
												lixoY= lixoss.Top()  // recebe o valor de Y do elemento condi??o
												lixoYFinal = (lixoY + lixoss.offsetHeight ) 
												calcLeft = calc.Left()
												calcTop = calc.Top()
									}
								
									
									// detalhe do mouse
									document.getElementById('x').value = movX
									document.getElementById('y').value = movY
									
									// definindo posicionamento do objeto 
									calc.style.position = "absolute"
									calc.style.cursor = "move"
	
									calc.style.left = (movX - (calc.offsetWidth/2))   + "px"
									calc.style.top = (movY - (calc.offsetHeight/2)) + "px"
									
									 // Se o objeto origem estiver sob o objeto destino, altera o background  do objeto
									 if( (lixoX < calcLeft) && ( calcLeft < lixoXFinal ) &&  (lixoY < calcTop ) &&  ( calcTop < lixoYFinal) )  {							 
													lixoss.style.backgroundColor = "#CCC"
									 }
									 else {
										lixoss.style.backgroundColor = ""
									 }
									
									
									calc.onmouseup = function(){ 
												document.onmousemove = function() { 
													// (flagObject==true) ? flagObject = false : flagObject = true
													return false
												 } 
												 if( (lixoX < calcLeft) && ( calcLeft < lixoXFinal ) &&  (lixoY < calcTop ) &&  ( calcTop < lixoYFinal) )  {
													functionParameter()
												 } 
												 
												 
									} // fim do onmouseup
							} // fim do document.onmousemove
		//	} // fim do if flagObject
} // fim do onmousedown
	
	
} // fim da fun??o setDrag