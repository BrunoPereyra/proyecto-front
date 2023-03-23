import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import TextareaAutosize from "react-textarea-autosize"


import { FilaServicio } from "./FilaServicio"
import service from "../../../services/service"
import "../../../static/styles/Service/Create_service.css"


export function Create_Service() {
    let navigate = useNavigate()

    const [Inputs, setInputs] = useState({
        nameService: "",
        description: "",
        zone: "",
        price: "123",
        time_unit: "1",
        time_magnitud: "/d",
    })
    const [selectedFile, setSelectedFile] = useState("");
    const [state, setState] = useState(false)

    useEffect(() => {
        let loggedUser = window.localStorage.getItem("loggedAppUser")
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            service.setToken(userStorage.token)
        } else {
            navigate("/login")
        }
    })

    const HandleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append("nameService", Inputs.nameService);
        formData.append("description", Inputs.description);
        formData.append("zone", Inputs.zone);
        formData.append("price", Inputs.price);
        formData.append("time_unit", Inputs.time_unit);
        formData.append("time_magnitud", Inputs.time_magnitud);
        formData.append("image", selectedFile);


        try {
            const resCreateServiceBasic = await service.createServiceBasic(formData)
            console.log(resCreateServiceBasic);

        } catch (err) {
            if (err.response.data.error == "token invalid or user not exist") {
                navigate("/login")
            } else {
                console.log("ERROR");
            }
        }
        // setInputs({
        //     nameService: "",
        //     description: "",
        //     zone: "",
        //     price: "",
        //     time_unit: "",
        //     time_magnitud: ""
        // })
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...Inputs,
            [name]: value,
        })
    }

    const [servicios, setServicios] = useState([]);


    const actualizarServicio = (indice, campo, valor) => {
        const serviciosActualizados = servicios.map((servicio, i) => {
            if (i === indice) {
                return { ...servicio, [campo]: valor };
            }
            return servicio;
        });
        setServicios(serviciosActualizados);
        console.log(servicios);
    };

    const eliminarServicio =  (servicioAEliminar) => {
        const nuevosServicios =  servicios.filter((servicio) => servicio.id !== servicioAEliminar.id);
        console.log(nuevosServicios);
        setServicios(nuevosServicios);
      };

    
    const agregarServicio = () => {
        setServicios([
          ...servicios,
          {
            id: servicios.length > 0 ? servicios[servicios.length - 1].id + 1 : 1,
            servicio: "",
            descripcion: "",
            precio: "",
            tiempoEntrega: "",
          },
        ]);
    };
    return (
        <section id="Create_Service_section">
            {
                state ?


                    <form onSubmit={HandleSubmit} id="Create_Service_form">
                        <div className={
                            "Create_Service_inputs nameService"
                        }>
                            <label htmlFor="Create_Service_title">Titulo</label>
                            <TextareaAutosize
                                onChange={HandleChange}
                                name="nameService"
                                value={Inputs.nameService}
                                type="text"
                                style={{
                                    width: "100%",
                                    height: "20%",
                                    resize: "vertical",
                                    overflow: "auto"
                                }}
                                minRows={1}
                                maxRows={5}
                                autoFocus
                                placeholder="Nombre del servicio "
                                id="Create_Service_title"
                                className="TextareaAutosize_inputs"

                            />
                        </div>
                        <div className={
                            "Create_Service_inputs description"
                        }>
                            <label htmlFor="Create_Service_title">Titulo</label>
                            <TextareaAutosize
                                onChange={HandleChange}
                                name="description"
                                value={Inputs.description}
                                type="text"
                                style={{
                                    width: "100%",
                                    height: "20%",
                                    resize: "vertical",
                                    overflow: "auto"
                                }}
                                minRows={1}
                                maxRows={6}
                                autoFocus
                                placeholder="Descripcion del servicio"
                                id="Create_Service_title"
                                className="TextareaAutosize_inputs"

                            />
                        </div>
                        <div className={
                            "Create_Service_inputs price"
                        }>
                            <label htmlFor="Create_Service_title">Titulo</label>
                            <TextareaAutosize
                                onChange={HandleChange}
                                name="price"
                                value={Inputs.price}
                                type="text"
                                style={{
                                    width: "100%",
                                    height: "20%",
                                    resize: "vertical",
                                    overflow: "auto"
                                }}
                                minRows={1}
                                maxRows={6}
                                autoFocus
                                placeholder="Precio del servicio"
                                id="Create_Service_title"
                                className="TextareaAutosize_inputs"
                            />
                        </div>
                        <div className={
                            "Create_Service_inputs zone"
                        }>
                            <label htmlFor="Create_Service_title">Titulo</label>
                            <TextareaAutosize
                                onChange={HandleChange}
                                type="text"
                                name="zone"
                                value={Inputs.zone}
                                style={{
                                    width: "100%",
                                    height: "20%",
                                    resize: "vertical",
                                    overflow: "auto"
                                }}
                                minRows={1}
                                maxRows={6}
                                autoFocus
                                placeholder="Zona en que da el servicio"
                                id="Create_Service_title"
                                className="TextareaAutosize_inputs"

                            />
                        </div>
                        <div className={
                            "Create_Service_inputs time_unit"
                        }>
                            <label htmlFor="Create_Service_title">Titulo</label>
                            <TextareaAutosize
                                onChange={HandleChange}
                                value={Inputs.time_unit}
                                name="time_unit"
                                type="text"
                                style={{
                                    width: "100%",
                                    height: "20%",
                                    resize: "vertical",
                                    overflow: "auto"
                                }}
                                minRows={1}
                                maxRows={6}
                                autoFocus
                                placeholder="time_unit"
                                id="Create_Service_title"
                                className="TextareaAutosize_inputs"

                            />
                        </div>
                        <div className={
                            "Create_Service_inputs time_magnitud"
                        }>
                            <label htmlFor="Create_Service_title">Titulo</label>
                            <TextareaAutosize
                                onChange={HandleChange}
                                name="time_magnitud"
                                value={Inputs.time_magnitud}
                                type="text"
                                style={{
                                    width: "100%",
                                    height: "20%",
                                    resize: "vertical",
                                    overflow: "auto"
                                }}
                                minRows={1}
                                maxRows={6}
                                autoFocus
                                placeholder="time_magnitud"
                                id="Create_Service_title"
                                className="TextareaAutosize_inputs"

                            />
                        </div>
                        <div className={
                            "Create_Service_inputs image"
                        }>
                            <label htmlFor="Create_Service_title">Titulo</label>
                            <input
                                onChange={handleFileChange}
                                name="image"
                                type="file"
                                placeholder="Ingrese una imagen para el servicio"
                                id="Create_Service_title"
                            />
                        </div>
                    </form>
                    :
                    <div className="Create_Service_v2">
                        <button className="Create_Service_v2_agregarServicio_button" onClick={agregarServicio}>Agregar servicio</button>
                        <table id="Create_Service_v2_table">
                            <thead className="Create_Service_v2_thead_fixed">
                                <tr>
                                    <th className="th_table th_table_servicio" >Servicio</th>
                                    <th className="th_table th_table_description" >Descripción</th>
                                    <th className="th_table th_table_precio" >Precio</th>
                                    <th className="th_table th_table_tiempo" >Tiempo de entrega</th>
                                    <th className="th_table th_table_acciones" >Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicios.map((servicio, i) =>
                                (
                                    <FilaServicio
                                        key={servicio.id}
                                        indice={i}
                                        servicio={servicio}
                                        actualizarServicio={actualizarServicio}
                                        eliminarServicio={eliminarServicio}
                                    />
                                ))}
                            </tbody>
                        </table>

                    </div>
            }
            <button
                onClick={() => setState(!state)}
                style={{
                    width: "auto",
                    height: "auto"
                }}>
                --a--
            </button>
        </section>
    )
}

