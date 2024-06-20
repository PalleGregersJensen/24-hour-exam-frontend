interface Athlete {
    id: number;
    firstname: string;
    lastname: string;
    club: string;
    gender: boolean;
}

interface Result { 
    id: number;
    resultType: string;
    resultDate: Date;
    resultValue: string;
    athleteId: number;
    athleteFirstName: string;
    athleteLastName: string;
    disciplineId: number;
    disciplineName: string;
}

const endpoint = "http://localhost:8000";


///////////////////// ATHLETES ///////////////////////

//Fetch athletes
async function fetchAthletes() {
    const data = await fetch(`${endpoint}/athletes`);
    const response = await data.json();
    console.log(response);
    return response;
}

//Create athlete
async function createAthlete(athlete: Athlete) {
    const response = await fetch(`${endpoint}/athletes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(athlete),
    });
    return response;
}

//Delete athlete
async function deleteAthlete(id: number) {
    const response = await fetch(`${endpoint}/athletes/${id}`, {
        method: "DELETE",
    });
    return response;
}

//Edit athlete
async function editAthlete(id: number, athlete: Athlete) {
    const response = await fetch(`${endpoint}/athletes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(athlete),
    });
    return response;
}


///////////////////////////////// RESULTS /////////////////////////////////

//Fetch results
async function fetchResults() {
    const data = await fetch(`${endpoint}/results`);
    const response = await data.json();
    console.log(response);
    return response;
}


//Create results
async function createResults(result: Result) {
    const response = await fetch(`${endpoint}/results`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
    });
    return response;
}

//Delete results
async function deleteResults(id: number) {
    const response = await fetch(`${endpoint}/results/${id}`, {
        method: "DELETE",
    });
    return response;
}

//Edit results
async function editResult(id: number, result: Result) {
    const response = await fetch(`${endpoint}/results/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
    });
    return response;
}


export { endpoint, fetchAthletes, createAthlete, deleteAthlete, editAthlete, fetchResults, createResults, deleteResults, editResult};
