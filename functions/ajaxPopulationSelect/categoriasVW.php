<?php
header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>"
?>
<select>
<? 

$categoria = $_GET['categoria'];

if($categoria==1){ ?>
	<option>
		<value>1</value>
		<text>Rambo I</text>	
	</option>
	<option>
		<value>2</value>
		<text>Rambo II</text>	
	</option>
	<option>
		<value>3</value>
		<text>Rambo III</text>	
	</option>
	<option>
		<value>4</value>
		<text>De Volta Para O Futuro</text>	
	</option>
	<option>
		<value>5</value>
		<text>Deby e Lóide</text>	
	</option>
<?} else { ?>
<option>
		<value>8</value>
		<text>A Vida é Bela</text>	
	</option>
	<option>
		<value>9</value>
		<text>Amor meu Grande Amor</text>	
	</option>
	<option>
		<value>10</value>
		<text>10 Formas de AMAR</text>	
	</option>
	<option>
		<value>11</value>
		<text>Meu Querido Presidente</text>	
	</option>
<?} ?>
</select>

