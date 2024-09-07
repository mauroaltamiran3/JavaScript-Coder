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

const agregarServicio = (servicioBase) => { // Recibe el parámetro baseServicios[servicioId].
    serviciosAgregados.push(servicioBase);
}

const agregarServicioExtra = (servicioExtra,cantidad) => { // Agregar servicio extra al array serviciosAgregadosExtra
    const infoServicioExtra = {
        nombre: servicioExtra.nombre,
        precio: servicioExtra.precio,
        cantidad: cantidad,
    }
    serviciosAgregadosExtra.push(infoServicioExtra);
}

const listarServicios = (arrayConAgregados) => { // También solicito el argumento servicio que me entrega el array que le pido al final para mostrar.
    let lista = '';                      // Acá creo una lista de los servicios extras para mostrarlo en la alerta final.
    for (let i = 0; i < arrayConAgregados.length; i++) {
        if (arrayConAgregados == serviciosAgregadosExtra) { // Validación para poder aclarar la cantidad del servicio extra.
            lista += `\n* ${arrayConAgregados[i].nombre} (${arrayConAgregados[i].cantidad})`;
        } else {
            lista += `\n* ${arrayConAgregados[i].nombre}`;
        }
    }
    return lista;
}

const totalCarritoExtra = () => { //Obtengo el precio del servicio extra
    let montoExtra = 0;
    for (let i = 0; i < serviciosAgregadosExtra.length; i++) {
        montoExtra += serviciosAgregadosExtra[i].precio * serviciosAgregadosExtra[i].cantidad;
    }
    return montoExtra;
}

const totalCarritoBase = () => { // Obtengo el precio de los servicios principals
    let montoBase = 0;
    for (let i = 0; i < serviciosAgregados.length; i++) {
        montoBase += serviciosAgregados[i].precio;
    }
    return montoBase;
}

const totalCarrito = () => { // Obtengo los valores por separados para darles un total y aplicarle descuento si corresponde.
    let precioTotal = totalCarritoBase() + totalCarritoExtra();
    return aplicarDescuento(precioTotal, serviciosAgregados.length);
}

const aplicarDescuento = (precioTotal, cantidadServicios) => { // En totalCarrito tomo el parámetro precioTotal y el array serviciosAgregados en este caso.
    if (cantidadServicios === 2) {
        return `${precioTotal * 0.85} (15% descuento por llevar 2 servicios)`;
    } else if (cantidadServicios === 3) {
        return `${precioTotal * 0.80} (20% descuento por llevar 3 servicios)`;
    } else if (cantidadServicios > 3) {
        return `${precioTotal * 0.75} (25% descuento por llevar 4 o más servicios)`;
    }
    return precioTotal;
}

const mensajeServicio = (arrayAListar) => { // El mensaje que recibe argumento del array para hacer la muestra de servicios disponibles para seleccionar.
    let mensaje = '';
    for (let i = 0; i < arrayAListar.length; i++) {
        mensaje += `\n ${i}- ${arrayAListar[i].nombre} $${arrayAListar[i].precio}.`;
    }
    return mensaje;
}

const validarServicioId = (arrayDeseado, mensajeServicio) => {
    let loopValidar = true;
    while (loopValidar) {
        let servicioId = parseInt(prompt(`Elegir el servicio según su número:\n${mensajeServicio}`));

        if (isNaN(servicioId) || servicioId >= arrayDeseado.length) {
            alert('Ingrese un servicio válido.');
        } else {
            return servicioId; // Retorna el valor válido
        }
    }
}

const validarServicioExtra = () => {
    let loopValidarExtra = true;
    while(loopValidarExtra && extrasServicios.length !== 0) {
        let servicioId = validarServicioId(extrasServicios,mensajeServicio(extrasServicios));
        let cantidad = parseInt(prompt('Elegir una cantidad entre 1 y 10.'));

        if (!isNaN(cantidad) && cantidad > 0 && cantidad <= 10) {
            agregarServicioExtra(extrasServicios[servicioId],cantidad); // Envío el índice del array extrasServicios
            extrasServicios.splice(servicioId, 1)
            loopValidarExtra = confirm('¿Desea elegir otro servicio extra?')
        } else {
            alert('Ingresar una cantidad válida.')
        }
    }
}

const app = () => {
    alert("¡Bienvenidos a LuManicuría!\n\n¡Descuentos hasta el 20% combinando servicios!");

    let loop = true;
    while(loop) {
        
        let loopElegirServicio = true;
        while( loopElegirServicio ) {
            if( baseServicios.length !== 0) {
                let servicioId = validarServicioId(baseServicios, mensajeServicio(baseServicios)); // Envío el array a validar y su respectivo mensaje dentro de otra función (mensajeServicio).
                agregarServicio(baseServicios[servicioId]); // Lo agrego al array principal una vez validado y elegido.
                loopElegirServicio = confirm(`Elegiste ${baseServicios[servicioId].nombre}\n\n ¿Desea elegir otro servicio principal?`);
                baseServicios.splice(servicioId, 1); // Elimino el elemento para volver a preguntar y que no lo vuelva a elegir.
            } else {
                loopElegirServicio = false;
            }
        }

        let agregarExtra = confirm(`¿Deseas agregar un servicio extra?`);
        if (agregarExtra) {
            validarServicioExtra(); // Llamado a la función que hace la validación y agrega el servicio al array extrasServicios.
        }
        loop = false; // Una vez elegido o no el servicio extra, se entrega la alerta.
        
    }
    

    const alerta = () =>{ // Creé la función para mostrar o no serviciosAgregadosExtra, ya que es opcional.
        if (serviciosAgregadosExtra == 0) {
            alert(`Elegiste los servicios: ${listarServicios(serviciosAgregados)}\n\nServicios: $${totalCarritoBase()}\n\n*--- El total a abonar es de $${totalCarrito()} ---*`);
        } else {
            alert(`Elegiste los servicios: ${listarServicios(serviciosAgregados)}
            Servicios base: $${totalCarritoBase()}\n\nElegiste el servicio extra:${listarServicios(serviciosAgregadosExtra)}
            Servicios Extras: $${totalCarritoExtra()}\n
            *--- El total a abonar es de $${totalCarrito()} ---*`);
        }
    } 
    
    alerta();
}

app();