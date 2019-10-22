/*
 * ?rvore de Navega??o multin?vel 
 * @author: Marcelo Linhares
 * @data: 22/11/2005
 *
 * 
 * 
 *
 */

function multiTree(){
	if(document.getElementById('arvore_multinivel')){// se existir este ID na p?gina
		var tree = document.getElementById('arvore_multinivel').getElementsByTagName('span') // pega os elementos span
		for(i=0; i < tree.length;i++){ // percorre a cole??o de tags SPAN
			if(tree[i].className == "fechado" || tree[i].className == "aberto"){ // se o nodo estiver fechado ou aberto		
				// se o nodo estiver fechado, esconde os filhos
				(tree[i].className == "fechado")?tree[i].nextSibling.nextSibling.style.display = "none" : ""
				tree[i].onclick = function(){ // ao clicar no NODO 
					if(this.className=="aberto"){ // esconde os nodos e altera a classe
						this.nextSibling.nextSibling.style.display = "none"
						this.className = "fechado"
					}
					else{ // mostra os nodos e altera a classe
						this.nextSibling.nextSibling.style.display = "block"
						this.className = "aberto"
					}
				} // fim da fun??o onclick
			}
		}
	} // fim do if
}

