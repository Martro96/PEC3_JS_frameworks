
# Análisis y Comparativa de JavaScript vs TypeScript en Ejer1

## Código en JavaScript (Ejer1.js)

```javascript
let dog;

dog = {
  kind: "mammal",
  weight: 10
};

dog = {
  kind: true, // Aquí vemos un error potencial ya que el tipo de dato pasa de string a boolean
  weight: 10
};

function baby(dog1, dog2) {
  return {
    kind: dog1.kind,
    weight: (dog1.weight + dog2.weight) / 4
  };
}
```

### Análisis de Ejer1.js
1. **Sin Tipado Estático**: En este código, la variable `dog` no tiene un tipo definido. Esto permite asignar valores con tipos diferentes, como `kind: true` en la segunda asignación, lo que puede causar errores en tiempo de ejecución.
2. **Falta de Tipos en Parámetros de Función**: La función `baby` no especifica los tipos de sus parámetros (`dog1` y `dog2`). Esto permite pasar cualquier tipo de dato a la función sin errores en tiempo de desarrollo, lo que puede llevar a errores no detectados hasta que se ejecute el código.
3. **Legibilidad y Mantenimiento**: Sin una estructura fija para `dog`, puede ser dificil para otros desarrolladores entender el código y cuáles son los tipos correctos de cada propiedad.

## Código en TypeScript (Ejer1.ts)

```typescript
interface Dog { //Utiliza la interface para establecer qué propiedades tiene que tener el objeto Dog
  kind: string;
  weight: number;
}

let dog: Dog;

dog = {
  kind: "mammal",
  weight: 10
};

dog = {
  kind: true, // De igual manera que en el ejercicio con js, este parámetro se cambia pero ahora el error sí es detectado por TypeScript ya que no coincide con lo que se ha pautado en la interfaz
  weight: 10
};

function baby(dog1: Dog, dog2: Dog): Dog { //Aquí sí que se especifican los parámetros esperados
  return {
    kind: dog1.kind,
    weight: (dog1.weight + dog2.weight) / 4
  };
}
```

### Análisis de Ejer1.ts
1. **Tipado Estático mediante Interfaces**: La interfaz `Dog` define que `kind` debe ser de tipo `string` y `weight` de tipo `number`. TypeScript genera un error cuando `kind` es asignado a un valor `boolean` en lugar de un `string`, ayudando a prevenir errores en tiempo de desarrollo.
2. **Tipos en Parámetros y Retorno de Función**: La función `baby` ahora recibe dos objetos `Dog` y devuelve otro objeto `Dog`. Esto hace que el tipo de los datos esperados sea claro, y TypeScript lanzará un error si se intenta pasar un objeto diferente.
3. **Mayor Legibilidad y Documentación Implícita**: La estructura fija de `Dog` con `kind` y `weight` ayuda a otros desarrolladores a entender el código rápidamente y a trabajar de forma más segura.

## Comparativa entre JavaScript y TypeScript
1. **Tipado Estático**
En JavaScript, las variables y funciones no tienen un tipo fijo, por lo que puedes cambiar el tipo de dato de una variable sin problemas, pero esto puede causar errores inesperados.
En TypeScript, puedes definir qué tipo de dato debe tener cada variable o función, usando interfaces (como Dog en el ejemplo). Esto hace que el código sea más seguro porque ayuda a detectar errores si intentas asignar algo que no encaja con el tipo que definiste.

2. **Detección de Errores**
JavaScript detecta errores solo cuando ejecutas el código, lo que significa que algunos errores pueden pasar desapercibidos mientras escribes.
TypeScript, en cambio, te avisa de los errores mientras estás programando. Por ejemplo, si le asignas un valor de tipo incorrecto a una propiedad, TypeScript te muestra el error antes de que el código se ejecute, lo cual ahorra tiempo y evita problemas.

3. **Tipos en Funciones**
En JavaScript, no se especifica qué tipos deben tener los parámetros o el valor de retorno en las funciones, así que podrías pasar cualquier cosa.
Con TypeScript, puedes especificar qué tipos deben tener los parámetros y el valor de retorno de cada función. Esto garantiza que la función reciba solo los tipos de datos que espera, haciendo el código más confiable y fácil de entender.

4. **Legibilidad**
JavaScript puede resultar un poco menos claro cuando se trata de saber qué tipo de datos deberíamos pasar o recibir en una función, lo que hace que el código dependa de explicaciones adicionales o comentarios.
En TypeScript, al tener definidos los tipos y las interfaces, el código es más fácil de leer y entender de inmediato, ya que el tipo esperado está incluido en el código mismo.

## Conclusión

TypeScript tiene una estructura que ayuda a detectar errores de tipo antes de ejecutar el código, mejora la legibilidad y facilita el mantenimiento. Aunque puede resultar un poco más complejo ya que considero que al "dejarse todo mas atado", requiere especificar más información, y en proyectos pequeños podría ser más trabajoso de lo necesario. 

Sin embargo, en proyectos grandes o en equipo, TypeScript parece útil porque previene errores comunes y facilita la colaboración entre desarrolladores.
