<?php
header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>"
?>
<select>

<? 

$estado = $_GET['estado'];

if($estado==1){ ?>
	<option>
		<value>1</value>
		<text>Belo Horizonte</text>	
	</option>
	<option>
		<value>2</value>
		<text>Betim</text>	
	</option>
	<option>
		<value>3</value>
		<text>Contagem</text>	
	</option>
	<option>
		<value>4</value>
		<text>Santa Luzia</text>	
	</option>
	<option>
		<value>5</value>
		<text>Sabará</text>	
	</option>
	<option>
		<value>6</value>
		<text>Três Corações</text>	
	</option>
	<option>
		<value>7</value>
		<text>Divinópolis</text>	
	</option>
<? } else if($estado==2) { ?>
<option>
		<value>8</value>
		<text>Vitória</text>	
	</option>
	<option>
		<value>9</value>
		<text>Guarapari</text>	
	</option>
	<option>
		<value>10</value>
		<text>Vila Velha</text>	
	</option>
	<option>
		<value>11</value>
		<text>Serra</text>	
	</option>
	<option>
		<value>12</value>
		<text>São Gabriel</text>	
	</option>
	<option>
		<value>13</value>
		<text>Guaçuí</text>	
	</option>
<? } ?>
</select>

