var DISABLE_INPUTS = true

function disableInput(idObjAction,idAllInputs){
	idObjAction = document.getElementById(idObjAction)
	idAllInputs = document.getElementById(idAllInputs)

	idObjAction.onclick = function(){
			var elements = idAllInputs.getElementsByTagName('input')
			for(i in elements) {
				elements[i].disabled = DISABLE_INPUTS
			}
			DISABLE_INPUTS==true?DISABLE_INPUTS=false:DISABLE_INPUTS=true
		}
}