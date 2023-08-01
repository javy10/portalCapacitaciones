const Prueba = {
    nombre: "Prueba",
    encargados: {
        1010: {
            Nombre: "Jonathan",
            Cargo: "Analista",
            edad: 25
        },
        1020: {
            Nombre: "Erick",
            Cargo: "Jefe",
            edad: 30
        }
    },
    Participantes: [
        { nombres: "Ronal", genero: 'M'},
        { nombres: "Amilcar", genero: 'M'},
        { nombres: "Jose", genero: 'M'},
        { nombres: "Pedro", genero: 'M'},
        
    ]
}

const { encargados: { 1020: { Nombre: nombreErick, edad: edadErick } } } = Prueba;
console.log(Prueba)