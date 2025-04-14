'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [movimientos, setMovimientos] = useState(() => {
    const guardados = localStorage.getItem('movimientos');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');

  useEffect(() => {
    localStorage.setItem('movimientos', JSON.stringify(movimientos));
  }, [movimientos]);

  const agregarMovimiento = () => {
    if (!descripcion || isNaN(parseFloat(monto))) {
      alert('Completa ambos campos correctamente.');
      return;
    }
    const nuevo = { descripcion, monto: parseFloat(monto) };
    setMovimientos([...movimientos, nuevo]);
    setDescripcion('');
    setMonto('');
  };

  const eliminarMovimiento = (index) => {
    const copia = [...movimientos];
    copia.splice(index, 1);
    setMovimientos(copia);
  };

  const saldo = movimientos.reduce((acc, mov) => acc + mov.monto, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">💰 Control de Gastos</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-32 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={agregarMovimiento}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2">Movimientos</h2>
        <ul className="space-y-2 mb-4">
          {movimientos.map((mov, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-3 rounded ${
                mov.monto >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <span>{mov.descripcion}: ${mov.monto}</span>
              <button
                onClick={() => eliminarMovimiento(index)}
                className="text-sm text-red-500 hover:text-red-700 font-bold"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-center">
          Saldo:{' '}
          <span className={saldo >= 0 ? 'text-green-600' : 'text-red-600'}>
            ${saldo.toFixed(2)}
          </span>
        </h2>
      </div>
    </div>
  );
}