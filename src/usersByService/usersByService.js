import React, { useState, useEffect } from "react";
import getData, { getServices, getUsers } from "../api/APIsiit";

function UsersByService() {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedUser, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState();

  useEffect(async () => {
    const serviceData = await getServices();
    console.log("serviceData", serviceData);
    if (serviceData.length > 0) {
      setServiceDetails(serviceData);
      setIsLoading(false);
    }

    const UserData = await getUsers();
    if (UserData.length > 0) {
      setUserDetails(UserData);
      setIsLoading(false);
    }
  }, []);

  /* Change on click services */
  function onclickService(id) {
    setIsUserDataLoading(true);
    let checkedServices = selectedServices;
    if (checkedServices.includes(id)) {
      // Add and remove selected services from array
      checkedServices = checkedServices.filter((serviceId) => {
        return serviceId !== id;
      });
    } else {
      checkedServices.push(id);
    }
    setSelectedServices(checkedServices);
    getUsersByService(checkedServices); // Get users based on selected services
  }

  /* Get users from selected services */
  function getUsersByService(checkedServices) {
    let usersByServices = [];
    let userIds = [];
    // Better to filter from users instead of fetching data from endpoint
    checkedServices.forEach((element) => {
      userDetails.filter((user) => {
        if (user.service_ids.includes(element)) {
          if (!userIds.includes(user.id)) {
            let serviceNames = getServiceName(user.service_ids);
            console.log("serviceNames", serviceNames);
            user.serviceNames = serviceNames;
            usersByServices.push(user);
            userIds.push(user.id);
          }
        }
      });
    });
    setSelectedUsers(usersByServices);
    console.log("usersByServices", usersByServices);
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
            {" "}
            {name}{" "}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center mt-8 font-size-20">
      <h1 className="color-y">Get users based on sevice</h1>
      {!isLoading && (
        <div>
          {serviceDetails.map((service, index) => (
            <>
              <input
                type="checkbox"
                name={service.name}
                value={service.id}
                onClick={() => onclickService(service.id)}
              ></input>
              <label className='pr-10'>{service.name}</label>
            </>
          ))}
        </div>
      )}
      {isLoading && <p>Loading all services...</p>}
      {selectedServices.length === 0 && (
        <p className="color-red">Select services to load employee</p>
      )}
      {selectedUser.length === 0 && selectedServices.length > 0 && (
        <p className="color-red">No services are available</p>
      )}
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
      {isUserDataLoading && <p>Loading selected employee details...</p>}
    </div>
  );
}

export default UsersByService;
