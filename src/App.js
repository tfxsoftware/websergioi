import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePrincipalChange = (event) => {
    setPrincipal(event.target.value);
  };
  
  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const calculateCompoundInterest = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:3000/calculate', {
        principal,
        rate,
        time
      });
      setResult(response.data.result);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Calculadora de Juros Compostos</h2>
      <div>
        <label htmlFor="principal">Investimento Inicial: </label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={handlePrincipalChange}
        />
      </div>
      <div>
        <label htmlFor="rate">Taxa de Juros Mensal (%): </label>
        <input
          type="number"
          id="rate"
          value={rate}
          onChange={handleRateChange}
        />
      </div>
      <div>
        <label htmlFor="time">Período de Tempo (meses): </label>
        <input
          type="number"
          id="time"
          value={time}
          onChange={handleTimeChange}
        />
      </div>
      <button onClick={calculateCompoundInterest} disabled={loading}>
        {loading ? 'Carregando...' : 'Calcular!'}
      </button>
      {error && <div>Error: {error}</div>}
      {result && <div>Resultado: {result}</div>}
    </div>
  );
}

export default Calculator;
