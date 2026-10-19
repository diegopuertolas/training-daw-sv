// Unidad: Propagación y delegación de eventos
// No modifiques este fichero: léelo y predice. Las instrucciones están en
// index.html.

const tienda = document.querySelector('#tienda')
const producto = document.querySelector('#producto')
const acciones = document.querySelector('#acciones')
const comprar = document.querySelector('#comprar')
const borrar = document.querySelector('#borrar')

function registrar(nombre) {
    return (e) => {
        const fases = { 1: 'captura', 2: 'destino', 3: 'burbuja' }
        console.log(`${nombre} · fase ${fases[e.eventPhase]} · target: ${e.target.id} · currentTarget: ${e.currentTarget.id}`)
    }
}

tienda.addEventListener('click', registrar('tienda'), { capture: true })
tienda.addEventListener('click', registrar('tienda'))

producto.addEventListener('click', registrar('producto'))

acciones.addEventListener('click', registrar('acciones'), { capture: true })
acciones.addEventListener('click', registrar('acciones'))

comprar.addEventListener('click', registrar('comprar'))

borrar.addEventListener('click', (e) => {
    registrar('borrar')(e)
    e.stopPropagation()
})

document.addEventListener('click', () => console.log('document · fin del recorrido'))
