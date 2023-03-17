import "../static/styles/FeedbackService.css"
import ReactStars from 'react-rating-stars-component';


export function FeedbackService({ FeedbackServiceData }) {
    function dateDifferences(dateoffeedbackA) {
        const dateoffeedback = new Date(dateoffeedbackA);
        
        const datenow = new Date();
        const differenceDateFeedback = datenow - dateoffeedback;

        // Convertir la diferencia en horas, días o semanas
        const milisegundosEnHora = 1000 * 60 * 60;
        const milisegundosEnDia = milisegundosEnHora * 24;
        const milisegundosEnSemana = milisegundosEnDia * 7;

        if (differenceDateFeedback < milisegundosEnHora) {

            const minutosPasados = Math.floor(differenceDateFeedback / (1000 * 60));
            let returnFunction = `${minutosPasados} minutos`
            return returnFunction

        } else if (differenceDateFeedback < milisegundosEnDia) {
            const horasPasadas = Math.floor(differenceDateFeedback / milisegundosEnHora);
            let returnFunction = `${horasPasadas} horas`
            return returnFunction

        } else if (differenceDateFeedback < milisegundosEnSemana) {
            const diasPasados = Math.floor(differenceDateFeedback / milisegundosEnDia);
            let returnFunction = `${diasPasados} dias`
            return returnFunction
        } else {
            const semanasPasadas = Math.floor(differenceDateFeedback / milisegundosEnSemana);
            let returnFunction = `${semanasPasadas} semanas`
            return returnFunction
        }
    }


    return (
        <section className="FeedbackService_section">
            {
                FeedbackServiceData.map(res => {
                    return (
                        <div id="FeedbackService_map_div" key={res._id}>
                            <div className="feedbackService_map_User" >
                                <img src={res.ByUser[0].avatar.url} id="feedbackService_map_avatar_user" alt="avarar del usuario" />
                                <div className="feedbackService_map_User_data">
                                    <h3>{res.ByUser[0].nameUser}</h3>
                                    <div className="feedbackService_map_User_data_star_date">
                                        <p>{dateDifferences(res.date)}</p>
                                        <ReactStars
                                            count={5}
                                            size={12}
                                            activeColor="#ffd700"
                                            isHalf={true}
                                            value={res.stars}
                                            edit={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="FeedbackService_map_div_comment">
                                {res.comment}
                            </p>
                        </div>
                    )
                })
            }
        </section>
    )
}