const baseServicios = [
    {nombre: "Semipermanente", precio: 5000,},
    {nombre: "Soft Gel", precio: 7000,},
    {nombre: "Capping", precio: 6000,},
    {nombre: "Press On",precio: 8000,},
]

const extrasServicios = [
    {nombre: "Diseño básico (líneas o formas)", precio: 250,},
    {nombre: "Diseño complejo (formas o dibujos)", precio: 500,},
    {nombre: "Pedrería por uña", precio: 700,},
]

const serviciosAgregados = [];
const serviciosAgregadosExtra = [];
const arrayCombinado = [];

const agregarServicioExtra = (servicioExtra,cantidad) => { // Agregar servicio extra al array serviciosAgregadosExtra
    const infoServicioExtra = {
        nombre: servicioExtra.nombre,
        precio: servicioExtra.precio,
        cantidad: cantidad,
    }
    serviciosAgregadosExtra.push(infoServicioExtra);
}

const agregarServiciosTotales = (arrayServicio) => {
    const infoServicio = {
        nombre: arrayServicio.nombre,
    }
    arrayCombinado.push(infoServicio);
}

const listarServicios = (arrayConAgregados) => {
    let lista = '';

    for(const servicio of arrayConAgregados) {
        if(servicio == serviciosAgregadosExtra) {
            lista += `\n* ${servicio.nombre} (${servicio.cantidad})`;
        } else {
            lista += `\n* ${servicio.nombre}`;
        }
    }
    return lista;
}

const totalCarrito = (arrayServicio) => { // Resumí ambos carritos en uno solo y apliqué el for of.
    let monto = 0;

    for( let servicio of arrayServicio ){
        if(arrayServicio == serviciosAgregadosExtra) {
            monto += servicio.precio * servicio.cantidad;
        } else {
            monto += servicio.precio;
        }
    }
    return monto;
}

const montoTotalCarrito = () => { // Obtengo los valores por separados para darles un total y aplicarle descuento si corresponde.
    let precioTotal = totalCarrito(serviciosAgregados) + totalCarrito(serviciosAgregadosExtra);
    return aplicarDescuento(precioTotal, serviciosAgregados.length);
}

const aplicarDescuento = (precioTotal, cantidadServicios) => { // En totalCarrito tomo el parámetro precioTotal y el array serviciosAgregados en este caso.
    if (cantidadServicios === 2) {
        return `${precioTotal * 0.85} (15% descuento aplicado por llevar 2 servicios)`;
    } else if (cantidadServicios === 3) {
        return `${precioTotal * 0.80} (20% descuento aplicado por llevar 3 servicios)`;
    } else if (cantidadServicios > 3) {
        return `${precioTotal * 0.75} (25% descuento aplicado por llevar 4 o más servicios)`;
    }
    return precioTotal;
}

let lengthInicialArray; // Declaro el valor por fuera para que no se recalcule la variable y solo guarde el valor original antes de los splice
const mensajeServicio = (arrayAListar) => { 
    let mensaje = '';
    let indice = 0; // voy marcando el índice

    if (!lengthInicialArray) { // Le cambio el valor null o undefined por el length del array por única vez, ya que deja de ser null.
        lengthInicialArray = arrayAListar.length;
    }

    for (const servicio of arrayAListar) { // Uso el for of
        mensaje += `\n ${indice}- ${servicio.nombre} $${servicio.precio}`;
        indice++; // lo incremento
    }

    if(arrayAListar.length < lengthInicialArray) {
        mensaje += `\n\n 9- Volver`
    }
    
    return mensaje;
}

const validarServicioId = (arrayDeseado, mensajeServicio) => {
    let loopValidar = true;
    while (loopValidar) {
        let servicioId = parseInt(prompt(`Elegir el servicio según su número:\n${mensajeServicio}`));

        if (servicioId === 9) {
            return servicioId;
        } else if (isNaN(servicioId) || servicioId >= arrayDeseado.length || servicioId < 0) {
            alert('Ingrese un servicio válido.');
        } else { 
            return servicioId; // Retorna el valor válido
        }
    }
}

const validarCantidad = () => {
    let loopCantidad = true;
    while(loopCantidad) {
        let cantidad = parseInt(prompt('Elegir una cantidad entre 1 y 10.'));
        if (!isNaN(cantidad) && cantidad > 0 && cantidad <= 10) {
            return cantidad;
        } else {
            alert('Ingresar una cantidad válida.');
            loopCantidad = true;
        }
    }
}

const eliminarServicio = (arrayServicio) => { // Función para eliminar en caso que desee algún servicio elegido.
    let loopEliminar = true;
    while(loopEliminar) {
        let servicioId = validarServicioId(arrayServicio, mensajeServicio(arrayServicio));
        arrayServicio.splice(servicioId,1);

        if( arrayServicio.length == 0) {
            loopEliminar = false;
        } else {
            loopEliminar = confirm('¿Deseas eliminar otro servicio?')
        }
    }
}

const app = () => {
    alert("¡Bienvenidos a LuManicuría!\n\n¡Descuentos hasta el 20% combinando servicios!");

    let loop = true;
    while(loop) {
    // Agregar servicio principal

        let loopElegirServicio = true;
        while( loopElegirServicio && baseServicios.length != 0 ) {
            let servicioId = validarServicioId(baseServicios, mensajeServicio(baseServicios)); // Envío el array a validar y su respectivo mensaje dentro de otra función (mensajeServicio).

            if ( servicioId === 9 ) { // Opción para volver hacia atrás
                loopElegirServicio = true;
            } else {
                serviciosAgregados.push(baseServicios[servicioId]); // Lo agrego al array principal una vez validado y elegido.
                agregarServiciosTotales(baseServicios[servicioId]);
            }

            loopElegirServicio = confirm(`¿Desea elegir otro servicio principal?`);
            baseServicios.splice(servicioId, 1); // Elimino el elemento para volver a preguntar y que no lo vuelva a elegir.
        }

    // Agregar servicio extra 

        let loopElegirServicioExtra = confirm(`¿Deseas agregar un servicio extra?`);
        while( loopElegirServicioExtra ) {
            let servicioId = validarServicioId(extrasServicios, mensajeServicio(extrasServicios)); // Envío el array a validar y su respectivo mensaje dentro de otra función (mensajeServicio).

            if ( servicioId === 9 ) { // Opción para volver hacia atrás
                loopElegirServicio = true;
            } else {
                let cantidad = validarCantidad(); // Cree la función para validar la cantidad
                agregarServicioExtra(extrasServicios[servicioId], cantidad); // Lo agrego al array principal una vez validado y elegido.
                agregarServiciosTotales(extrasServicios[servicioId]);
            }

            extrasServicios.splice(servicioId, 1); // Elimino el elemento para volver a preguntar y que no lo vuelva a elegir.


            if ( extrasServicios.length == 0) { //Solucionar para que no me vuelva a pedir servicio extra si está vacío el array
                loopElegirServicioExtra = false;
            } else {
                loopElegirServicioExtra = confirm(`¿Deseas agregar un servicio extra?`);
            }
        }

        let loopEliminar = confirm(`¿Deseas eliminar algún servicio Principal?`);
        while (loopEliminar) { // Eliminar servicio en caso de quererlo
            eliminarServicio(serviciosAgregados);
            loopEliminar = false;
        }

        let loopEliminarExtra = confirm(`¿Deseas eliminar algún servicio extra?`);
        while(loopEliminarExtra) { // Eliminar servicio en caso de quererlo
            eliminarServicio(serviciosAgregadosExtra);
            loopEliminarExtra = false;
        }
        loop = false;
    }

    const alerta = () =>{ // Creé la función para mostrar o no serviciosAgregadosExtra, ya que es opcional.
        if (serviciosAgregadosExtra == 0) {
            alert(`Elegiste los servicios: ${listarServicios(serviciosAgregados)}\n\nServicios: $${totalCarrito(serviciosAgregados)}\n\n*--- El total a abonar es de $${montoTotalCarrito()} ---*`);
        } else {
            alert(`Elegiste los servicios: ${listarServicios(serviciosAgregados)}
            Servicios base: $${totalCarrito(serviciosAgregados)}\n\nElegiste el servicio extra:${listarServicios(serviciosAgregadosExtra)}
            Servicios Extras: $${totalCarrito(serviciosAgregadosExtra)}\n
            *--- El total a abonar es de $${montoTotalCarrito()} ---*`);
        }
    } 
    
    alerta();
}

app();