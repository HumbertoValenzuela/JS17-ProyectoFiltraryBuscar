// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
// contenedor para los resultados
const resultados = document.querySelector('#resultado');


// Variable Año
// Utilizamos max y min para generar las diferentes opciones. estas serán realizadas en la funcion llenarSelect
const max = new Date().getFullYear();// Año Actual
const min = max - 10; // Año actual - 10 Años

// Generar un objeto con la búsqueda. Se colocan los diferentes parametros de búsqueda
const datosBusqueda = {
// el usuario selecciona y se debe agregar ese valor
    marca : '', // 
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    marca : '',
    color : '',
}

document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos);//Muestra los Automoviles al cargar 
    // Llenar las opciones de año
    llenarSelect();
})

// Event listener para los select de busqueda
// Diferentes formas de leer los select
// 1 es change, es decir, cuando cambia el select
marca.addEventListener('change', (e) => {
    // console.log('cambió');
    // console.log(e.target.value); este valor se debe colocar en el objeto datoBusqueda
    datosBusqueda.marca = e.target.value;
    // ver que valor se cargo al objeto datoBusqueda
    // console.log(datosBusqueda);
    filtrarAuto();
})

year.addEventListener('change', (e) => {
    // cambiar de string a number. para que la función filtrarYear no tenga error de comparación number y string
    datosBusqueda.year = parseInt(e.target.value);  
    filtrarAuto();   
})

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value;  
    filtrarAuto();  
})

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', (e) => {
    // cambiar de string a number. para que la función filtrarPuertas no tenga error de comparación number y string
    datosBusqueda.puertas = parseInt(e.target.value);  
    filtrarAuto();  
})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;   
    filtrarAuto(); 
})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
})


function mostrarAutos(autos) {

    limpiarHTML();// Elimina el HTML previo

    // ver HTML: id resultado. Iterar por cada auto
    autos.forEach(auto => {
        // ${auto.marca} ${auto.modelo} lo prevenimos usando Destructuring
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        // Crear un  p elemento por cada auto en el html
        const autoHTML = document.createElement('p');
        // Propiedades de p
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio ${precio} - Color: ${color}
        `
        // Insertar en el HTML
        resultados.appendChild(autoHTML);
    });
} 

// Limpiar HTML
// Mandar llamar antes de recorrer o imprimir el html
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);        
    }
}

// Genera los años del select
function llenarSelect() {
    // console.log('llenando el selec');
    // Decrementa para mostrar el año mayor de los primeros
    for (let index = max; index >= min; index--) {
        // console.log(index);ver los años
        // Crear elemento option
        const opcion = document.createElement('option');
        // Agregar propiedades a option
        opcion.value = index;
        opcion.textContent = index;
        year.appendChild(opcion); // Agrega las opciones de año al select
    }
}

// Función que filtra por la busqueda
function filtrarAuto() {
    // console.log('filtrando'); 
    // Array Method .filter este genera un arreglo nuevo  
    // por lo general .filter se realiza con ArrowFunction
    // Este caso se usará una función de alto nivel, es decir,
    // es una función que toma otra función

    // aplicando chaining o encadenamiento
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(mostrarMinimo).filter(mostrarMaximo).filter(filtrarPuerta).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado); ver resultado de .filter
    console.log(resultado);
    if (resultado.length) {
        mostrarAutos(resultado);        
    } else {
        noResultado();
    }    
}

function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');   
    noResultado.classList.add('alerta', 'error'); 
    noResultado.textContent = 'No Hay Resultados, Intenta otros Filtros de Búsqueda';

    resultado.appendChild(noResultado);
}

// función de alto nivel, es una función que toma otra función.
function filtrarMarca(auto) {    
    // console.log(auto); itera sobre todos ellos
    // comparando que sean iguales a la marca
    // Revisar que los elementos del objeto datosBusqueda tenga dato.
    const {marca} = datosBusqueda;
    if(marca){        
        return auto.marca === marca;
    }
    // para mantener el filtro, sin perder la referencia. 
    // sino me traigo todo de regreso
    return auto;    
}

// Acá se observa los principios de la programación Funcional.
// Escribir funciones que primer momento no modifica el arreglo
// original y van siendo funciones pequeñas que van realizando
// ciertas operaciones
function filtrarYear(auto) {
    const {year} = datosBusqueda;

    // Al intentar filtrar por año me dio un arreglo vacio. revisar el tipo
    //console.log(typeof auto.year);// number
    //console.log( typeof year)// string
    // por lo general los elementos de tipo select option
    // son por lo general de tipo string
    if(year){     
        // cambiar acá a parseInt, se ve sucio.   
        // mejor es en el momento que se agrega los campos de busqueda, es decir, en los eventListener
        return auto.year === year; //parseInt(year);
    }   
    return auto;  
}

function mostrarMinimo(auto) {
    const {minimo} = datosBusqueda;    
    if(minimo){     
        
        return auto.precio >= minimo; 
    }   
    return auto;  
}

function mostrarMaximo(auto) {
    const {maximo} = datosBusqueda;    
    if(maximo){     
        
        return auto.precio <= maximo; 
    }   
    return auto;  
}

function filtrarPuerta(auto) {
    const {puertas} = datosBusqueda;    
    if(puertas){     
        
        return auto.puertas === puertas; 
    }   
    return auto;  
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;    
    if(transmision){     
        
        return auto.transmision === transmision; 
    }   
    return auto;  
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;    
    if(color){     
        
        return auto.color === color; 
    }   
    return auto;  
}