const endpoint = "http://localhost:8000";

async function fetchAthletes() {
    const data = await fetch(`${endpoint}/athletes`);
    const response = await data.json();
    console.log(response);
    return response;
}

export { endpoint, fetchAthletes };
