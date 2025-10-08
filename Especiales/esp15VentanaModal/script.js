onload=alert("El ancho de la ventana es: " + window.innerWidth + "px");

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('miModal');
    var btn = document.querySelector('header button');
    var span = document.querySelector('.cerrar');

    btn.onclick = function() {
        modal.style.display = 'block';
    };

    span.onclick = function() {
        modal.style.display = 'none';
    };

});
