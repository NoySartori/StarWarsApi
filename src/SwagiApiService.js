export class SwagiApiService {

    async getAllVehicles() {
        const response = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=1000");
        return await response.json();
    }

    getVehicleById(id){
        fetch('https://www.swapi.tech/api/vehicles/${id}'+id)
        
    }

    componentDidMount() {
       this.getAllVehicles();
    }
}