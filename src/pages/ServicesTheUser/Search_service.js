import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"

import { Search_Result_show } from "../../components/Search_Result_show"
import { FeedbackService } from "../../components/FeedbackService"


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
        console.log(serviceId);

        //    const ProfileLink = await Post_service.ProfileGetOther(serviceId.User[0]._id)

        if (serviceId._id) {
            let imageUser = serviceId.User[0].avatar.url
            return (
                <div className="search_result_map_id">
                    <h2>{serviceId.nameService}</h2>
                    <div className="search_result_map_id_otherData">
                        <div className="search_result_map_id_dataTheUserTheService">
                            <img src={imageUser} alt="" width="100" />
                            <h5 onClick={() => navigate(`/perfilUser?idUserProfile=${serviceId.User[0]._id}`)} >{serviceId.User[0].nameUser}</h5>
                        </div>
                    </div>
                    <div className="search_result_map_id_imgService">
                        <img src={serviceId.image.url} alt="" />
                    </div>
                    <div className="search_result_map_id_ask_about_service">
                        <h4 >Preguntar</h4>
                    </div>
                    <span>${serviceId.price}</span>
                    <div className="search_result_map_id_description">
                        <p>{serviceId.description}</p>
                    </div>
                    <div className="search_result_map_id_FeedbackService">
                        <FeedbackService FeedbackServiceData={serviceId.FeedbackService} />
                    </div>
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
            return servicesRef.map(Service => {
                const average = calculateAverage(Service.stars)

                return (
                    <div onClick={() => clickService(Service._id)} className="Search_Result_Map" key={Service._id}>
                        <Search_Result_show average={average} Service={Service} />
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