import React, { useState, useEffect } from "react";
import getData, { getServices, getUsers } from "../api/APIsiit";

function PriceOnService() {
  const [isLoading, setIsLoading] = useState(true);
  const [servicesPrice, setServicesPrice] = useState();

  useEffect(async () => {
    const serviceData = await getServices();
    console.log("serviceData", serviceData);
    const UserData = await getUsers();
    getPriceOnService(serviceData,UserData);
  }, []);

  /* Get Montly prices from services */
  function getPriceOnService(serviceData,UserData) {
    serviceData.forEach((service) => {
        let numberOfUsers = 0;
        let montly = 0
        UserData.forEach((user) => {
        if (user.service_ids.includes(service.id)) {
          numberOfUsers += 1;
        }
      });
        montly = service.price.flat_cost + service.price.cost_per_user * (numberOfUsers - service.price.nb_users_included)
        service.numberOfUsers = numberOfUsers;
      service.monthly = montly
    });
    setServicesPrice(serviceData)
    setIsLoading(false)
  }

  return (
    <div className="text-center mt-8">
      <h1 className="color-y">Price details of the service</h1>

      {!isLoading && servicesPrice.length > 0 && (
        <table className="margin-auto mt-5">
          <thead className='color-violet'>
            <tr>
              <td>Avatar</td>
              <td>Service Name</td>
              <td>Number of Active Users</td>
              <td>Monthly</td>
            </tr>
          </thead>
          <tbody>
            {servicesPrice.map((service) => (
              <tr key={service.id}>
                <td>
                  <img className="avatar" src={service.logo_url}></img>
                </td>
                <td>{service.name}</td>
                <td>{service.numberOfUsers}</td>
                <td>{service.monthly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && <p>Loading price details...</p>}
    </div>
  );
}

export default PriceOnService;
