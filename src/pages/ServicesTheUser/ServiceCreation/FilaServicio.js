import { useState } from "react"

export function FilaServicio({ indice, servicio, actualizarServicio, eliminarServicio }) {
    const [servicioActual, setServicioActual] = useState(servicio);
    const actualizarCampo = (evento) => {
        const campo = evento.target.name;
        const valor = evento.target.value;
        setServicioActual({ ...servicioActual, [campo]: valor });
        actualizarServicio(indice, campo, valor);
    };

    const handleEliminar = () => {
        console.log(servicioActual);
        eliminarServicio(servicioActual);
    };

    return (
        <tr className="FilaServicio">
            <td className="th_table th_table_servicio">
                <input  type="text" name="servicio" value={servicioActual.servicio} onChange={actualizarCampo} />
            </td>
            <td className="th_table">
                <input type="text" name="descripcion" value={servicioActual.descripcion} onChange={actualizarCampo} />
            </td>
            <td className="th_table">
                <input  type="text" name="precio" value={servicioActual.precio} onChange={actualizarCampo} />
            </td>
            <td className="th_table">
                <input  type="text" name="tiempoEntrega" value={servicioActual.tiempoEntrega} onChange={actualizarCampo} />
            </td>
            <td className="th_table">
                <button  onClick={() => handleEliminar()}>Eliminar</button>
            </td>
        </tr>
    );
}
