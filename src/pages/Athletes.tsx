import React, { useState, useEffect } from "react";
import { fetchAthletes, createAthlete, deleteAthlete, editAthlete } from "../apiFacade";
import "../css-files/athletes.css";

interface Athlete {
    id: number;
    firstname: string;
    lastname: string;
    club: string;
    gender: boolean;
    birthdate: string;
    age: number;
}

export default function Athletes() {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    //@ts-expect-error type error
    const [newAthlete, setNewAthlete] = useState<Omit<Athlete, "id">>({
        firstname: "",
        lastname: "",
        club: "",
        gender: true,
    });
    const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null);

    // Funktion til at hente data fra backend
    const fetchData = async () => {
        try {
            const athletesData = await fetchAthletes();
            setAthletes(athletesData);
        } catch (error) {
            console.error("Fejl ved hentning af data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateAthlete = async () => {
        try {
            //@ts-expect-error type error
            await createAthlete(newAthlete);
            //@ts-expect-error type error
            setNewAthlete({ firstname: "", lastname: "", club: "", gender: true });
            fetchData();
        } catch (error) {
            console.error("Fejl ved oprettelse af atlet:", error);
        }
    };

    const handleDeleteAthlete = async (id: number) => {
        try {
            await deleteAthlete(id);
            fetchData();
        } catch (error) {
            console.error("Fejl ved sletning af atlet:", error);
        }
    };

    const handleEditAthlete = async (athlete: Athlete) => {
        try {
            await editAthlete(athlete.id, athlete);
            setEditingAthlete(null);
            fetchData();
        } catch (error) {
            console.error("Fejl ved redigering af atlet:", error);
        }
    };

    const startEditingAthlete = (athlete: Athlete) => {
        setEditingAthlete(athlete);
    };

    return (
        <>
            <h1>Atleter</h1>
            <p>Oversigt over atleter</p>
            <p>Tilføj atleter:</p>
            <input
                type="text"
                placeholder="Fornavn"
                value={newAthlete.firstname}
                onChange={(e) => setNewAthlete({ ...newAthlete, firstname: e.target.value })}
            />
            <input
                type="text"
                placeholder="Efternavn"
                value={newAthlete.lastname}
                onChange={(e) => setNewAthlete({ ...newAthlete, lastname: e.target.value })}
            />
            <input
                type="text"
                placeholder="Klub"
                value={newAthlete.club}
                onChange={(e) => setNewAthlete({ ...newAthlete, club: e.target.value })}
            />
            <input
                type="date"
                value={newAthlete.birthdate}
                onChange={(e) => setNewAthlete({ ...newAthlete, birthdate: e.target.value })}
            />
            <select
                value={newAthlete.gender ? "male" : "female"}
                onChange={(e) => setNewAthlete({ ...newAthlete, gender: e.target.value === "male" })}
            >
                <option value="male">Mand</option>
                <option value="female">Kvinde</option>
            </select>
            <button className="add-athlete-button" onClick={handleCreateAthlete}>
                Tilføj atlet
            </button>
            <br />

            {editingAthlete && (
                <div>
                    <h2>Rediger atlet</h2>
                    <input
                        type="text"
                        placeholder="Fornavn"
                        value={editingAthlete.firstname}
                        onChange={(e) => setEditingAthlete({ ...editingAthlete, firstname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Efternavn"
                        value={editingAthlete.lastname}
                        onChange={(e) => setEditingAthlete({ ...editingAthlete, lastname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Klub"
                        value={editingAthlete.club}
                        onChange={(e) => setEditingAthlete({ ...editingAthlete, club: e.target.value })}
                    />
                    <input
                        type="date"
                        value={newAthlete.birthdate}
                        onChange={(e) => setEditingAthlete({ ...editingAthlete, birthdate: e.target.value })}
                    />
                    <select
                        value={editingAthlete.gender ? "male" : "female"}
                        onChange={(e) => setEditingAthlete({ ...editingAthlete, gender: e.target.value === "male" })}
                    >
                        <option value="male">Mand</option>
                        <option value="female">Kvinde</option>
                    </select>
                    <button onClick={() => handleEditAthlete(editingAthlete)}>Gem ændringer</button>
                    <button onClick={() => setEditingAthlete(null)}>Annuller</button>
                </div>
            )}

            <section className="athletes-container">
                {athletes.map((athlete: Athlete) => (
                    <div key={athlete.id} className="athlete-card">
                        <p>Fornavn: {athlete.firstname}</p>
                        <p>Efternavn: {athlete.lastname}</p>
                        <p>Klub: {athlete.club}</p>
                        <p>Køn: {athlete.gender ? "Mand" : "Kvinde"}</p>
                        <p>Alder: {athlete.age}</p>
                        <button className="edit-athlete-button" onClick={() => startEditingAthlete(athlete)}>
                            Rediger
                        </button>
                        <button className="delete-athlete-button" onClick={() => handleDeleteAthlete(athlete.id)}>
                            Slet
                        </button>
                    </div>
                ))}
            </section>
        </>
    );
}
