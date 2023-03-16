import "../static/styles/FeedbackService.css"
import ReactStars from 'react-rating-stars-component';


export function FeedbackService({ FeedbackServiceData }) {
    console.log(FeedbackServiceData);
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
                                        <p>{res.ByUser[0].date}</p>
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