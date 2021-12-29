export class SwagiApiService {
    async getVehicleDetails(vehicleMetadata) {
        const vehicleDetailsResponse = await fetch(vehicleMetadata.url);
        const vehicleDetails = await vehicleDetailsResponse.json();

        if (vehicleDetails.message !== 'ok') {
            throw new Error('Vehicle details not found');
        }

        return vehicleDetails;
    }

    async getPilotsDetails(pilotUrl, pilotsCache) {
        const pilotResponse = await fetch(pilotUrl);
        const pilotDetails = await pilotResponse.json();

        if (pilotDetails.message !== 'ok') {
            throw new Error('Pilot details not found');
        }

        pilotsCache.set(pilotUrl, pilotDetails);

        return pilotDetails;
    }

    async getPlanetDetails(planetUrl, planetsCache) {
        const planetResponse = await fetch(planetUrl);
        const planetDetails = await planetResponse.json();

        if (planetDetails.message !== 'ok') {
            throw new Error('Planet details not found');
        }

        planetsCache.set(planetUrl, planetDetails);

        return planetDetails;

    }

    async getSummarizedData() {
        const vehiclesMetadataResponse = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=1000");
        const vehiclesMetadataJson = await vehiclesMetadataResponse.json();

        if (vehiclesMetadataJson.message !== 'ok') {
            throw new Error('Error fetch vehicles metadata');
        }

        const getVehicleDetailsPromises = [];

        for (const vehicleMetadata of vehiclesMetadataJson.results) {
            getVehicleDetailsPromises.push(this.getVehicleDetails(vehicleMetadata));
        }

        const vehicleDetailsResponses = await Promise.all(getVehicleDetailsPromises);

        const relevantVehicles = [];

        for (const vehicleDetails of vehicleDetailsResponses) {
            if (vehicleDetails.message === 'ok' && vehicleDetails.result.properties.pilots.length > 0) {
                relevantVehicles.push(vehicleDetails);
            }
        }

        const pilotsCache = new Map();
        const getPilotDetailsPromises = [];

        for (const relevantVehicle of relevantVehicles) {
            for (const pilotUrl of relevantVehicle.result.properties.pilots) {
                if (!pilotsCache.has(pilotUrl)) {
                    pilotsCache.set(pilotUrl, null);
                    getPilotDetailsPromises.push(this.getPilotsDetails(pilotUrl, pilotsCache));
                }
            }
        }

        const pilotDetailsResponses = await Promise.all(getPilotDetailsPromises);

        const planetsCache = new Map();
        const getPlanetDetailsPromises = [];

        for (const pilot of pilotDetailsResponses) {
            const planetUrl = pilot.result.properties.homeworld;
            if (!planetsCache.has(planetUrl)) {
                planetsCache.set(planetUrl, null);
                getPlanetDetailsPromises.push(this.getPlanetDetails(planetUrl, planetsCache));
            }
        }

        await Promise.all(getPlanetDetailsPromises);

        let topVehicle = {
            name: null,
            populationSum: 0,
            pilotNames: null,
            planetsAndPopulation: null
        };

        for (let vehicle of relevantVehicles) {
            let vehiclePopulationSum = 0;
            const vehiclePilotsNames = [];
            const vehiclePlanetsAndPopulation = [];

            const planetsPopulations = new Set();

            for (let pilotUrl of vehicle.result.properties.pilots) {
                const pilotData = pilotsCache.get(pilotUrl);

                vehiclePilotsNames.push(pilotData.result.properties.name);

                const planetUrl = pilotData.result.properties.homeworld;
                if (!planetsPopulations.has(planetUrl)) {
                    const planetData = planetsCache.get(planetUrl);
                    const planetName = planetData.result.properties.name;

                    const planetPopulation = Number(planetData.result.properties.population);

                    if (Number.isNaN(planetPopulation)) {
                        vehiclePlanetsAndPopulation.push({ name: planetName, number: null });
                    } else {
                        vehiclePopulationSum += planetPopulation;
                        vehiclePlanetsAndPopulation.push({ name: planetName, number: planetPopulation });
                    }
                }
            }

            if (topVehicle.populationSum < vehiclePopulationSum) {
                topVehicle = {
                    name: vehicle.result.properties.name,
                    pilotNames: vehiclePilotsNames,
                    planetsAndPopulation: vehiclePlanetsAndPopulation,
                    populationSum: vehiclePopulationSum
                }
            }
        }



        return {
            topVehicle: topVehicle
        }
    }

    async getChartBarData() {
        const planetsMetadataResponse = await fetch("https://www.swapi.tech/api/planets?page=1&limit=100");
        const planetsMetadataJson = await planetsMetadataResponse.json();

        if (planetsMetadataJson.message !== 'ok') {
            throw new Error('Error fetch planets metadata');
        }

        const relevantPlanetsData = new Set();
        relevantPlanetsData.add('Tatooine', null);
        relevantPlanetsData.add('Alderaan', null);
        relevantPlanetsData.add('Naboo', null);
        relevantPlanetsData.add('Bespin', null);
        relevantPlanetsData.add('Endor', null);


        const planetsAndPopulationData = [];

        for (let planetMetadata of planetsMetadataJson.results) {
            if (relevantPlanetsData.has(planetMetadata.name)) {
                const relevantPlanetDataResponse = await fetch(planetMetadata.url);
                const relevantPlanetDataDetails = await relevantPlanetDataResponse.json();
                const planetPopulationSum = relevantPlanetDataDetails.result.properties.population;
                //relevantPlanetsData.set(planetMetadata.name, planetPopulationSum)
                planetsAndPopulationData.push({ name: planetMetadata.name, number: planetPopulationSum });
            }
        }


        return {
            planetsAndPopulationData: planetsAndPopulationData
        }


    }
}