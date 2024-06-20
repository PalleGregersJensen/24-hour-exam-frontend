import React, { useState, useEffect } from "react";
import { fetchResults, createResult, deleteResult, editResult } from "../apiFacade";
import "../css-files/results.css";

interface Result {
    id: number;
    disciplineName: string;
    resultValue: string;
    athleteFirstname: string;
    athleteLastName: string;
    resultDate: string;
}

export default function Results() {
    const [results, setResults] = useState<Result[]>([]);
    const [newResult, setNewResult] = useState<Omit<Result, "id">>({
        disciplineName: "",
        resultValue: "",
        athleteFirstname: "",
        athleteLastName: "",
        resultDate: "",
    });
    const [editingResult, setEditingResult] = useState<Result | null>(null);

    const fetchData = async () => {
        try {
            const resultsData = await fetchResults();
            setResults(resultsData);
        } catch (error) {
            console.error("Fejl ved hentning af resultater:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateResult = async () => {
        try {
            //ts-expect-error type error
            await createResult(newResult);
            setNewResult({
                disciplineName: "",
                resultValue: "",
                athleteFirstname: "",
                athleteLastname: "",
                resultDate: "",
            });
            fetchData();
        } catch (error) {
            console.error("Fejl ved oprettelse af resultat:", error);
        }
    };

    const handleDeleteResult = async (id: number) => {
        try {
            await deleteResult(id);
            fetchData();
        } catch (error) {
            console.error("Fejl ved sletning af resultat:", error);
        }
    };

    const handleEditResult = async (result: Result) => {
        try {
            await editResult(result.id, result);
            setEditingResult(null);
            fetchData();
        } catch (error) {
            console.error("Fejl ved redigering af resultat:", error);
        }
    };

    const startEditingResult = (result: Result) => {
        setEditingResult(result);
    };

    const getResultUnit = (disciplineName: string) => {
        if (disciplineName === "100m") {
            return "sekunder";
        } else if (disciplineName === "Højdespring") return "meter";
        else {
            return "";
        }
    };

    return (
        <div>
            <h1>Results</h1>
            <p>This is the results page.</p>

            <div className="create-result">
                <h2>Tilføj nyt resultat</h2>
                <input
                    type="text"
                    placeholder="Discipline"
                    value={newResult.disciplineName}
                    onChange={(e) => setNewResult({ ...newResult, disciplineName: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Resultat"
                    value={newResult.resultValue}
                    onChange={(e) => setNewResult({ ...newResult, resultValue: parseFloat(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Fornavn"
                    value={newResult.athleteFirstname}
                    onChange={(e) => setNewResult({ ...newResult, athleteFirstname: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Efternavn"
                    value={newResult.athleteLastname}
                    onChange={(e) => setNewResult({ ...newResult, athleteLastname: e.target.value })}
                />
                <input
                    type="date"
                    value={newResult.resultDate}
                    onChange={(e) => setNewResult({ ...newResult, resultDate: e.target.value })}
                />
                <button onClick={handleCreateResult}>Tilføj resultat</button>
            </div>

            {editingResult && (
                <div>
                    <h2>Rediger resultat</h2>
                    <input
                        type="text"
                        placeholder="Discipline"
                        value={editingResult.disciplineName}
                        onChange={(e) => setEditingResult({ ...editingResult, disciplineName: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Resultat"
                        value={editingResult.resultValue}
                        onChange={(e) =>
                            setEditingResult({ ...editingResult, resultValue: parseFloat(e.target.value) })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Fornavn"
                        value={editingResult.athleteFirstname}
                        onChange={(e) => setEditingResult({ ...editingResult, athleteFirstname: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Efternavn"
                        value={editingResult.athleteLastname}
                        onChange={(e) => setEditingResult({ ...editingResult, athleteLastname: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editingResult.resultDate}
                        onChange={(e) => setEditingResult({ ...editingResult, resultDate: e.target.value })}
                    />
                    <button onClick={() => handleEditResult(editingResult)}>Gem ændringer</button>
                    <button onClick={() => setEditingResult(null)}>Annuller</button>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Discipline</th>
                        <th>Resultat</th>
                        <th>Athlete</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id}>
                            <td>{result.disciplineName}</td>
                            <td>
                                {result.resultValue} {getResultUnit(result.disciplineName)}
                            </td>
                            <td>
                                {result.athleteFirstname} {result.athleteLastName}
                            </td>
                            <td>{result.resultDate}</td>
                            <td>
                                <button onClick={() => startEditingResult(result)}>Rediger</button>
                                <button onClick={() => handleDeleteResult(result.id)}>Slet resultat</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
