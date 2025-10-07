<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Ejercicio de Include</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>

    <h2>Ejercicio de Include</h2>

    <?php
    echo "<p><strong>Importante:</strong> Antes de insertar el include las variables declaradas en el mismo no existen</p>";
    
    echo "<p>Pero a pesar de ello el ciclo de ejecución continuará hasta el final</p>";
    
    echo "$arreglo1 <br>";
    echo "$arreglo2 <br>";

    echo "<hr>";

    echo "<strong>En este punto se ejecuta la función include().</strong> Cuando se usa include ocurre que si el archivo asociado no existe, se visualiza un warning y el script sigue ejecutándose.";

    include('inclusion.php');

    echo "<h3>Contenido de los arreglos después del include:</h3>";
    echo "<p>Valores de \$arreglo1:</p>";
    echo "<table>";
    foreach ($arreglo1 as $clave => $valor) {
        echo "<tr><td>$clave</td><td>$valor</td></tr>";
    }
    echo "</table>";

    echo "<strong>La longitud del arreglo1 es: " . count($arreglo1) . "</strong>";

    echo "<p>Valores de \$arreglo2:</p>";
    echo "<table>";
    foreach ($arreglo2 as $clave => $valor) {
        echo "<tr><td>$clave</td><td>$valor</td></tr>";
    }
    echo "</table>";

    echo "<strong>La longitud del arreglo2 es: " . count($arreglo2) . "</strong>";

    echo "<hr>";
    echo "<button class=\"volver-atras\">";
    echo "<a class=\"volver-atras\" href=\"../index.html\">Volver</a>";
    echo "</button>";
?>
</body>

</html>