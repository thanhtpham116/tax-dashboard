"use client";

import { useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState("");
  const [results, setResults] = useState(null);

  const calculateTax = () => {
  const income = Number(salary);

let federalTaxRate;
let quebecTaxRate;
if (income <= 50000) {
  federalTaxRate = 0.15;
} else if (income <= 100000) {
  federalTaxRate = 0.20;
} else {
  federalTaxRate = 0.25;
}
if (income <= 50000) {
  quebecTaxRate = 0.10;
} else if (income <= 100000) {
  quebecTaxRate = 0.15;
} else {
  quebecTaxRate = 0.20;
}
const federalTax = income * federalTaxRate;

const quebecTax = income * quebecTaxRate;

  const totalTax = federalTax + quebecTax;

  const netIncome = income - totalTax;

  setResults({
    federalTax,
    quebecTax,
    totalTax,
    netIncome,
  });
};

  return (
<main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">      
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4">
<h1 className="text-4xl font-bold text-center text-black">
          Canadian Tax Calculator
      </h1>

      <input
        type="number"
        placeholder="Enter salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full text-lg"
      />

      <button
        onClick={calculateTax}
        className="bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-800 transition"
      >
        Calculate
      </button>

{results && (
  <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 text-lg">
    <p className="flex justify-between">
  <span>Federal Tax</span>
  <span>${results.federalTax.toFixed(2)}</span>
 ${results.federalTax.toFixed(2)}</p>

    <p className="flex justify-between">
  <span>Quebec Tax</span>
  <span>${results.quebecTax.toFixed(2)}</span>
 ${results.quebecTax.toFixed(2)}</p>

    <p className="flex justify-between">
  <span>Total Tax</span>
  <span>${results.totalTax.toFixed(2)}</span>
 ${results.totalTax.toFixed(2)}</p>

    <p className="flex justify-between font-bold text-green-600">
  <span>Net Income</span>
  <span>${results.netIncome.toFixed(2)}</span>
 ${results.netIncome.toFixed(2)}</p>
  </div>
)}
</div>
    </main>
  );
}