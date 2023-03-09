import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import TextareaAutosize from "react-textarea-autosize"
import service from "../../services/service"
import "../../static/styles/Service/Create_service.css"

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

            const resCreateServiceBasic =await service.createServiceBasic(formData)
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


    return (
        <section id="Create_Service_section">
            <form onSubmit={HandleSubmit} id="Create_Service_form">
                <div className="Create_Service_inputs">
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
                        maxRows={6}
                        autoFocus
                        placeholder="Ingrese el titulo"
                        id="Create_Service_title"
                    />
                </div>
                <div className="Create_Service_inputs">
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
                        placeholder="Ingrese el titulo"
                        id="Create_Service_title"
                    />
                </div>
                <div className="Create_Service_inputs">
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
                        placeholder="Ingrese el titulo"
                        id="Create_Service_title"
                    />
                </div>
                <div className="Create_Service_inputs">
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
                        placeholder="Ingrese el titulo"
                        id="Create_Service_title"
                    />
                </div>
                <div className="Create_Service_inputs">
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
                        placeholder="Ingrese el titulo"
                        id="Create_Service_title"
                    />
                </div>
                <div className="Create_Service_inputs">
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
                        placeholder="Ingrese el titulo"
                        id="Create_Service_title"
                    />
                </div>
                <div className="Create_Service_inputs">
                    <label htmlFor="Create_Service_title">Titulo</label>
                    <input
                        onChange={handleFileChange}
                        name="image"
                        type="file"
                        placeholder="Ingrese una imagen para el servicio"
                        id="Create_Service_title"
                    />
                </div>
                <button>s</button>
            </form>
        </section>
    )
} 