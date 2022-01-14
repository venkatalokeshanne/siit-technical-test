import React, { useState, useEffect } from "react";
import { getServices, getUsers } from "../api/APIsiit";

function UsersByService() {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedUser, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState();

  useEffect(async () => {
    const serviceData = await getServices();
    if (serviceData.length > 0) {
      setServiceDetails(serviceData);
    }

    const userData = await getUsers();
    if (userData.length > 0) {
      setUserDetails(userData);
    }
    setIsLoading(false);
  }, []);

  /* Change on click services */
  function onclickService(id) {
    setIsUserDataLoading(true);
    let checkedServices = selectedServices;
    // Add and remove selected services from array
    if (checkedServices.includes(id)) {
      checkedServices = checkedServices.filter((serviceId) => {
        return serviceId !== id;
      });
    } else {
      checkedServices.push(id);
    }
    setSelectedServices(checkedServices);
    getUsersByService(checkedServices); // Get users based on selected services
  }

  /* Get users for multi selected services */
  function getUsersByService(checkedServices) {
    let usersByServices = [];
    let userIds = [];
    // Better to filter from users instead of fetching data from endpoint
    checkedServices.forEach((element) => {
      userDetails.filter((user) => {
        if (user.service_ids.includes(element) && !userIds.includes(user.id)) {
          user.serviceNames = getServiceName(user.service_ids);
          usersByServices.push(user);
          userIds.push(user.id);
        }
      });
    });
    setSelectedUsers(usersByServices);
    setIsUserDataLoading(false);
  }

  /* Get service names from ids*/
  function getServiceName(serviceIds) {
    let userServiceName = [];
    serviceIds.forEach((serviceId) =>
      serviceDetails.filter((service) => {
        if (service.id === serviceId) {
          userServiceName.push(service.name);
        }
      })
    );
    return userServiceName;
  }

  /* Component to dispaly service names */
  function DisplayServiceNames(props) {
    return (
      <div>
        {props.userServices.map((name) => (
          <p key={name} className="display-inlineBlock pr-10">
            {name}
          </p>
        ))}
      </div>
    );
  }

  function MessageIndicator(props) {
    return <p className="color-red">{props.message}</p>;
  }

  return (
    <div className="text-center mt-8">
      <h1 className="color-y">Get users based on service</h1>
      <p>Select the service to see the current active users of the service</p>
      {!isLoading && (
        <div>
          {serviceDetails.map((service) => (
            <>
              <input className="mr-1"
                type="checkbox"
                name={service.name}
                value={service.id}
                onClick={() => onclickService(service.id)}
              ></input>
              <label className="pr-10">{service.name}</label>
            </>
          ))}
        </div>
      )}

      {isLoading && <MessageIndicator message="Loading all services..." />}
      {selectedServices.length === 0 && <MessageIndicator message="Select services to load users..." />}
      {selectedUser.length === 0 && selectedServices.length > 0 && <MessageIndicator message="No services are available" />}
      {isUserDataLoading && <MessageIndicator message="Loading selected employee details..." />}

      {!isUserDataLoading && selectedUser.length > 0 && (
        <table className="margin-auto mt-5">
          <thead className="color-blue">
            <tr>
              <td>Avatar</td>
              <td>Employee Name</td>
              <td>Position</td>
              <td>Service Names</td>
            </tr>
          </thead>
          <tbody>
            {selectedUser.map((user) => (
              <tr key={user.id}>
                <td>
                  <img className="avatar" src={user.avatar_url}></img>
                </td>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>
                  <DisplayServiceNames userServices={user.serviceNames} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersByService;
