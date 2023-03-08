import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Subscription from "../../services/Subscription"
import { useSearchParams } from "react-router-dom"
import "../../static/styles/subscription/SubscriptioStatus.css"


export function SubscriptioStatus() {
    const [searchParams] = useSearchParams()
    const [StatusPay, setStatusPay] = useState("")
    let collection_id = ""

    let navigate = useNavigate()

    const SubscriptionStatus = async () => {
        try {

            collection_id = await searchParams.get("collection_id")
            const ResSubscriptioStatus = await Subscription.statusSubscripcion(collection_id)
            console.log(ResSubscriptioStatus.data)
            if (ResSubscriptioStatus.data === 'Pago aprobado') {
                setStatusPay("Pago aprobado")
                let loggedUser = JSON.parse(window.localStorage.getItem("loggedAppUser"))
                loggedUser.prime = true
                console.log(loggedUser);
                window.localStorage.setItem("loggedAppUser", JSON.stringify(loggedUser))

            } else {
                setStatusPay("pago fallido")
            }
        } catch (error) {
            setStatusPay("pago fallido")
        }

    }

    useEffect(() => {
        let loggedUser = window.localStorage.getItem("loggedAppUser")
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            Subscription.setToken(userStorage.token)
            SubscriptionStatus()
        } else {
            navigate("/login")
        }
    })


    return (
        <div>
            {
                StatusPay === "Pago aprobado" ?
                    <div className="payment-confirmation-container">
                        <h2>¡Gracias por su compra!</h2>
                        <p>¡Su pago ha sido procesado correctamente y ahora tiene acceso a los siguientes beneficios:</p>
                        <ul>
                            <li>Acceso ilimitado a todos nuestros cursos en línea.</li>
                            <li>Descargas exclusivas de materiales de estudio.</li>
                            <li>Soporte técnico premium.</li>
                        </ul>
                        <p>Su suscripción vencerá el 28 de febrero de 2024.</p>
                    </div>
                    :
                    <div className="payment-confirmation-container">
                        <h2>Pago rechazado</h2>
                        <p>Lo sentimos, su pago ha sido rechazado. Intente de nuevo más tarde.</p>
                    </div>
            }
        </div>
    );
}