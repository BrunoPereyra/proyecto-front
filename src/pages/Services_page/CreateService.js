import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import TextareaAutosize from "react-textarea-autosize"
import service from "../../services/service"
import "../../static/styles/Service/Create_service.css"
export function Create_Service() {
    let navigate = useNavigate()
    const [Inputs, setInputs] = useState({
        title: "",
        description: "",
        zone: "",
        price: "",
        time_unit: "",
        time_magnitud: ""
    })

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
        //  await service.createServiceBasic()

        setInputs({
            title: "",
            description: "",
            zone: "",
            price: "",
            time_unit: "",
            time_magnitud: ""
        })
    }
    const HandleChange = (e) => {
        setInputs({
            ...Inputs,
            [e.target.name]: e.target.value,
        })
    }


    return (
        <section id="Create_Service_section">
            <form onSubmit={HandleSubmit} id="Create_Service_form">
                <div className="Create_Service_inputs">
                    <label htmlFor="Create_Service_title">Titulo</label>
                    <TextareaAutosize
                        onChange={HandleChange}
                        name="title"
                        value={Inputs.title}
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
                <button>s</button>
            </form>
        </section>
    )
} 