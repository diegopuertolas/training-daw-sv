const fs = require('node:fs/promises');

fs.readFile('app.log', 'utf-8')
  .then((content) => {
    const data = content
      .split('\n')
      .filter(linea => linea.toLowerCase().includes('error'))
      .map(linea => {
        const lineaJunta = linea.split(' ') 
        // [[2026-10-19],[10:02:15],[ERROR],[Fallo],[de],[conexion],[a],[la],[base],[de],[datos]]
        const [fecha, hora, ...resto] = lineaJunta
        // fecha = 2026-10-19 
        // hora = 10:02:15
        // resto = [[ERROR],[Fallo],[de],[conexion],[a],[la],[base],[de],[datos]]
        const mensaje = resto.join(' ')
        return {
          fecha: `${fecha} ${hora}`,
          mensaje
        }
      })
    fs.writeFile('reporte_errores.json', JSON.stringify(data))
  })
  .catch((error) => {
    console.log('error al leer el archivo', error)
  })