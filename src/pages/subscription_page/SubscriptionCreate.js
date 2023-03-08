import { useEffect, useState } from "react"
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import SubscriptionService from "../../services/Subscription"

import "../../static/styles/subscription/SubscriptionCreate.css"


export function SubscriptioCreate() {
    let navigate = useNavigate()
    const [RedirectMercadoPago, setRedirectMercadoPago] = useState()

    function esUrl(url) {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/
        return regex.test(url)
    }

    const Subscription = async () => {
        try {
            const res = await SubscriptionService.createsubscripcion()
            console.log(res.data.res)
            if (esUrl(res.data.res)) {
                setRedirectMercadoPago(res.data.res)
            } else {
                console.log(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let loggedUser = window.localStorage.getItem("loggedAppUser")
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            SubscriptionService.setToken(userStorage.token)
        } else {
            navigate("/login")
        }
        Subscription()
    }, [])


    return (
        <div className="subscription">
            <h2>Únete a nuestra suscripción premium</h2>
            <p>¡Obtén acceso ilimitado a todos nuestros productos por tan solo $400 pesos al mes!</p>
            <ul>
                <li>Acceso ilimitado a nuestra biblioteca de productos</li>
                <li>Descuentos exclusivos en nuevos lanzamientos</li>
                <li>Soporte prioritario al cliente</li>
            </ul>
            <button onClick={() => window.location.href = RedirectMercadoPago}>¡Únete ahora!</button>
        </div>
    );
}