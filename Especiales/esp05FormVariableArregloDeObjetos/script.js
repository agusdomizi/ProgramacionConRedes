function cargarOpciones(){
    UnidadesDeMedida.UnidadesMedida.forEach(function(argValor){
        var objOpcion = document.createElement("option");
        objOpcion.className = "opcionUnidad";
        objOpcion.value = argValor.cod;
        objOpcion.text = argValor.descripcion;
        document.getElementById("UnidadMedida").appendChild(objOpcion);
    });
}
window.onload = cargarOpciones;

function actualizarTotal() {
    var precio = parseFloat(document.getElementById('precioUnit').value) || 0;
    var cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
    var total = precio * cantidad;
    document.getElementById('total').value = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    var precioInput = document.getElementById('precioUnit');
    var cantidadInput = document.getElementById('cantidad');
    if (precioInput && cantidadInput) {
        precioInput.addEventListener('input', actualizarTotal);
        cantidadInput.addEventListener('input', actualizarTotal);
    }
    // Enviar datos al padre al enviar el formulario
    var form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var registro = {
                nroFactura: document.getElementById('Nrofactura')?.value || '',
                codProd: document.getElementById('cod-prod')?.value || '',
                descripcion: document.getElementById('descripcion-producto-servicio')?.value || '',
                precioUnit: document.getElementById('precioUnit')?.value || '',
                cantidad: document.getElementById('cantidad')?.value || '',
                unidadMedida: document.getElementById('UnidadMedida')?.value || ''
            };
            window.parent.postMessage({ tipo: 'nuevo-registro', registro: registro }, '*');
        });
    }
});