import React, { useState, useEffect } from "react";
import { getServices, getUsers } from "../api/APIsiit";

function PriceOnService() {
  const [isLoading, setIsLoading] = useState(true);
  const [servicesPrice, setServicesPrice] = useState();
  const [sortType, setSortType] = useState('desc')

  useEffect(async () => {
    const serviceData = await getServices();
    const UserData = await getUsers();
    getPriceOnService(serviceData, UserData);
  }, []);

  /* Get Montly prices from services */
  function getPriceOnService(serviceData, userData) {
    serviceData.forEach((service) => {
      //Filter active used for the service
      let filterActiveUsers = userData.filter((user) => {
        if (user.service_ids.includes(service.id)) {return user;}
      });
      // Calculate Monthly price based on gived expression
      let monthlyPrice =
        service.price.flat_cost +
        service.price.cost_per_user *
          (filterActiveUsers.length - service.price.nb_users_included);

      service.numberOfActiveUsers = filterActiveUsers.length;
      service.monthlyPrice = monthlyPrice;
    });
    setServicesPrice(serviceData);
    setIsLoading(false);
  }

  function sortAsc() {
    servicesPrice.sort((a,b) => a.monthlyPrice - b.monthlyPrice)
    setServicesPrice(servicesPrice);
  }

  function sortDesc(){
    servicesPrice.sort((a,b) => b.monthlyPrice - a.monthlyPrice)
    setServicesPrice(servicesPrice);
  }

  function sortBasedOnPrice() {
    if(sortType === 'desc') {
      sortAsc()
      setSortType('asc')
    } else {
      sortDesc()
      setSortType('desc')
    }
  }

  return (
    <div className="text-center mt-5">
      <h1 className="color-y">Price details of the service</h1>
      <p>Below is the monthly cost of service sorted based on price</p>
      <p>Click on "Monthly Price" to sort ASC and DESC</p>
      {!isLoading && servicesPrice.length > 0 && (
        <table className="margin-auto mt-5">
          <thead className="color-violet">
            <tr>
              <td>Logo</td>
              <td>Service Name</td>
              <td>Number of Active Users</td>
              <td className="cursor-pointer" onClick={() => sortBasedOnPrice(sortType)}>Monthly Price</td>
            </tr>
          </thead>
          <tbody>
            {servicesPrice.map((service) => (
              <tr key={service.id}>
                <td>
                  <a target='_blank' title={service.name}><img className="avatar" src={service.logo_url}></img></a>
                </td>
                <td>{service.name}</td>
                <td>{service.numberOfActiveUsers}</td>
                <td>{service.monthlyPrice}</td>
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
