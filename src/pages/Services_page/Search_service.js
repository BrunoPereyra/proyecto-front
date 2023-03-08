import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import ReactStars from 'react-rating-stars-component';


import Post_service from "../../services/service"
import "../../static/styles/Service/Search_service.css"
import lupa from "../../static/icons/694985.png"

export function Search_service() {
    let navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [InputServices, setInputServices] = useState("")
    const [servicesRef, setservicesRef] = useState([])
    const [serviceId, setserviceId] = useState({})
    const [WhatSearchedByUser, setWhatSearchedByUser] = useState("")
    const [FilterState, setFilterState] = useState({
        prime: false,
        visited: false,
        other: false
    })

    const [isFullScreen, setIsFullScreen] = useState(false);
    const handleShortClick = () => {
        setIsFullScreen(!isFullScreen);
    };

    var searchServiceForrefService = ""
    var searchServiceForId = ""

    const search = async () => {
        let loggedUser = window.localStorage.getItem("loggedAppUser")
        if (loggedUser) {
            try {

                const userStorage = JSON.parse(loggedUser)
                Post_service.setToken(userStorage.token)

                searchServiceForId = searchParams.get("id")
                searchServiceForrefService = searchParams.get("refService")

                if (searchServiceForId) {
                    setWhatSearchedByUser("id")
                    Post_service.searchRefService({
                        query: `?id=${searchServiceForId}`,
                    }).then(d => {
                        setserviceId(d.data.res)

                    }).catch(() => {
                        setserviceId({ res: "no content" })
                    })

                } else if (searchServiceForrefService) {
                    setWhatSearchedByUser("ref")
                    Post_service.searchRefService({
                        query: `?refService=${searchServiceForrefService}`,
                        filter: [FilterState.prime, FilterState.visited]
                    }).then(d => {
                        setservicesRef(d.data.res)

                    }).catch(() => {
                        setservicesRef(["no content"])
                    })

                } else {
                    navigate("/home")
                }
            } catch (err) {
                console.log("AAAAA")
            }
        } else {
            navigate("/login")
        }

    }
    useEffect(() => {
        search()
    }, [searchParams.get("id")])

    const HandleSubmit = async (e) => {
        e.preventDefault()
        if (searchServiceForrefService !== InputServices) {
            search()
        }
    }
    const HandleChange = (e) => {
        setInputServices(e.target.value)
        setSearchParams({ refService: e.target.value })
    }
    const handleCheckboxChange = (name) => event => {
        setFilterState({
            ...FilterState,
            [name]: event.target.checked
        })
    }
    function calculateAverage(arr) {
        let suma = 0
        for (let i = 0; i < arr.length; i++) {
            suma += arr[i]
        }
        const Average = suma / arr.length
        return Average
    }
    function clickService(id) {
        setSearchParams({ id })
    }
    function ShowSearchResultId() {
        if (serviceId._id) {
            return (
                <div className="search_result_map_id">
                    {serviceId.nameService}
                </div>
            )
        } else {
            return (
                <div>
                    <h2>no content</h2>
                </div>
            )
        }

    }

    const ShowSearchResultRef = () => {
        if (servicesRef[0] === "no content") {
            return (
                <div>
                    <h2>no content</h2>
                </div>
            )
        } else {
            return servicesRef.map(S => {
                const average = calculateAverage(S.stars)

                const idDiv = "Search_Result_divtheimg";
                return (
                    <div onClick={() => clickService(S._id)} className="Search_Result_Map" key={S._id}>
                        <div id={idDiv}>
                            <img id="Search_Result_img" src={S.image.url} alt="imagen de servicio" />
                        </div>
                        <div className="Search_Result_show">
                            <h2 className="Search_Result_nameservice">{S.nameService}</h2>
                            <span className="price_content">
                                <span className="price">$ {S.price}</span>
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
                                <span className="stars_amount">{S.stars.length}</span>
                            </span>
                        </div>
                    </div>
                )
            })

        }
    }

    return (
        <section id="Searchservice_select">

            {isFullScreen ? (
                <div className="ServiceSearch_fullscreen-container">
                    <div className="ServiceSearch_input-container">
                        <input
                            type="checkbox"
                            id="checkbox1"
                            name="checkbox1"
                            checked={FilterState.prime}
                            onChange={handleCheckboxChange("prime")}
                        />
                        <label htmlFor="checkbox1">Prime</label>
                    </div>
                    <div className="ServiceSearch_input-container">
                        <input
                            type="checkbox"
                            id="checkbox2"
                            name="checkbox2"
                            checked={FilterState.visited}
                            onChange={handleCheckboxChange("visited")}
                        />
                        <label htmlFor="checkbox2">visited</label>
                    </div>
                    <div className="ServiceSearch_input-container">
                        <input type="checkbox"
                            id="checkbox3"
                            name="checkbox3"
                            checked={FilterState.other}
                            onChange={handleCheckboxChange("other")}

                        />
                        <label htmlFor="checkbox3">Por el otro</label>
                    </div>
                    <div className="short-container" onClick={handleShortClick}>
                        <div className="short-box">short</div>
                    </div>
                </div>
            ) : (
                <div id="Searchservice_div">
                    <header id="Searchservice_header">

                        <form id="form_searchServcice" onSubmit={HandleSubmit}>
                            <div id="form_searchServcice_div_inputlabel">
                                <input
                                    type="text"
                                    name="refService"
                                    onChange={HandleChange}
                                    value={InputServices}
                                    id="input_refService"
                                />
                                <label id="label_refService" onClick={HandleSubmit}>
                                    <img src={lupa} alt="a" />
                                </label>
                            </div>
                        </form>
                        <div className="short-container" onClick={handleShortClick}>
                            <div className="short-box">Short</div>
                        </div>
                    </header>
                    <div id="search_result_content">
                        {
                            WhatSearchedByUser === "id" ? ShowSearchResultId() : ShowSearchResultRef()
                        }
                    </div>
                </div>

            )
            }
        </section >
    )
}