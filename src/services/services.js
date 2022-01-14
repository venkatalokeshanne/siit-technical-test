import './services.css'
import React, { useState, useEffect } from "react";
import getData from "../api/APIsiit";


function Services() {
    const [serviceDetails, setServiceDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        const data = await getData('services.json')
            .catch(error => alert(error));
        if (data.length > 0) {
            setServiceDetails(data)
            setIsLoading(false)
        }
    }, [])

    return (
        <div className="text-center mt-8">
            <h1 className='color-y'>Siit Services</h1>
            {!isLoading &&
                <table className='margin-auto'>
                    <thead className='service'>
                        <tr>
                            <td>S.No</td>
                            <td>Logo</td>
                            <td>Service</td>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceDetails.map((service, index) =>
                            <tr key={service.id}>
                                <td>{index}</td>
                                <td>
                                    <a target='_blank' title={service.name} href={service.website_url}><img className='avatar' src={service.logo_url}></img>
                                    </a>
                                </td>
                                <td>{service.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            } {isLoading && <p>Loading employee details...</p>}
        </div>
    )
}

export default Services;