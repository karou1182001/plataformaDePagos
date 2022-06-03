import React from 'react';
function RegistrarTarjetaPSE(){
    return(
        <form method="post">
             <p>Nombre: <input type="text" name="nombre" size="40"></input></p>
             <p>Año de nacimiento: <input type="number" name="nacido" min="1900"></input></p>
             <p>Sexo:
             <input type="radio" name="hm" value="h"></input> Hombre
             <input type="radio" name="hm" value="m"></input> Mujer
            </p>
            <button type="submit">Registrar</button>
        </form>
    )
}
export default RegistrarTarjetaPSE