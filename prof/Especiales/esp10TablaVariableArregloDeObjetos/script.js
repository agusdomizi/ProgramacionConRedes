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
