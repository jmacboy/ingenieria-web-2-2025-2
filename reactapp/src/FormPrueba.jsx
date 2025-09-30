import { useState } from "react";

const FormPrueba = () => {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("")
    const [ciudad, setCiudad] = useState("")
    return (
        //Fragment <></> no siempre es necesario, pero si un parent
        <>
            <div>
                <label>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => {
                    setNombre(e.target.value);
                }} />
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" value={apellido} onChange={(e) => {
                    setApellido(e.target.value);
                }} />
            </div>
            <div>
                <label>Ciudad</label>
                <input type="text" value={ciudad} onChange={(e) => {
                    setCiudad(e.target.value);
                }} />
            </div>
            <br />
            Mi nombre es: {nombre} {apellido}
        </>
    );
}

export default FormPrueba;