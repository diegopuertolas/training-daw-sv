// Utilidades de formato. Exportaciones con nombre.

function redondear(valor, decimales = 2) {
    const factor = 10 ** decimales
    return Math.round(valor * factor) / factor
}

export function precio(valor) {
    return `${redondear(valor).toFixed(2)} €`
}

export function fecha(iso) {
    const [anio, mes, dia] = iso.split('-')
    return `${dia}/${mes}/${anio}`
}
