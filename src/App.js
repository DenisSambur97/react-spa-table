import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TablePage from './components/TablePage/TablePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TablePage />} />
                <Route path="/:page" element={<TablePage />} />
            </Routes>
        </Router>
    );
}

export default App;
