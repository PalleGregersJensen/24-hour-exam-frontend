import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Results from "./pages/Results";
import Disciplines from "./pages/Disciplines";
import Athletes from "./pages/Athletes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="athletes" element={<Athletes />} />
                    <Route path="results" element={<Results />} />
                    <Route path="disciplines" element={<Disciplines />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
