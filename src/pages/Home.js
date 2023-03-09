import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Post_service from "../services/service"

import "../static/styles/home.css"
import home from "../static/icons/e1197754a44d9407e4cdbf4678ae3487.png"
import msj from "../static/icons/e0545f303ed3d5d29c3330f385ef7fe2.png"

export function Home() {
    const [InputHome, SetInputHome] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        let loggedUser = window.localStorage.getItem("loggedAppUser")
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            Post_service.setToken(userStorage.token)
        } else {
            navigate("/login")
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        if (InputHome.length >= 1) {
            navigate(`/services?${"refService=" + InputHome}`)
        }
    }

    const onHandler = (e) => {
        SetInputHome(e.target.value)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <section id="Home">
            <header id="header_home">
                <div id="nav_home">
                    <div id="div_imgperfil_home" >
                        {isMenuOpen && (

                            <ul id="profile_menu" className='active'>
                                <div onClick={toggleMenu} id="img_perfil_home_ul">P</div>
                                <li><Link to="/SubscriptioCreate">Subscriptio</Link></li>
                                <li><Link to="/Perfil">Perfil</Link></li>
                                <li><Link to="/serviceCreate">crear servicio</Link> </li>
                            </ul>
                        )}
                        <div onClick={toggleMenu} id="img_perfil_home">P</div>
                    </div>
                    <div id="logo_home">logo</div>
                    <div></div>
                </div>
            </header>
            <div id="search_home_div">
                <form onSubmit={onSubmit}>
                    <input
                        onChange={onHandler}
                        name="InputHome"
                        id="searchService_home_input"
                        type="text" />
                    <button></button>
                </form>
            </div>
            <div id="div_popular_services">
                <h3>Servicios Populares</h3>
                <div>

                </div>
            </div>
            <div id="according_last_search">
                <h3>según últimas búsqueda</h3>
                <div>

                </div>
            </div>
            <nav id="nav_home">
                <div id="nav_div_home">
                    <img src={home} className="iconHome" alt="Icon home" />
                    <img src={msj} className="iconHome" alt="Icon msj" />
                </div>
            </nav>
        </section>
    )
}
