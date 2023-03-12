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
    const [animation, setAnimation] = useState(true);

    const animationClick = () => {
        setAnimation(!animation);
        const isAnimation = !animation
        if (isAnimation === false) {
            const nameServicediv = document.querySelector('.nameService');
            const descriptiondiv = document.querySelector('.description');
            const pricediv = document.querySelector('.price');
            const zonediv = document.querySelector('.zone');
            const time_unitdiv = document.querySelector('.time_unit');
            const time_magnituddiv = document.querySelector('.time_magnitud');
            const imagediv = document.querySelector('.image');

            const addclass = [nameServicediv, descriptiondiv, pricediv, zonediv, time_magnituddiv, time_unitdiv, imagediv]
            let delay = 50;
            for (let i = 0; i < addclass.length; i++) {
                setTimeout(() => {
                    const e = addclass[i];
                    e.classList.add('Create_Service_inputs_animation');
                }, delay);
                delay += 50;
            }
        }

    };

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
            console.log(err.response.data.res);
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


    return (
        <section id="Create_Service_section">
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
                <button>aaaa</button>
            </form>
            <button onClick={animationClick}> {"-->"} </button>
            <div>
                a
            </div>
        </section>
    )
} 