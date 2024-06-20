import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchAthletes } from '../apiFacade';
import '../css-files/athletes.css';

interface Athlete { 
    id: number;
    firstname: string;
    lastname: string;
    club: string;
    age: number;
    gender: boolean;
}

export default function Athletes() {
    const [athletes, setAthletes] = useState([]);

    // Funktion til at hente data fra backend
    const fetchData = async () => {
        try {
            // Hent data fra backend API
            const athletesData = await fetchAthletes();

            // Opdater state med de hentede data
            setAthletes(athletesData);
        } catch (error) {
            console.error("Fejl ved hentning af data:", error);
        }
    };

    // Kald fetchData funktionen når komponenten indlæses
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>Athletes</h1>
            <p>This is the athletes page.</p>
            <section className="athletes-container">
                {athletes.map((athlete: Athlete) => (
                    <div key={athlete.id} className="athlete-card">
                        <p>Fornavn {athlete.firstname}</p>
                        <p>Efternavn {athlete.lastname}</p>
                        <p>Klub: {athlete.club}</p>
                        <p>Alder: {athlete.age}</p>
                        <p>Køn: {athlete.gender ? "Mand" : "Kvinde"}</p>
                        
                    </div>
                ))}
            </section>
        </>
    );
}