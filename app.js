
const servicios = [
    {nombre: "Capping", precio: 6000,},
    {nombre: "Semipermanente", precio: 7000,},
    {nombre: "Soft Gel", precio: 8000,},
    {nombre: "Press On",precio: 9000,}
];

const serviciosElegidos = [];

const agregarServicio = (servicio) => { // Agrego el nombre y precio de los servicios según el valor elegido en "let = servicio" dentro app().
    serviciosElegidos.push(servicio);
}

const serviciosAComprar = () => { // Creo la lista para obtener el nombre de cada servicio elegido
    let listaServicios = '';
    for (let i = 0; i < serviciosElegidos.length; i++) {
        listaServicios += '* ' + serviciosElegidos[i].nombre + '\n';
    }
    return listaServicios;
}

const totalAPagar = () => { // Sumo en secuencia los precios de cada servicio
    let precioTotal = 0;
    for (let i = 0; i < serviciosElegidos.length; i++) {
        precioTotal += serviciosElegidos[i].precio;
    }

    if (serviciosElegidos.length == 2){
        precioTotal = `${precioTotal * 0.95} (5% descuento por llevar 2 productos)`; // Aplicar un 5% de descuento al comprar 2 productos.
    } else if (serviciosElegidos.length == 3) {
        precioTotal = `${precioTotal * 0.9} (10% descuento por llevar 3 productos)`; // Aplicar un 10% de descuento al comprar 3 productos.
    } else if (serviciosElegidos.length > 3) {
        precioTotal = `${precioTotal * 0.8} (20% descuento por llevar 4 o más productos)`; // Aplicar un 20% de descuento al comprar 4 o más productos.
    }

    return precioTotal;
}

const app = () => {
    
    alert("¡Bienvenidos a LuManicuría!\n\n¡Descuentos hasta el 20% combinando servicios!");

    let loop = true;
    let verificador = []; // Lo creo para almacenar los servicios elegidos así no se repiten.

    while (loop) {
        let servicio = parseInt(prompt(`Indique el número correspondiente al servicio que desea: \n
            0- Capping $${servicios[0].precio}
            1- Semipermanente $${servicios[1].precio}
            2- Soft Gel $${servicios[2].precio}
            3- Press On $${servicios[3].precio}`)); //Solicitar servicio.
        
        
        if( (verificador.includes(servicio)) ) { // Verificar si el servicio ya fue seleccionado.
            alert('No puede seleccionar el mismo servicio.')
            loop = true;
        } else {
            verificador.push(servicio); // Agrega el servicio seleccionado al array del verificador.
            agregarServicio(servicios[servicio]);

            if (servicio === '') { //Compruebo que no esté vacío la selección.
                alert('Debe elegir un servicio válido.');
                loop = true;  // Si está vacío, reinicio el loop.
            } else { // Si no está vacío, ejecuto el pedido.
                loop = confirm(`Seleccionaste el servicio ${servicios[servicio].nombre}.\n\n¿Deseas agregar otro servicio? \n(no puedes repetir un mismo servicio)`);
            }
        }
    }

    alert(`Usted seleccionó los siguientes servicios: \n${serviciosAComprar()}\nEl total a abonar es de $${totalAPagar()}.`)
}

app();