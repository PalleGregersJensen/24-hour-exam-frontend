import { useState } from "react";
import { useEffect } from "react";
import { fetchResults } from "../apiFacade";

interface Result {
    id: number;
    resultType: string;
    resultDate: Date;
    resultValue: string;
    athleteId: number;
    athleteFirstname: string;
    athleteLastName: string;
    disciplineId: number;
    disciplineName: string;
}

export default function Results() {
    const [results, setResults] = useState<Result[]>([]);

    const fetchData = async () => {
        try {
            const resultData = await fetchResults();
            setResults(resultData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Results</h1>
            <p>This is the results page.</p>
            <table>
                <thead>
                    <tr>
                        <th>Discipline</th>
                        <th>Resultat</th>
                        <th>Athlete</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id}>
                            <td>{result.disciplineName}</td>
                            <td>{result.resultValue}</td>
                            <td>
                                {result.athleteFirstname} {result.athleteLastName}
                            </td>
                            <td>{result.resultType}</td>
                            <td>{result.resultDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
