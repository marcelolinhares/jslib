/*
 * @author: Marcelo Linhares
 * @date: 08/11/2005
 *
 * Classe orderTable efetua ordena??o dos elementos n?mericos da tabela
 *
 * M?todo de chamada 
 *
 * onclick="orderTable('idTable','indiceTabela')
 */ 
 
/* ---- efetua permuta de linhas ----- */
function changeLine(line1,line2){
	var arrayTemp = []
	for (i=0; i< line1.cells.length; i++)
		arrayTemp.push(line1.cells[i].innerHTML)
	for (i in line1.cells)
		line1.cells[i].innerHTML = line2.cells[i].innerHTML
	for (i in line2.cells)
		line2.cells[i].innerHTML = arrayTemp[i]
}

function orderTable(idTable,index){
		this.table = document.getElementById(idTable)
		this.nLines = table.rows.length
		
		this.changeLine = changeLine
		
		/* ---------- Implementando m?todo da bolha --------- */
		for(z=0;z<nLines;z++){ // percorrendo as linhas
			var i = 1
			while(i<(nLines-1)) {
				value  = parseFloat(table.rows[i].cells[index].innerHTML)
				value2 = parseFloat(table.rows[i+1].cells[index].innerHTML)
				if(value < value2)
					this.changeLine(table.rows[i],table.rows[i+1])
			i++
			}
		}	
}
