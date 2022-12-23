import React, { useEffect, useState } from 'react';
import fetch from 'cross-fetch';

export function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function init() {
      const response = await fetch('https://mydomain.com');
      const json = await response.json();
      setMessage(json.message);
    }

    init();
  }, []);

  return <div>{message}</div>;
}
