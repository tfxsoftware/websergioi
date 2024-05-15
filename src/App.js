import React, { useState } from 'react';
import axios from 'axios';

function Calculator() {
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  };
  const handleNum3Change = (event) => {
    setNum3(event.target.value);
  };

  const handleNum4Change = (event) => {
    setNum4(event.target.value);
  };


  const calculateSum = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.example.com/add?num1=${num3}&num2=${num2}`);
      setResult(response.data.result);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Calculadora de Juros</h2>
      <div>
        <label htmlFor="investimentoMensal">Investimento Mensal: </label>
        <input
          type="number"
          id="investimentoMensal"
          value={num2}
          onChange={handleNum2Change}
        />
      </div>
      <div>
        <label htmlFor="TaxaJurosM">Taxas de Juros Mensal: </label>
        <input
          type="number"
          id="TaxaJurosM"
          value={num3}
          onChange={handleNum3Change}
        />
      </div>
      <div>
        <label htmlFor="PeriodoTempom">Período de tempo (meses): </label>
        <input
          type="number"
          id="PeriodoTempoM"
          value={num4}
          onChange={handleNum4Change}
        />
      </div>
      <button onClick={calculateSum} disabled={loading}>
        {loading ? 'Carregando...' : 'Calcular!'}
      </button>
      {error && <div>Error: {error}</div>}
      {result && <div>Resultado: {result}</div>}
    </div>
  );
}

export default Calculator;
