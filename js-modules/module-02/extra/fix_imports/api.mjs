// Comunicación con el servidor. Una exportación por defecto.

export default async function pedirJSON(url, opciones) {
    const response = await fetch(url, opciones)
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json()
}
