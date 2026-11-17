// Unidad: Clases y el valor de this
// Ejecuta: node this.js
//
// 1. Ejecútalo: func() imprime 42 porque se llama como test.func().
// 2. Descomenta el setTimeout y vuelve a ejecutarlo. ¿Qué imprime ahora y por
//    qué? Recuerda la regla: this depende de cómo se llama la función.
//    Ahora imprime undefined, ya que en este caso el this solo lo busca en el 
//    ámbito del método setTimeout() y como no encuentra prop lo devuelve undefined. 
// 3. Arréglalo de dos formas distintas:
//    a) cambiando la function del setTimeout por una función flecha;
//    b) guardando la función con .bind(this).
// 4. ¿Qué pasa si conviertes func en función flecha (func: () => {...})?
//    Explícalo.
// Devuelve undefined

const test = {
  prop: 42,
  func1: function () {
    setTimeout(function () {
      console.log(this.prop)
    }.bind(this), 1000)
  },
  func2: function () {
    setTimeout(() => {
      console.log(this.prop)
    }, 1000)
  },
  func3: () => {
    setTimeout(() => {
      console.log(this.prop)
    }, 1000)
  }
}

test.func1()
test.func2()
test.func3()