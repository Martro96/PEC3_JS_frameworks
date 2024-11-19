interface Plane{
    model:string,
    npassengers:number
}
// let myHangar:HangarHash = {}
// Definimos el objeto myHangar de tipo Record<string, Plane> porque va a ser un listado de clave valor
let myHangar: Record<string, Plane> = {};

myHangar['123Z']={
    model:'airbus',
    npassengers:200
}
myHangar['H789']={ 
    model:'boeing',
    npassengers:151
}
// Recorrer el objeto y mostrar las claves y valores
Object.entries(myHangar).forEach(([key, plane]) => {
    console.log(`${key}: ${plane.model} (${plane.npassengers})`);
});

/** Print following lines (going through the object)
 * 123Z:airbus(200)
 * H789:boeing(151)
 */
