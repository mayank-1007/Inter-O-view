import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
    const [name, setName] = useState('');
    const [score, setScore] = useState('');
    const [vacancy, setVacancy] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you could also handle form validation and data submission to a server

        // After submission, navigate to the interview room
        navigate('/interview');
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center">Register for the Interview</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="score" className="block text-sm font-medium">Score</label>
                        <input
                            id="score"
                            type="number"
                            required
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="vacancy" className="block text-sm font-medium">Vacancy</label>
                        <input
                            id="vacancy"
                            type="text"
                            required
                            value={vacancy}
                            onChange={(e) => setVacancy(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
