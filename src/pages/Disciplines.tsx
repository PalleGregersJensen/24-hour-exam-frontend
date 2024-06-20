import React, { useState, useEffect } from "react";
import { fetchDisciplines, createDiscipline, editDiscipline, deleteDiscipline } from "../apiFacade";
import "../css-files/disciplines.css";

interface Discipline {
    id: number;
    name: string;
    resultType: string;
}

export default function Disciplines() {
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [editingDiscipline, setEditingDiscipline] = useState<Discipline | null>(null);
    const [newDiscipline, setNewDiscipline] = useState<{ name: string; resultType: string }>({
        name: "",
        resultType: "",
    });

    const getDisciplines = async () => {
        const data = await fetchDisciplines();
        setDisciplines(data);
    };

    useEffect(() => {
        getDisciplines();
    }, []);

    const handleCreateDiscipline = async () => {
        try {
            const createdDiscipline = await createDiscipline(newDiscipline);
            setDisciplines([...disciplines, createdDiscipline]);
            setNewDiscipline({ name: "", resultType: "" }); // Nulstil inputfelterne
        } catch (error) {
            console.error("Fejl ved oprettelse af disciplin:", error);
        }
    };

    const handleUpdateDiscipline = async () => {
        if (editingDiscipline) {
            try {
                const updatedDiscipline = await editDiscipline(editingDiscipline.id, editingDiscipline);
                const updatedDisciplines = disciplines.map((d) =>
                    d.id === updatedDiscipline.id ? updatedDiscipline : d
                );
                setDisciplines(updatedDisciplines);
                setEditingDiscipline(null);
            } catch (error) {
                console.error("Fejl ved opdatering af disciplin:", error);
            }
        }
    };

    const handleDeleteDiscipline = async (id: number) => {
        try {
            await deleteDiscipline(id);
            const updatedDisciplines = disciplines.filter((d) => d.id !== id);
            setDisciplines(updatedDisciplines);
        } catch (error) {
            console.error("Fejl ved sletning af disciplin:", error);
        }
    };

    return (
        <>
            <h1>Disciplines</h1>
            <p>This is the disciplines page.</p>
            <div className="create-discipline">
                <h2>Opret ny disciplin</h2>
                <input
                    type="text"
                    placeholder="Navn"
                    value={newDiscipline.name}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Result Type"
                    value={newDiscipline.resultType}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, resultType: e.target.value })}
                />
                <button onClick={handleCreateDiscipline}>Opret disciplin</button>
            </div>

            <section className="disciplines-container">
                {disciplines.map((discipline: Discipline) => (
                    <div key={discipline.id} className="discipline-card">
                        {editingDiscipline && editingDiscipline.id === discipline.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingDiscipline.name}
                                    onChange={(e) =>
                                        setEditingDiscipline({ ...editingDiscipline, name: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editingDiscipline.resultType}
                                    onChange={(e) =>
                                        setEditingDiscipline({ ...editingDiscipline, resultType: e.target.value })
                                    }
                                />
                                <button onClick={handleUpdateDiscipline}>Gem ændringer</button>
                                <button onClick={() => setEditingDiscipline(null)}>Annuller</button>
                            </div>
                        ) : (
                            <>
                                <p>Disciplin: {discipline.name}</p>
                                <p>Enhed: {discipline.resultType}</p>
                                <button
                                    className="edit-discipline-button"
                                    onClick={() => setEditingDiscipline(discipline)}
                                >
                                    Rediger
                                </button>
                                <button
                                    className="delete-discipline-button"
                                    onClick={() => handleDeleteDiscipline(discipline.id)}
                                >
                                    Slet
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </section>
        </>
    );
}
