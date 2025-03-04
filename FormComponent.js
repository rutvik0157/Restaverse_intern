import React, { useState } from 'react';

function FormComponent() {
    const [url, setUrl] = useState('');
    const [data, setData] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setData('');

        try {
            const response = await fetch('http://127.0.0.1:5000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const result = await response.json();
            if (result.error) {
                setError(result.error);
            } else {
                setData(result.content);
            }
        } catch (error) {
            setError('Failed to fetch data. Please check the URL or server.');
        }
    };

    return (
        <div>
            <h2>Web Scraper</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL"
                    required
                />
                <button type="submit">Scrape</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <h3>Scraped Data:</h3>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{data}</pre>
                </div>
            )}
        </div>
    );
}

export default FormComponent;
