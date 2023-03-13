import "../static/styles/Service/Search_service.css"

import ReactStars from 'react-rating-stars-component';


export function Search_Result_show({ Service, average }) {
    const idDiv = "Search_Result_divtheimg";

    return (
        <div className="Search_Result_Component">
            <div id={idDiv}>
                <img id="Search_Result_img" src={Service.image.url} alt="imagen de servicio" />
            </div>
            <div className="Search_Result_show">
                <h3 className="Search_Result_nameservice">{Service.nameService}</h3>
                <span className="price_content">
                    <span className="price">$ {Service.price}</span>
                </span>
                <span className="stars_content">
                    <div className="stars">
                        <ReactStars
                            count={5}
                            size={12}
                            activeColor="#ffd700"
                            isHalf={true}
                            value={average}
                            edit={false}
                        />
                    </div>
                    <span className="stars_amount">{Service.stars.length}</span>
                </span>
            </div>
        </div>
    )
}