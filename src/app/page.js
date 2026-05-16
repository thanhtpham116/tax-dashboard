"use client";

import { useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState("");
  const [tax, setTax] = useState(null);

  const calculateTax = () => {
    const estimatedTax = salary * 0.30;
    setTax(estimatedTax);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">
        Canadian Tax Calculator
      </h1>

      <input
        type="number"
        placeholder="Enter salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={calculateTax}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {tax !== null && (
        <p className="text-xl">
          Estimated Tax: ${tax}
        </p>
      )}
    </main>
  );
}