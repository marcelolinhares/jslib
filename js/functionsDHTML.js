function displayNoneAll(){
	var objDivs = document.getElementsByTagName('div')
	for(i in objDivs){
		objDivs[i].className=='listCodigo'? objDivs[i].style.display='none' : ""
	}

}

function showDiv(idDiv) {
 document.getElementById(idDiv).style.display = "block";
}
function showCode(){
	var elementList = document.getElementById('menuCode').getElementsByTagName('li')
	for (i in elementList){
		elementList[i].onclick = function(){
			displayNoneAll()
			var idDiv = "p" + this.id
			showDiv(idDiv)
		}
	}

}


window.onload = function(){
	showCode()
}