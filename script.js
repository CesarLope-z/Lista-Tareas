const listaTareas = document.querySelector('#listaTareas');

const formulario = document.querySelector('form');
const materia = document.querySelector('#materia');
const titulo = document.querySelector('#titulo');
const descripcion = document.querySelector('#descripcion');
const fecha = document.querySelector('#fecha');


const listaContabilidad = document.querySelector('#contabilidad')
const listaMatematica = document.querySelector('#matematica')
const listaMicroeconomia = document.querySelector('#microeconomia')
const listaAdministracion = document.querySelector('#administracion')
const listaMercadotecnia = document.querySelector('#mercadotecnia')

let tareas = [];
cargarTodo();

function cargarTodo(){
    formulario.addEventListener('submit', agregarTarea);

    listaTareas.addEventListener('click', borrarTarea);

    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse( localStorage.getItem('tareas') ) || []  ;
        agregarHTML();
   });

   
}
function agregarTarea(e){
    e.preventDefault();
    const materia = document.querySelector('#materia').value;
    const titulo = document.querySelector('#titulo').value;
    const descripcion = document.querySelector('#descripcion').value;
    const fecha = document.querySelector('#fecha').value;
    
    if(materia === '' || fecha === '' || titulo === ''){
        console.log('Faltan datos que llenar');
        mostrarAlerta('Algunos campos son obligatorios, se recomienda llenarlos');
        return;
    }

    const tareasObj = {
        id: Date.now(),
        materia,
        titulo,
        descripcion,
        fecha
    }

    tareas = [...tareas, tareasObj]
    console.log(tareas)

    agregarHTML();

    formulario.reset();
}
function mostrarAlerta(texto){
    alert(texto);

}
function agregarHTML(){
    limpiarHTML();
    if(tareas.length > 0){
        tareas.forEach(tarea => {
            const div = document.createElement('div');
            div.classList.add('tarea');
            div.dataset.TareaId = tarea.id
            div.innerHTML = `
                <p class="titulo"> ${tarea.titulo} </p>
                <div class='cont'>
                    <p class="descripcion" id="descrip"> ${tarea.descripcion} </p>
                    <p class="fecha"> ${tarea.fecha} </p>
                    <input type="button" value="Finalizada" class="btn borrar" id='${tarea.id}'>
                </div>
                <div class="abajo"></div>
            `;


            
            switch( Number( tarea.materia )  ){
                case 1:
                    listaContabilidad.appendChild(div);
                    break;
                case 2:
                    listaMatematica.appendChild(div);
                    break;
                case 3:
                    listaMicroeconomia.appendChild(div);
                    break; 
                case 4:
                    listaAdministracion.appendChild(div);
                    break; 
                case 5:
                    listaMercadotecnia.appendChild(div);
                    break; 
            }

        });
    }

    sincronizarStorage();
}
function limpiarHTML(){
    while(listaAdministracion.firstChild) {
        listaAdministracion.removeChild(listaAdministracion.firstChild);
    }
    while(listaContabilidad.firstChild) {
        listaContabilidad.removeChild(listaContabilidad.firstChild);
    }
    while(listaMatematica.firstChild) {
        listaMatematica.removeChild(listaMatematica.firstChild);
    }
    while(listaMercadotecnia.firstChild) {
        listaMercadotecnia.removeChild(listaMercadotecnia.firstChild);
    }
    while(listaMicroeconomia.firstChild) {
        listaMicroeconomia.removeChild(listaMicroeconomia.firstChild);
    }

}
function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
function borrarTarea(e){
    e.preventDefault();
    const id = e.target.parentElement.parentElement.dataset.TareaId;
    const dato = e.target.parentElement.innerText.length;
    const kMateria = e.target.parentElement.parentElement.parentElement.id;

    if(dato > 2200){
        mostrarAlerta('UFF esa tarea se vio que estuvo larga, Lo bueno es que ya la terminamos y la podemos mandar a la chingada de una vez, has click para eliminarla de una vez por todas')
    }
    else if(dato > 1300){
        mostrarAlerta('Tarea larga? Bueno ya no hay mucho de que preocuparnos, Felicidades por terminarla, eres la mejor, siempre lo seras, sigue asi gg')
    }
    if (kMateria === 'matematica') {
        mostrarAlerta('Pinche mate, almenos ya la terminamos UwU a borrarlo...');
    }

    tareas = tareas.filter( tarea => tarea.id != id  );
    agregarHTML();
}
