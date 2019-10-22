/************************************************************************************
 *		Validação de formulários com ToolTip
 *		@author: Marcelo Linhares - marcelo.linhares@idle.com.br
 *		@Date: 26/09/2005
 *		
 *		Modo de Usar
 *		Basta inserir um link para este javascript dentro da tag <head>:
 *		<script type="text/javascript" src="js/functionsForm.js"></script>
 *
 *		E adicionar dois estilos no css da pagina
 * 		.pFocus = "Estilo quando o paragrafo do formulario estiver focado";
 * 		.focado = "Estilo quando o campo do formulario estiver focado";
 *
 *		
 *		Forma de utilizacao
 *      Campos de preenchimento obrigatório (parâmetro true depois do pipe duplo - || ) : 
 *		<input type="text" name="email" id="email" title="Entre com o seu e-mail ||true">
 *
 *	    Campos sem preenchimento obrigatório (parâmetro false depois do pipe duplo - || ) 
 *		<input type="text" name="email" id="email" title="Entre com o seu e-mail">
 *
 * 		O primeiro texto do atributo "title" antes do "||" corresponde ao texto que ser? exibido no tooltip
 *		O segundo texto indica se o campo ser? obrigat?rio ou n?o
 *
 *
 *		Os estilos CSS "focado" e "pfocus" podem ser alterados no css que vem junto com o script
 *
 *************************************************************************************/

function focaForm(){
	var message     	= "Preencha o Formulário Corretamente\n Os campos em destaque são obrigatórios" 
	var nForms      	= document.forms.length; // recebe o n?mero de forms dentro da p?gina
	var btSubmit    	= document.getElementById("btSubmit");
	var tempI, tempJ
	var stackValidate	= new Array();      // array tempor?ria dos campos obrigat?rios
	var cont		    = 0			      // vari?vel contadora 
	 
	for (var i=0; i < nForms; i++) { // 1? for (percorre os formul?rios da p?gina)
			var form      = document.forms[i]
			var nElements = form.length;
					
			for (var j=0; j < nElements; j++) { //2? form, percorre os elementos do formul?rio escolhido			
				element = form[j]			
				if (element.type == "select-one" || element.type == "select-multiple" || element.type =="text") {			
						// elemento quando focado
						element.onfocus = function(){	
								this.className 				=  "focado"     // altera a classe atual
								this.parentNode.className   =  "pFocus"     // nodo pai
								nodoDicas = document.createElement('span')
								this.parentNode.appendChild(nodoDicas)
								var textTitle = this.title.split('||')
								nodoDicas.innerHTML  =  textTitle[0]  // pr?ximo nodo da ?rvoe
								nodoDicas.className = "tool_tip"		
						}
						// ao perder o foco executa esta fun??o
						element.onblur = function(){
								this.className			    =  ""
								this.parentNode.className   =  ""
								this.parentNode.removeChild(this.parentNode.lastChild) // remove
						}
				} // fim do if	

			} // fim do 2? for
			
			// fun??o para validar campos obrigat?rios quando o usu?rio clicar no bot?o submit
			// validando campos obrigat?rios
			form.onsubmit = function(){
			error = true
					for (var z=0; z < nElements; z++) {
							element = form[z]		
							if (element.type == "select-one" || element.type == "select-multiple" || element.type =="text") {
									var textTitle = element.title.split('||')			
									if(textTitle[1] == 'true'){ // se o elemento tiver que ser validado
										if(element.value ==""){
											element.className="focado"
											error = false
										}	
									}
							}
					}
					if(error){
						return error
					}
					else {
						alert(this.title)
						return error
					}
			}	
	}
	
	// fim do 1? if form
	document.forms[0][0].focus(); // foca o primeiro elemento do primeiro formul?rio da p?gina			

} // fim da fun??o




/* quando carregar a página */
window.onload = function() {
		focaForm()
}