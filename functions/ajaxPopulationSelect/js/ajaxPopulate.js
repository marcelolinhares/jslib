/*
 * @author: Marcelo Linhares
 * @data: 01/11/2005
 * Faz uma requisi??o ao script que retorna um xml com o seguinte DTD:
 *
 * <!ELEMENT select (option)> 
 * <!ELEMENT option (value,text)> 
 * <!ELEMENT value (#PCDATA)>
 * <!ELEMENT text (#PCDATA)>
 *
 */

function getObjectXML(){	
	try{
		xmlHttp = new XMLHttpRequest(); // funciona mozilla, op?ra, konqueror...
	}
	catch(e){
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

/* ------- Limpa comboBox do id especificado como par?metro ------ */
function clearCombo(id){
	var nOptions = document.getElementById(id).options
		nOptions.length = 0
	/* for(i=nOptions.length-1; i => 0 ; i--){
		nOptions[i] = null
	} */
}

/* ---------- Popula o combo conforme os campos selects -------------- */
function populateSelect(idObject,idObjectPopulate,url,parametro){
	url+="?"+parametro+"="

	
	// Instanciando o objeto XML
	var objectXML = new Object()
	objectXML = getObjectXML()

	// recebendo o valor do objeto select
	var inputSelect 		= document.getElementById(idObject)
	var inputSelectPopulate = document.getElementById(idObjectPopulate)
	
	// ao alterar o valor do inputSelect, chama esta fun??o
	inputSelect.onchange = function(){
			
			var urlSend = url + this.value // concatena a url com o valor do campo atual
			var nOptions = 0
			var result 	 = 1
			clearCombo(idObjectPopulate) // limpa o combo novamente
			objectXML.open("GET",urlSend,true)

			objectXML.onreadystatechange=function() {
				if (objectXML.readyState==4){
					var optionsSelect = objectXML.responseXML
					result = optionsSelect.getElementsByTagName('option')
					// preenche o combo de acordo com o resultado
					for(y=0;y<result.length;y++){
						valor =result[y].getElementsByTagName('value')[0].firstChild.nodeValue
						resultado = result[y].getElementsByTagName('text')[0].firstChild.nodeValue
						inputSelectPopulate.options[nOptions++] = new Option(resultado,valor); 
					}
				}
			}
			objectXML.send(null)
			
		
	} // fim do inputSelect
	
	
} // fim do populateSelect




