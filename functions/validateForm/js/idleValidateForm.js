/************************************************************************************
 *		Classe para Validacao de formularios com ToolTip
 *		@author: Marcelo Linhares - marcelo.linhares@idle.com.br
 *		@Date: 26/09/2005
 *		
 *		Modo de Usar
 *		Basta inserir um link para este javascript dentro da tag <head>:
 *		<script type="text/javascript" src="<%=path.para.a.pasta.htdocs.%>/js/idleValidateForm.js"></script>
 *
 *		No final da pagina adicionar 
 *		<script type="text/javascript">
 *			idleValidateForm("tooltip") // para exibir toolTip nas mensagens de erro
 *			idleValidateForm()			// Sem toolTip
 *		</script>
 *					
 *		
 *
 *		Forma de utilizacao
 *      Campos de preenchimento obrigatorio coloca parametros no atributo class:
 *
 *		O texto do tooltip que aparece juntamento com a mensagem de erro e o valor do atributo title
 *
 *****************************************************
 *		Validacao de textos (type=text)				 *
 *****************************************************
 *		validate_text_not_null	  : O campo texto nao pode ficar vazio
 *		validate_text_only_number : O campo texto so aceita numero
 *		validate_text_only_money  : O campo texto so aceita numero (mais virgula)
 *		validate_text_cpf		  : Valicao de CPF
 *		validate_text_date		  : validacao de data 
 *		validate_text_only_text   : O campo texto somente aceita texto
 *		
 *	
 *
 *****************************************************
 *		Validacao de checkbox (type=checkbox)		 *
 *****************************************************
 * 		Todo o conjunto de checkbox vai estar encapsulado dentro de um fildset (REGRA) 
 *
 *		validate_check_only_1 : Informa que tem que ter somente um campo check marcado
 *		validate_check_only_2 : Informa que tem que ter somente dois campos checks marcados
 *		validate_check_only_n : Informa que tem que ter somente n campos checks marcados
 *		validate_check_min_1  : Informa que tem que ter no m?nimo 1 campo check marcado
 *		validate_check_min_2  : Informa que tem que ter no m?nimo 2 campos checks marcados
 *		validate_check_min_n  : Informa que tem que ter no m?nimo n campos checks marcados
 *
 *
 *
 *****************************************************
 *		Validacao de select (type=select			 *
 *****************************************************
 * 		Todo campo select tem que ter um campo <option> com value igual a "--" (dois menos) que representar? o label do campo, exemplo:
 *
 *		<select name="estado">
 *				<option value="--"> Escolha o Estado </option>
 *
 *		validate_option : Informa que o select ? obrigat?rio
 *
 *
 *
 *****************************************************
 *		Botao Submit								 *
 *****************************************************
 *	O botao submit tem que ter obrigatoriamente um ID="btSubmit"
 *
 *
 *************************************************************************************/

function IdleValidateForm(){	
	var nForms      	  = document.forms.length; // recebe o numero de forms dentro da pagina
	var btSubmit    	  = document.getElementById("btSubmit");
	var tempI, tempJ
	var stackValidate	  = [];      	// array temporaria dos campos obrigatorios
	var cont		      = 0		   	// variavel contadora 
	var toolTipsError     = []
	var contToolTipsError = 0
	
	/**
	 *	Express?es regulares para valida??o de strings
	 */
	var regexOnlyText 	= /[^0-9]/ 		// expressao regular, somente textos
	var regexOnlyNumber = /[^a-z]+[0-9][^a-z]+/   		// expressao regular, somente numeros
	var regexEmail		= ".+@.+\\.[a-z]+" // expressao regular, somente email valido
	var regexDate		= "(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}" // expressao regular, somente data valida (dd/mm/aaaa)
	
	

	
	
	/**
	 *	@author: Marcelo Linhares - marcelo.linhares@idle.com.br
	 *	Retorna se uma variavel contem somente textos
	 *
	 */
	 function isOnlyText(value){
	 		var regexOnlyText 	= /[^0-9]/ 		// expressao regular, somente textos
	 		return value.test(regexOnlyTex)
	 }
	 
	 /**
	 *	@author: Marcelo Linhares - marcelo.linhares@idle.com.br
	 *	Retorna se um campo esta vazio
	 */
	 function isNull(value){
	 		return value==""
	 }
	
	
	try {
		for (var i=0; i < nForms; i++) { // 1 for (percorre os formularios da pagina)
				var form      = document.forms[i]
				var nElements = form.length;
							
				// funcao para validar campos obrigatorios quando o usuario clicar no botao submit
				// validando campos obrigatorios
				form.onsubmit = function(){
						error = true 
						divs = document.getElementsByTagName('fieldset') 
						for(var y=0; y < divs.length ;y++){
							
							if(divs[y].className.indexOf("validate_check_only")>=0){
								numCheck = divs[y].className.split("_");
								checks = divs[y].getElementsByTagName('input')
								contSuccessCheck = 0
								for(f=0;f<checks.length;f++){
									if(checks[f].checked){
										contSuccessCheck++
									}
								}
								if(contSuccessCheck!=numCheck[3]){
									divs[y].className = divs[y].className + " alertFocus"
									error = false
								}
							}
							
							else if(divs[y].className.indexOf("validate_check_only")>=0 || divs[y].className.indexOf("validate_check_min")>=0){
											selectorClass = divs[y].className.split(" ")
											selectorClassTemp = ""
											for(i=0;i<selectorClass.length;i++){
												if(selectorClass[i]!="alertFocus"){
													selectorClassTemp+= " " + selectorClass[i]	
												}
											}
											divs[y].className = selectorClassTemp
							}
						}
						
						for (var z=0; z < nElements; z++) {
								element = form[z]	
							
								/*
								 *	Validacao de campos de texto
								 */
								if (element.type=="text") {
										
										/* Validacao de textos que nao podem ficar em branco  validate_text_not_null */
										if(element.className.indexOf("validate_text_not_null")>=0 && isNull(element.value)){
											error = false
											element.className = element.className + " alertFocus "
											createBoxError(element)
											contToolTipsError++
										}
										
										/* Validacao de textos que so podem conter numeros  validate_text_only_number */
										if(element.className.indexOf("validate_text_only_number")>=0 && element.value.search(regexOnlyNumber)==-1){
												error = false
												element.className = element.className + " alertFocus "
												createBoxError(element)
												contToolTipsError++
										}
										
										/* Validacao de textos que so podem conter texto */
										if(element.className.indexOf("validate_text_only_text")>=0 && element.value.search(regexOnlyText)==-1){
												error = false
												element.className = element.className + " alertFocus "
												createBoxError(element)
												contToolTipsError++
										}
										
										/* Validacao de textos que so podem conter texto */
										if(element.className.indexOf("validate_text_email")>=0 && element.value.search(regexEmail)==-1){
												error = false
												element.className = element.className + " alertFocus "
												createBoxError(element)
												contToolTipsError++
										}
										
										/* Validacao de data (dd/mm/aaaa) */
										if(element.className.indexOf("validate_text_date")>=0 && element.value.search(regexDate)==-1){
												error = false
												element.className = element.className + " alertFocus "
												createBoxError(element)
												contToolTipsError++
										}
										
										/* Validacao de cpf  */
										if(element.className.indexOf("validate_text_cpf")>=0 && isValidCPF(element.value)!=true){
												error = false
												element.className = element.className + " alertFocus "
												createBoxError(element)
												contToolTipsError++
										}
										
										/* para retirar o class alertFocus dos elementos que ja nao estao mais vazios */
										else if( (element.className.indexOf("validate_text_not_null")>=0 && element.className.indexOf("alertFocus")>=0 && element.value!="") || ( element.className.indexOf("validate_text_only_number")>=0 && element.value.search(regexOnlyNumber)==0) || ( element.className.indexOf("validate_text_only_text")>=0 && element.value.search(regexOnlyText)==0) || ( element.className.indexOf("validate_text_email")>=0 && element.value.search(regexEmail)==0) || (element.className.indexOf("validate_text_date")>=0 && element.value.search(regexDate)==0) || ( element.className.indexOf("validate_text_cpf")>=0 && isValidCPF(element.value)==true)){
											selectorClass = element.className.split(" ")
											selectorClassTemp = ""
											for(i=0;i<selectorClass.length;i++){
												if(selectorClass[i]!="alertFocus"){
													selectorClassTemp+= " " + selectorClass[i]	
												}
											}
											
											element.className = selectorClassTemp
											element.onfocus = null // retira o tooltip 
										}
								}
						}
						if(error){
							return error
						}
						else {
							//alert(messageError)
							 createBoxErrorMain(messageError['main'])
							return error
						}
				}	
		}
		
		// fim do 1 if form
		
		maxLengthInput() // chama a funcao maxLength
	}
	catch(e){
		//alert(e)
		//thows e
	}

} // fim da fun??o

/**
 *	@author: Marcelo Linhares
 *  Cria o box com a mensagem de erro principal, a mensagem sumira em 1 segundo
 *
 */
function createBoxErrorMain(textError){
	if(!document.getElementById('temp_BOX_ERROR_MAIN')){ // se ja existe o box de erro, n?o cria novamente, somente exibe-o
		boxErrorMain = document.createElement('div')      // box criado para o aparecimento do tooltip 
		boxBgErrorMain =  document.createElement('div')
		
		with(boxBgErrorMain){
			className = "bgError"
		    style.width = window.screen.width + "px"
		    style.height = window.screen.height  + "px"

		}
		
		buttonCloseToolTip = document.createElement('span') 
		with(buttonCloseToolTip){
			className = "buttonCloseToolTip"
			innerHTML = messageError['close']
			onclick = function(){
				 fadeOut(boxErrorMain.id,-7)
				document.body.removeChild(boxBgErrorMain)
			}
		}
		var posX = ((window.screen.width/2) - 250 ) + "px"
		var posY = ((window.screen.height/2) - 150) + "px"
		
		with(boxErrorMain){
			className = "boxErrorMain"
			innerHTML = textError
			style.position = "absolute"
			style.top = posY
			style.left = posX
			id = "temp_BOX_ERROR_MAIN"
		}
		document.body.appendChild(boxErrorMain) // insere o box no corpo da p?gina
		document.body.appendChild(boxBgErrorMain)
		boxErrorMain.appendChild(buttonCloseToolTip)
	}
	fadeIn(boxErrorMain.id,-7) 
}




/**
 *	@author: Marcelo Linhares
 *  Cria o box com os tooltips para os campos que nao foram preenchidos corretamente
 *	@param: ID do campo que nao foi preenchido corretamente
 *
 */
function createBoxError(idElementToolTip){
						idElementToolTip.onfocus = function() {
							var posX = objLeft(this) + this.offsetWidth + 3 + "px" // posi??o X
							var posY = objTop(this)  +  "px" // posi??o Y
							toolTipsError = document.createElement('div')      /* box criado para o aparecimento do tooltip */
							with(toolTipsError){
								className = "alertFocusToolTip"
								innerHTML = this.title
								style.position = "absolute"
								style.top = posY
								style.left = posX
							}
							document.body.appendChild(toolTipsError)
						}
										
						/* remove o box com o tooltip */
						idElementToolTip.onblur = function() {
							document.body.removeChild(toolTipsError)
						}
}


/*
 * @author: Marcelo Linhares
 * @data: 15/11/2005 - Proclama?o da Rep?lica
 *
 * Funcao percorre todos os campos de entrada de texto dos formul?arios e diz que quando o n?umero maximo de caracteres for alcan?cado, seta o foco no pr?imeiro campo seguinte
 *
 */
 
 function maxLengthInput(){
 	var nForms = document.forms
	var nextNode
	for(i = 0; i < nForms.length; i++){
			for(z = 0; z < nForms[i].length;z++){
					if(nForms[i][z].type == 'text'){ // se o campo for igual a text
							nForms[i][z].onkeyup = function(){ // a cada tecla de entrada			
									if(this.value.length == this.maxLength){ // verifica se atingiu o valor maximo
											for(u=0;u<this.form.length;u++){ // encontra o indice do formulario
												if(this.form[u] ==this){
													this.form[u+1].focus()
											}
										}		
									}
							}
					}
			} 
	}	 // fim do 1? for
} // fim da fun?cao
 


/**************************************************************************************************************

	Funcoes necessarias para estilizacao do tooltip

**************************************************************************************************************/



/* --- funcoes necessarias para tratar diferenca de posicionamento dos elementos no I.E (como sempre ne)  */
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



function isValidCPF(CPF){
	if (CPF.length != 11 || CPF == "00000000000" || CPF == "11111111111" ||
		CPF == "22222222222" ||	CPF == "33333333333" || CPF == "44444444444" ||
		CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" ||
		CPF == "88888888888" || CPF == "99999999999")
		return false;
	soma = 0;
	for (i=0; i < 9; i ++)
		soma += parseInt(CPF.charAt(i)) * (10 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(CPF.charAt(9)))
		return false;
	soma = 0;
	for (i = 0; i < 10; i ++)
		soma += parseInt(CPF.charAt(i)) * (11 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(CPF.charAt(10)))
		return false;
	return true;
 }
 
 
 
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
		
		
		/**
		 * Condi??o de parada da recurs?o
		 */ 
		if(valueAlpha > 100 || valueAlpha < 0){
			if(!document.all){ // Gecko
				if(typeFade =="in"){
					document.getElementById(objectFadeID).style.MozOpacity= 1
				}
				else {
					/* with(document.getElementById(objectFadeID)) {
						style.MozOpacity= 0
						style.display = "none"
						document.body.removeChild
					} */
					document.body.removeChild(document.getElementById(objectFadeID))
				}
				//alert(MEMORY_BUFFER)
			}
			else { // I.E
				
				if(typeFade =="in"){
					document.getElementById(objectFadeID).style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100);"	
				}
				else {
					/* with(document.getElementById(objectFadeID)) {
						style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0);"
						style.display = "none"
					}	 */
					document.body.removeChild(document.getElementById(objectFadeID))
				}
			}	
			return 0
		} 
		else {
			
			colorIE   	  = valueAlpha // ie
		    colorFIREFOX  = valueAlpha/100
			if(!document.all) { // se for Gecko, opacidade = nova cor
				document.getElementById(objectFadeID).style.MozOpacity= colorFIREFOX	
			}
			else { // se for I.E
				document.getElementById(objectFadeID).style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+ colorIE +");"	
			}
			
			
			if(typeFade =="in"){
				document.getElementById(objectFadeID).style.display = "block"
				if(velocityAlpha<0){
					valueAlpha+= -1 * velocityAlpha 
				}else {
					valueAlpha++
				}
			
			} else {
				if(velocityAlpha<0){
					valueAlpha-= -1 * velocityAlpha 
				}else {
					valueAlpha--
				}
			}
			//alert(valueAlpha  +  " VELOCITY -> " + velocityAlpha)	
			fadeCont[MEMORY_BUFFER++] = setTimeout("startAlpha('"+objectFadeID+"',"+ valueAlpha +","+velocityAlpha+",'" + typeFade + "')",velocityAlpha > 0 ? velocityAlpha : 1)
		} // fim da recurs?o
	} // startAlpha()
	
	function fadeIn(objectID,velocityAlpha){ 
		startAlpha(objectID,0,velocityAlpha,"in")
	}
	
	function fadeOut(objectID,velocityAlpha){ 
		startAlpha(objectID,100,velocityAlpha,"out")
	}
