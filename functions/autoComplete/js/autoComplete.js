function getObjectXML(){	
	try{
		xmlHttp = new XMLHttpRequest(); // funciona mozilla, op?ra, konqueror...
	}
	catch(ee){
	try{
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); // funciona na Microsoft
	}
	catch(e){ // I.E5
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(E){
			xmlHttp = false;
		}
	}
   }

   return xmlHttp
}

/* -------------------------------------------------------------
 * @author: Marcelo Linhares
 * @data: 07/11/2005
 *
 * requestAutoComplete v0.7
 *
 * Classe para autoCompletar textos via Ajax, semelhante ao googleSugest
 *
 * requestAutoComplete(idForm,idObj,urlAction,styleComplete)
 *
 *	idForm    	  	=	  id do formul?rio que ser? submetido
 *  idObj     	  	=  	  id do campo input que ser? autoCompletado
 *  urlAction     	=  	  url da action que ser? feita a requisi??o
 *  styleComplete 	= 	  estilo do box que ser? exibido
 *  clickPost		=	  Se esta vari?vel for setada como true, o formul?rio ? postado quando o usu?rio seleciona o campo
 *  
 * 
 * O documento de resposta tem o seguinte DTD
 *
 * <!ELEMENT select (list)> 
 * <!ELEMENT list (#PCDATA)>

 * -------------------------------------------------------------*/

function requestAutoComplete(idForm,idObj,urlAction,styleComplete,clickPost) {
	var formPage = document.getElementById(idForm)
	var xmlHttpRequest = getObjectXML() 		 /* instanciando objeto XML */
	var idObj = document.getElementById(idObj)   /* elemento que ser? passado como par?metro */
	var widthTemp 								 /* espa?ameto lateral tempor?rio do box que aparecer? */
	var resultList 								 /* Lista de elementos 'list' que ser? retornado da action 
	var listTemp								 /* Elemento lista que ser? criado dinamicamente */
	var clickPost	= clickPost					 /* Informa se o formul?rio vai ser submetido quando o usu?rio seleciona o campo */
	
	/* --- Quando a tecla for apertada ----- */
	idObj.onkeyup = function(e){		
		if(!this.value==''){ // se o conte?do estiver vazio nem faz a requisi??o no server
			
			/* verifica se o objeto j? foi criado */
			if(objList = document.getElementById('boxComplete')){
				// pega a tecla do usu?rio
				if(typeof(e)=='undefined')var e=window.event
				//alert(e.keyCode)
				if(e.keyCode == 40){
					objList = document.getElementById('boxComplete').getElementsByTagName('li')
					objList[0].focus
				}
				if(e.keyCode == 38){
					// alert('seta p/ cima')
				}	
			}
			
			
			var url = urlAction + this.value
			xmlHttpRequest.open("GET",url,true) /* abrindo a url */
			xmlHttpRequest.onreadystatechange = callObject /* lendo objeto */
			xmlHttpRequest.send(null) /* Envia o valor */
		}
		else {
			// Se j? tiver sido criado o elemento, remove-o
			if(objList = document.getElementById('boxComplete')){
				document.body.removeChild(objList)	
			}
		}	
	}
	
	function callObject() {
		if (xmlHttpRequest.readyState==4){ // se documento carregado com sucesso
			if(xmlHttpRequest.status == 200) {
			resultList = xmlHttpRequest.responseXML.getElementsByTagName('list')
			
			if(resultList.length){ // se a procura retornou > 0 elementos
					
					// Se j? tiver sido criado o elemento, remove-o
					if(objList = document.getElementById('boxComplete')){
						document.body.removeChild(objList)	
					}
					
					objList = document.createElement('ul')      /* Lista criada para exibi??o dos resultados */
				
					/* percorre os resultados e cria a lista */
					for(i = 0; i < resultList.length; i++){
						listTemp = document.createElement('li')
						objList.appendChild(listTemp)
						listTemp.title = resultList[i].firstChild.nodeValue
						var textTemp = resultList[i].firstChild.nodeValue
						textTemp = eval("textTemp.replace(/("+idObj.value+")/gi,'<strong>$1</strong>')")
						listTemp.innerHTML 	= textTemp
					}
					definePosition(objList) // define o leiaute
					defineStyleBox()
			}else {
				if(objList = document.getElementById('boxComplete')){
						document.body.removeChild(objList)	
					}
			}
		}else {
			alert("erro ao carregar documento")
		}		
	}
}
	
/* --- fun??es necess?rias para tratar diferen?a de posicionamento dos elementos no I.E (como sempre n??) 
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
	/*	
	 TODO: Fun??o Obsoleta
	function clearList(){
		var elementsList = objList.childNodes
		alert(elementsList.length)
		alert("filhos -> " + objList.childNodes.length)
	
		for( i=0; i < elementsList.length; i++) {
			var childTemp = elementsList[i]
		    objList.removeChild( childTemp )
		    alert("elemento " + i + " removido")
		}
		var elementsList = objList.getElementsByTagName('li')	
		alert(elementsList.length)
	}
	*/

	/* --------------------------
		Definindo o leiaute do box
	----------------------------*/
	function definePosition(objList){
		
		var posX = objLeft(idObj) + "px" // posi??o X
		var posY = objTop(idObj) + idObj.offsetHeight +  "px" // posi??o Y
		objList.className = styleComplete
		objList.id 		  = "boxComplete"
		objList.style.display   = 'block'
		objList.style.width = idObj.offsetWidth + "px"
		objList.style.left = posX
		objList.style.top = posY
		document.body.appendChild(objList)
	}
	function defineStyleBox(){
		var boxElements = document.getElementById("boxComplete").getElementsByTagName('li')
		for(i in boxElements) {
			boxElements[i].onmouseover = function(){
				this.className = "hover"
			}
			boxElements[i].onmouseout = function(){
				this.className = ""
			}
			boxElements[i].onclick = function(){
				this.parentNode.style.display = "none"
				setContent(this.title)
				if(clickPost){
					formPage.submit() /* submita o formul?rio */
				}
			}
		}
	}	
	function setContent(value){
		idObj.value = value;
	}
	function clearContent(){
		idObj.value = "";
	}
	
	
}