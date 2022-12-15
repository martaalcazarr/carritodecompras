//variables
//llamo las varibles por id con # delante, tbody es unico en el html
//entonces no tiene id ni clase, es solo tbody
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
//variable de articulos, que si se va a modificar
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //cuando agregar un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

//para eliminar cursos del carrito
carrito.addEventListener('click', eliminarCurso);
}

//para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; //para resetear el carrito, arreglo vacio
    limpiarHTML()  //eliminamos todo el html
})

//funciones

function agregarCurso(e) {
    e.preventDefault(); //para que no intente llevarme al proximo sitio
    //cuando clique, porque eso haria por defecto al clicar un link
   if(e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado);
   }
};

//eliminar un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        //console.log(e.target.getAttribute('data-id'))
        //eliminar los cursos del carrito a través del data-id
        const cursoId = e.target.getAttribute('data-id');
        const existe = articulosCarrito.some(curso => {
            if(curso.id === cursoId) {
                if(curso.cantidad >1){
                    curso.cantidad--;
                    carritoHTML()
                }else {
                    articulosCarrito =articulosCarrito.filter(curso => curso.id !== cursoId);
                    carritoHTML();
                }
            }
        })
        
    }
}

//lee el contenido del html al que le damos click
//y extrae la informacion de cada curso

function leerDatosCurso(curso){
    console.log(curso)
    //crear un objeto con el contenido del curso actual
    const infoCurso ={
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    }
    console.log(infoCurso)
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id) 
        if(existe) {
            //si existe, agregamos la nueva cantidad
            //creamos la variable cursos con el arreglo original(el let de arriba)
            //y hacemos map para que cree un nuevo arreglo
            //y iteramos cada curso con un arrow function
            const cursos = articulosCarrito.map( (curso) => {
                //si el curso que queremos agregar (infocurso) tiene el mismo id
                //que un curso que ya este en el carrito (curso)
                if(curso.id === infoCurso.id){
                    //si ya existe, se incrementa el valor
                    //de curso en 1 con ++
                    curso.cantidad++; 
                    return curso; //retorna el objeto actualizado
                }else {
                    //sino nos devuelve curso tal y como esta
                    return curso //devuelve los objetos no duplicados
                }
            })
        }else{
            //si no existe, se agrega el nuevo curso
            articulosCarrito = [...articulosCarrito, infoCurso];
        }
    
    //agregar elementos al arreglo de carrito
    //tomo una copia del carrito y le agrego el nuevo curso
    //asi siempre que yo agrego un curso, me dice el arreglo 
    //de todos los articulos seleccionados anteriormente +
    //el nuevo
    
    console.log(articulosCarrito);
    //imprimimos en el html
    carritoHTML();
};

//muestra el carrito de compras en el html
function carritoHTML(){
    //limpiar el html
    limpiarHTML();
//recorre el carrito y genera el html
    articulosCarrito.forEach( (curso) => {
        //hacemos destructuring, asi en los row no tenemos que poner
        //curso.imagen, curso.titulo, curso.precio...
        const {imagen, titulo, precio, cantidad, id} = curso;
        //tenemos que crear un table row, osea tr, cada row sera una tr
        const row = document.createElement('tr');
        //añadimos las propiedades de cada curso segun la informacion
        //que establecimos mas arriba en infoCurso
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>
        ${titulo}
        </td>
        <td>${precio} </td>
        <td>${cantidad}</td>
        <td> 
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    } );
}
//elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    //si el contenedor carrito tiene almenos un child adentro,
    //el codigo se sigue ejecutando, entonces elimina el primer hijo
    //si sigue habiendo hijos, se vuelve a ejecutar y elimina de nuevo 
    //el primero, y se ejecuta mientras haya algun hijo.

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
