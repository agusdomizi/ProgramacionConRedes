document.getElementById('btn-cargar-datos').addEventListener('click', function() {
    var tbody = document.getElementById('tabla-cuerpo');
    tbody.innerHTML = '';
    var unidadMap = {};
    if (typeof UnidadesDeMedida !== 'undefined' && Array.isArray(UnidadesDeMedida.UnidadesMedida)) {
        UnidadesDeMedida.UnidadesMedida.forEach(function(u) {
            unidadMap[u.cod] = u.descripcion;
        });
    }
    var sumaPrecioUnit = 0;
    var sumaCantidad = 0;
    var sumaTotal = 0;
    if (typeof Facturas_de_compra !== 'undefined' && Array.isArray(Facturas_de_compra)) {
        Facturas_de_compra.forEach(function(item) {
            var tr = document.createElement('tr');
            var unidadDesc = unidadMap[item["Unidad-medida"]] || item["Unidad-medida"];
            var precioUnit = Number(item["PrecioUnit"]);
            var cantidad = Number(item["Cantidad"]);
            var total = precioUnit * cantidad;
            sumaPrecioUnit += precioUnit;
            sumaCantidad += cantidad;
            sumaTotal += total;
            tr.innerHTML = `
                <td>${item["NroFactura"]}</td>
                <td>${item["cod-prod"]}</td>
                <td>${item["Descripcion-producto-servicio"]}</td>
                <td>$${precioUnit.toFixed(2)}</td>
                <td>${cantidad}</td>
                <td>$${total.toFixed(2)}</td>
                <td>${unidadDesc}</td>
            `;
            tbody.appendChild(tr);
        });
    }
    document.getElementById('tfoot-precio-unit').textContent = `$${sumaPrecioUnit.toFixed(2)}`;
    document.getElementById('tfoot-cantidad').textContent = sumaCantidad;
    document.getElementById('tfoot-total').textContent = `$${sumaTotal.toFixed(2)}`;
});

document.getElementById('btn-vaciar-datos').addEventListener('click', function() {
    var tbody = document.getElementById('tabla-cuerpo');
    tbody.innerHTML = '';
    document.getElementById('tfoot-precio-unit').textContent = '$0.00';
    document.getElementById('tfoot-cantidad').textContent = '0';
    document.getElementById('tfoot-total').textContent = '$0.00';
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('miModal');
    var btn = document.getElementById('btn-Nuevo-Ingreso');
    var span = document.querySelector('.cerrar');

    btn.onclick = function() {
        modal.style.display = 'block';
    };

    span.onclick = function() {
        modal.style.display = 'none';
    };

    // Recibir datos del iframe y agregar registro
    window.addEventListener('message', function(event) {
        if (event.data && event.data.tipo === 'nuevo-registro') {
            agregarRegistroATabla(event.data.registro);
            modal.style.display = 'none';
        }
    });


function agregarRegistroATabla(registro) {
    var tbody = document.getElementById('tabla-cuerpo');
    var tr = document.createElement('tr');
    var total = Number(registro.precioUnit) * Number(registro.cantidad);
    // Mapear unidad de medida a descripción
    var unidadDesc = registro.unidadMedida || '';
    if (typeof UnidadesDeMedida !== 'undefined' && Array.isArray(UnidadesDeMedida.UnidadesMedida)) {
        var unidadObj = UnidadesDeMedida.UnidadesMedida.find(function(u) { return u.cod === registro.unidadMedida; });
        if (unidadObj) {
            unidadDesc = unidadObj.descripcion;
        }
    }
    tr.innerHTML = `
        <td>${registro.nroFactura || ''}</td>
        <td>${registro.codProd || ''}</td>
        <td>${registro.descripcion || ''}</td>
        <td>$${Number(registro.precioUnit).toFixed(2)}</td>
        <td>${registro.cantidad || ''}</td>
        <td>$${total.toFixed(2)}</td>
        <td>${unidadDesc}</td>
    `;
    tbody.appendChild(tr);
    actualizarTotales();
}

function actualizarTotales() {
    var tbody = document.getElementById('tabla-cuerpo');
    var filas = tbody.querySelectorAll('tr');
    var sumaPrecioUnit = 0, sumaCantidad = 0, sumaTotal = 0;
    filas.forEach(function(tr) {
        var precio = Number(tr.children[3].textContent.replace('$',''));
        var cantidad = Number(tr.children[4].textContent);
        var total = Number(tr.children[5].textContent.replace('$',''));
        sumaPrecioUnit += precio;
        sumaCantidad += cantidad;
        sumaTotal += total;
    });
    document.getElementById('tfoot-precio-unit').textContent = `$${sumaPrecioUnit.toFixed(2)}`;
    document.getElementById('tfoot-cantidad').textContent = sumaCantidad;
    document.getElementById('tfoot-total').textContent = `$${sumaTotal.toFixed(2)}`;
}
});