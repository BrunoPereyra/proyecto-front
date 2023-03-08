import { useState } from "react"
import { useNavigate } from "react-router-dom"
import service from "../services/service"

export function Form_signup() {
    let navigate = useNavigate()
    const [Inputs, setInputs] = useState({
        nameUser: "",
        fullName: "",
        Email: "",
        password: "",
    })
    const buttonClass = (
        Inputs.nameUser.length > 5 &&
            Inputs.password.length > 8 &&
            Inputs.Email.length > 10 &&
            Inputs.fullName.length > 5 ?
            "button_actived" : "button_desactived"
    )
    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (Inputs.nameUser.length > 5 &&
            Inputs.password.length > 8 &&
            Inputs.Email.length > 10 &&
            Inputs.fullName.length > 5) {
            try {
                var res = await service.createUser(Inputs)
                if (res.data.ress.token) {
                    window.localStorage.setItem(
                        "loggedAppUser", JSON.stringify(res.data)
                    )
                    navigate("/home")
                } else {
                    console.log(res.data.ress)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    const HandleChange = (e) => {
        setInputs({
            ...Inputs,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <section id="signup_section_form">
            <form onSubmit={HandleSubmit} id="form_Signup" >
                <input
                    value={Inputs.nameUser}
                    onChange={HandleChange}
                    type="text"
                    placeholder="Nombre de usuario"
                    id="name_user_signup"
                    className="inputs"
                    name="nameUser"
                />
                <input
                    value={Inputs.fullName}
                    onChange={HandleChange}
                    type="text"
                    placeholder="Nombre Completo"
                    id="full_name_signup"
                    className="inputs"
                    name="fullName"
                />
                <input
                    value={Inputs.Email}
                    onChange={HandleChange}
                    type="email"
                    placeholder="Correo electronico"
                    id="email_signup"
                    className="inputs"
                    name="Email"
                />
                <input
                    value={Inputs.password}
                    onChange={HandleChange}
                    type="password"
                    placeholder="contraseña"
                    id="password_signup"
                    className="inputs"
                    name="password"
                />
                <button id="a">Registrarte</button>
            </form>
        </section>
    )
}
