// Unidad: Formularios y validación en cliente
// Ejecuta: node main.js
//
// La validación del navegador se puede saltar, así que el servidor tiene que
// repetirla. Escribe la función que usaría el servidor (o cualquier código
// que reciba los datos sin pasar por el formulario).
//
// validarRegistro(datos) recibe un objeto como el que da
// Object.fromEntries(new FormData(formulario)): TODOS los valores son textos.
// Devuelve un objeto con un mensaje por cada campo que no sea válido; si todo
// es correcto, un objeto vacío {}.
//
// Reglas (el texto exacto de cada mensaje está en los tests):
// - nombre: obligatorio; sin contar espacios al principio y al final, al
//   menos 2 caracteres.
// - email: obligatorio y con forma de correo: algo, una @, algo, un punto y
//   algo. Pista: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// - edad: opcional. Si viene (y no es ''), debe ser un número ENTERO entre
//   16 y 99. Ojo: '17.5', 'abc' y '' no se tratan igual.
// - password: al menos 8 caracteres y al menos un dígito.
// - repetir: igual que password.
//
// Sólo se informa del primer error de cada campo.

const assert = require('node:assert/strict')

function validarRegistro(datos) {
}

// ---- Tests (no los modifiques) ----
const valido = { nombre: 'Ana', email: 'ana@correo.es', edad: '17', password: 'secreto123', repetir: 'secreto123' }

assert.deepStrictEqual(validarRegistro(valido), {})
assert.deepStrictEqual(validarRegistro({ ...valido, edad: '' }), {}, 'la edad es opcional')

assert.deepStrictEqual(validarRegistro({ ...valido, nombre: '   ' }), { nombre: 'El nombre es obligatorio' })
assert.deepStrictEqual(validarRegistro({ ...valido, nombre: ' A ' }), { nombre: 'El nombre debe tener al menos 2 caracteres' })

assert.deepStrictEqual(validarRegistro({ ...valido, email: '' }), { email: 'El correo es obligatorio' })
assert.deepStrictEqual(validarRegistro({ ...valido, email: 'ana@correo' }), { email: 'El correo no es válido' })
assert.deepStrictEqual(validarRegistro({ ...valido, email: 'ana correo@x.es' }), { email: 'El correo no es válido' })

assert.deepStrictEqual(validarRegistro({ ...valido, edad: 'abc' }), { edad: 'La edad debe ser un número entero' })
assert.deepStrictEqual(validarRegistro({ ...valido, edad: '17.5' }), { edad: 'La edad debe ser un número entero' })
assert.deepStrictEqual(validarRegistro({ ...valido, edad: '15' }), { edad: 'La edad debe estar entre 16 y 99' })
assert.deepStrictEqual(validarRegistro({ ...valido, edad: '100' }), { edad: 'La edad debe estar entre 16 y 99' })

assert.deepStrictEqual(validarRegistro({ ...valido, password: 'corta1', repetir: 'corta1' }),
    { password: 'La contraseña debe tener al menos 8 caracteres' })
assert.deepStrictEqual(validarRegistro({ ...valido, password: 'sinnumeros', repetir: 'sinnumeros' }),
    { password: 'La contraseña debe incluir un número' })
assert.deepStrictEqual(validarRegistro({ ...valido, repetir: 'otra123456' }), { repetir: 'Las contraseñas no coinciden' })

// varios errores a la vez, uno por campo
assert.deepStrictEqual(validarRegistro({ nombre: '', email: 'x', edad: '200', password: '1', repetir: '' }), {
    nombre: 'El nombre es obligatorio',
    email: 'El correo no es válido',
    edad: 'La edad debe estar entre 16 y 99',
    password: 'La contraseña debe tener al menos 8 caracteres',
    repetir: 'Las contraseñas no coinciden',
})

// alguien envía la petición a mano, sin algunos campos
assert.deepStrictEqual(Object.keys(validarRegistro({ email: 'ana@correo.es' })).sort(),
    ['nombre', 'password', 'repetir'])

console.log('Test OK')
