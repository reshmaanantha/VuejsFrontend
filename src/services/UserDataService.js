import http from '../http-common'

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  checkAvailability(userId){
  return http.get(`/users/available/${userId}`);
  }

  getCountries(){
    return http.get("/countries");
  }

  getStates(countryName){
    return http.get( `/states/${countryName}`);
  }
  
  getCities(countryName,stateName){
    return http.get( `/cities/${countryName}/${stateName}`);
  }
}

export default new UserDataService();
