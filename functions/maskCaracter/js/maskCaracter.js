/*
 *	Mascaras de caracteres para inputs
 *  @author: Marcelo Linhares
 *  @date: 01/12/2005
 *
 *  Forma de utilizar a classe:
 *
 *	var mascara = new maskCaracter("tool_tip") // onde tool_tip ? o seletor css que irão estilizar o box
 *  mascara.validCaracter("idInput1","idInput2","idInput3") // coloca validação de caracteres nestes inputs
 *  mascara.validNumber("idInput1","idInput2","idInput3") // coloca validação de números nestes inputs 
 */


/* --- funçõees necessárias para tratar diferençaas de posicionamento dos elementos no I.E (como sempre né?) 
 */
function objTop(idObj){
	result = 0;
	while(idObj){
		result += idObj.offsetTop	
		idObj = idObj.offsetParent
	}
	return result
}
function objLeft(idObj){
	result = 0;
	while(idObj){
		result += idObj.offsetLeft
		idObj = idObj.offsetParent
	}
	return result
}

var MESSAGES = " é um caracter inválido para este campo" 
var MESSAGENUMBER = " não é um caracter numérico" 
var FLAGCONTBOX = 0
var FLAGSUCESSMAIL = "true"
var idTimeOutObject
var classBoxTool 

 
/* classe principal */
function maskCaracter(classBox){
	classBoxTool = classBox
	objListTool = new Object()
	this.validCaracter = vCaracter
	this.validNumber   = vNumber
	this.validMail     = vMail
	this.validCurrency    = vCurrency
	this.validMoney    = vMoney
}






/*
 * Author: Marcelo Linhares
 * date: 01/12/2005
 *
 * Validação de caracteres indesejáveis
 *
 *
 */
function vCaracter() {
		for (i=0;i<arguments.length;i++){
			temp = document.getElementById(arguments[i])
			temp.onkeypress = function(e){ 
				// alert("entrou")
				if(FLAGCONTBOX==1){ removeObject(objListTool); clearTimeout(idTimeOutObject)  }
				// pegando o caracter
				(typeof(e)=='undefined') ? valid_caracter = window.event.keyCode : valid_caracter = e.which	
				// recebendo o objeto
				if(document.all){idObj = window.event.srcElement	}
				else {idObj = e.target	}
				
				// lógica de validação
				if((valid_caracter > 32 && valid_caracter < 48) || (valid_caracter > 57 && valid_caracter < 65) || (valid_caracter > 90 && valid_caracter < 97)) {					
						objListTool = document.createElement('span') // cria o box
						objListTool.innerHTML = String.fromCharCode(valid_caracter) + MESSAGES
						definePosition(objListTool,idObj)
						idTimeOutObject = setTimeout("removeObject(objListTool)",1000)
						return false
				} // end if
			} // end keypress
		} // end for
} // end function



 /*
 * Author: Marcelo Linhares
 * date: 01/12/2005
 *
 * Validação de E-mails
 *
 */
function vMail() {
		for (i=0;i<arguments.length;i++){
			temp = document.getElementById(arguments[i])
			temp.onkeypress = function(e){
				if(FLAGCONTBOX==1){ removeObject(objListTool); clearTimeout(idTimeOutObject)  } // se já tiver um box, remove-o
				
			
				
				
				// pegando o caracter digitado
				(typeof(e)=='undefined') ? valid_caracter = window.event.keyCode : valid_caracter = e.which	
				
				
				
				// recebendo o objeto
				if(document.all){idObj = window.event.srcElement	}
				else {idObj = e.target	}
					
				
				// lógica de validação
				if(idObj.value == "") {  // se não tiver nenhum caracter, só pode entrar com letras
			 		if(!((valid_caracter > 64 && valid_caracter < 90) || (valid_caracter > 96 && valid_caracter < 122))){
			 			FLAGSUCESSMAIL = "false"
			 		}
				}
				else if(idObj.value.length<2) {  // se nãoo tiver dois caracteres, não pode entrar com o arroba(@)
					if(!((valid_caracter > 64 && valid_caracter < 90) || (valid_caracter > 96 && valid_caracter < 122) || (valid_caracter > 44 && valid_caracter < 47) || (valid_caracter > 47 && valid_caracter < 58) || (valid_caracter == 0 || valid_caracter==8)) ){
						FLAGSUCESSMAIL = "false"
					}
				}
				else if(idObj.value.indexOf('@')>0){ // se já tiver um caracter de arroba, não permite outra arroba
					if(valid_caracter==64){ 
							FLAGSUCESSMAIL = "false"
					}
				}
				else {
					if(!((valid_caracter > 63 && valid_caracter < 90) || (valid_caracter > 96 && valid_caracter < 122) || (valid_caracter > 44 && valid_caracter < 47) || (valid_caracter > 47 && valid_caracter < 58) || (valid_caracter == 0 || valid_caracter==8) )){
						FLAGSUCESSMAIL = "false"
					}
				}
				
				// lógica de validação
				if(FLAGSUCESSMAIL=="false"){					
							objListTool = document.createElement('span') // cria o box
							objListTool.innerHTML = String.fromCharCode(valid_caracter) + MESSAGES
							definePosition(objListTool,idObj)
							idTimeOutObject = setTimeout("removeObject(objListTool)",1000)
							FLAGSUCESSMAIL = "true"
							return false
				} // end if
			} // end keypress
		} // end for
} // end function

/*
 * Author: Marcelo Linhares
 * date: 01/12/2005
 *
 * Validação de números
 *
 */
function vNumber() {
		for (i=0;i<arguments.length;i++){
			temp = document.getElementById(arguments[i])
			temp.onkeypress = function(e){ 
				if(FLAGCONTBOX==1){ removeObject(objListTool); clearTimeout(idTimeOutObject)  }
				
				// pegando o caracter digitado
				(typeof(e)=='undefined') ? valid_caracter = window.event.keyCode : valid_caracter = e.which	
				
				// recebendo o objeto
				if(document.all){idObj = window.event.srcElement	}
				else {idObj = e.target	}
				
				//alert(valid_caracter)	
				// lógica de validação
				if(!((valid_caracter > 47) && (valid_caracter <58)) && (valid_caracter != 0 && valid_caracter!=8)) {					
							objListTool = document.createElement('span') // cria o box
							objListTool.innerHTML = String.fromCharCode(valid_caracter) + MESSAGENUMBER
							definePosition(objListTool,idObj)
							idTimeOutObject = setTimeout("removeObject(objListTool)",1000)
							return false
				} // end if
			} // end keypress
		} // end for
} // end function


function vCurrency() {
		for (i=0;i<arguments.length;i++){
			temp = document.getElementById(arguments[i])
			temp.onkeypress = function(e){ 
				// se existir caixa de erro, remove-a
				if(FLAGCONTBOX==1){ removeObject(objListTool); clearTimeout(idTimeOutObject)  }
				
				// pegando o caracter digitado
				(typeof(e)=='undefined') ? valid_caracter = window.event.keyCode : valid_caracter = e.which	
				
				// recebendo o objeto
				if(document.all){idObj = window.event.srcElement	}
				else {idObj = e.target	}
				
				//alert(valid_caracter)	
				// lógica de validação
				if(!((valid_caracter > 47) && (valid_caracter <58)) && (valid_caracter != 0 && valid_caracter!=8 && valid_caracter!=44)) {					
							objListTool = document.createElement('span') // cria o box
							objListTool.innerHTML = String.fromCharCode(valid_caracter) + MESSAGENUMBER
							definePosition(objListTool,idObj)
							idTimeOutObject = setTimeout("removeObject(objListTool)",1000)
							return false
				} // end if
			} // end keypress
		} // end for
} // end function




function vMoney() {
	   
 
		for (i=0;i<arguments.length;i++){
			temp = document.getElementById(arguments[i])
			temp.onkeypress = function(e){
			
			
				// se existir caixa de erro, remove-a 
				if(FLAGCONTBOX==1){ removeObject(objListTool); clearTimeout(idTimeOutObject)  }
				
				// pegando o caracter digitado
				(typeof(e)=='undefined') ? valid_caracter = window.event.keyCode : valid_caracter = e.which	
				
				// recebendo o objeto
				if(document.all){idObj = window.event.srcElement	}
				else {idObj = e.target	}
				
				//alert(valid_caracter)	
				// lógica de validação
				
				if(!((valid_caracter > 47) && (valid_caracter <58)) && (valid_caracter != 0 && valid_caracter!=8 && valid_caracter!=44 && valid_caracter!=46)) {					
							objListTool = document.createElement('span') // cria o box
							objListTool.innerHTML = String.fromCharCode(valid_caracter) + MESSAGENUMBER
							definePosition(objListTool,idObj)
							idTimeOutObject = setTimeout("removeObject(objListTool)",1000)
							return false
				} // end if
				else { 
					if(idObj.value=="") { // se o campo está vazio não pode entrar com ponto nem vírgula
						if(!((valid_caracter > 47) && (valid_caracter <58)) && (valid_caracter != 0 && valid_caracter!=8)){
							objListTool = document.createElement('span') // cria o box
							objListTool.innerHTML = String.fromCharCode(valid_caracter) + MESSAGENUMBER
							definePosition(objListTool,idObj)
							idTimeOutObject = setTimeout("removeObject(objListTool)",1000)
							return false
						}
					}
					else {
						if(valid_caracter==44){
							//alert(idObj.value.lastIndexOf(","))
							if(idObj.value.lastIndexOf(",")!=-1){
								objListTool = document.createElement('span') // cria o box
								objListTool.innerHTML = String.fromCharCode(valid_caracter) + MESSAGENUMBER
								definePosition(objListTool,idObj)
								idTimeOutObject = setTimeout("removeObject(objListTool)",1000)
								return false
							} 
						}
					}
				}
			} // end keypress
		} // end for
} // end function

/**
 *	Funções para exibir/retirar box de erro
 */
function removeObject(objListTool){		
			document.body.removeChild(objListTool)
			FLAGCONTBOX = 0
}
	
function definePosition(objListTool,idObj){
				// posicionando o box
				var posX = objLeft(idObj) + "px" // posi??o X
				var posY = objTop(idObj) + idObj.offsetHeight +  "px" // posi??o Y
				objListTool.id 		  = "boxMessage"
				objListTool.style.display   = 'block'
				
				objListTool.style.left = posX
				objListTool.style.top = posY
				objListTool.className = classBoxTool
				objListTool.style.position = "absolute"
				document.body.appendChild(objListTool) 
				FLAGCONTBOX = 1
}




	