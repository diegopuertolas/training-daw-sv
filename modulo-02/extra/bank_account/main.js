// Unidad: Clases y el valor de this
// Ejecuta: node main.js
//
// 1. Escribe la clase Cuenta:
//    - constructor(titular, saldoInicial = 0).
//    - El saldo es un campo PRIVADO (#saldo): desde fuera sólo se lee con el
//      getter saldo, y no se puede cambiar asignándolo.
//    - ingresar(cantidad): si cantidad no es un número mayor que 0, lanza un
//      RangeError('Cantidad no válida'). Si lo es, la suma al saldo.
//    - retirar(cantidad): misma comprobación que ingresar; si no hay saldo
//      suficiente, lanza un Error('Saldo insuficiente').
//    - movimientos(): devuelve una COPIA del historial, un array de números
//      (positivos para ingresos, negativos para retiradas). El saldo inicial
//      no cuenta como movimiento.
//    - Una propiedad ESTÁTICA totalCuentas que cuente cuántas cuentas se han
//      creado con new (de cualquier tipo).
// 2. Escribe CuentaAhorro, que extiende Cuenta:
//    - constructor(titular, saldoInicial, interes): interes es un tanto por
//      uno (0.02 es un 2 %).
//    - aplicarInteres(): ingresa saldo × interes, redondeado a céntimos.
//    - retirar(cantidad): no permite retirar más de 500 de una vez (lanza un
//      Error('Límite de 500 por retirada')). Si cumple el límite, delega en
//      el retirar de Cuenta con super.
//
// Pregunta: ¿por qué CuentaAhorro no puede leer this.#saldo, aunque herede de
// Cuenta? ¿Cómo lo resuelve aplicarInteres?

const assert = require('node:assert/strict')

// ---- Tests (no los modifiques) ----
const ana = new Cuenta('Ana', 100)
assert.strictEqual(ana.titular, 'Ana')
assert.strictEqual(ana.saldo, 100)
assert.strictEqual(new Cuenta('Luis').saldo, 0, 'el saldo inicial por defecto es 0')

ana.ingresar(50)
ana.retirar(30)
assert.strictEqual(ana.saldo, 120)
assert.deepStrictEqual(ana.movimientos(), [50, -30])

assert.throws(() => ana.ingresar(-5), RangeError)
assert.throws(() => ana.ingresar('50'), RangeError)
assert.throws(() => ana.retirar(0), RangeError)
assert.throws(() => ana.retirar(1000), { message: 'Saldo insuficiente' })
assert.strictEqual(ana.saldo, 120, 'una operación fallida no cambia el saldo')

// el saldo es privado
assert.ok(!Object.keys(ana).includes('saldo'), 'saldo no debe ser una propiedad normal')
try { ana.saldo = 1e6 } catch { /* en modo estricto, asignar a un getter lanza */ }
assert.strictEqual(ana.saldo, 120, 'el saldo no se puede cambiar asignándolo')

// movimientos devuelve una copia
ana.movimientos().push(9999)
assert.deepStrictEqual(ana.movimientos(), [50, -30])

// herencia
const hucha = new CuentaAhorro('Eva', 1000, 0.025)
assert.ok(hucha instanceof Cuenta)
assert.strictEqual(hucha.titular, 'Eva')
hucha.aplicarInteres()
assert.strictEqual(hucha.saldo, 1025)
assert.throws(() => hucha.retirar(600), { message: 'Límite de 500 por retirada' })
hucha.retirar(500)
assert.strictEqual(hucha.saldo, 525)
assert.deepStrictEqual(hucha.movimientos(), [25, -500])
assert.throws(() => new CuentaAhorro('Iker', 10, 0).retirar(20), { message: 'Saldo insuficiente' },
    'CuentaAhorro también debe comprobar el saldo (super.retirar)')

// los métodos están en el prototipo, no copiados en cada objeto
assert.ok(!Object.hasOwn(ana, 'ingresar'))
assert.strictEqual(ana.ingresar, new Cuenta('Sara').ingresar)

// contador estático: ana, Luis, hucha, Iker y Sara
assert.strictEqual(Cuenta.totalCuentas, 5)
assert.strictEqual(ana.totalCuentas, undefined, 'totalCuentas es de la clase, no de cada objeto')

console.log('Test OK')
