interface Athlete {
    id: number;
    firstname: string;
    lastname: string;
    club: string;
    gender: boolean;
}

const endpoint = "http://localhost:8000";

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

export { endpoint, fetchAthletes, createAthlete, deleteAthlete, editAthlete };
