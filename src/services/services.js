import './services.css'
import React, { useState, useEffect } from "react";
import { getServices } from "../api/APIsiit";


function Services() {
    const [serviceDetails, setServiceDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        const serviceData = await getServices()
        if (serviceData.length > 0) {
            setServiceDetails(serviceData)
            setIsLoading(false)
        }
    }, [])



    return (
        <div className="text-center mt-8">
            <h1 className='color-y'>Siit Services</h1>
            <p>Below are the services provided at SIIT</p>
            <p>Click on the logo of the comapany to redirect to Company website</p>
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
            } {isLoading && <p>Loading service details...</p>}
        </div>
    )
}

export default Services;