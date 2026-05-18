"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [salary, setSalary] = useState("");
  const [rrsp, setRrsp] = useState("");
  const [results, setResults] = useState(null);
const formatCurrency = (value) => {
  return value.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
};
  const calculateTax = () => {
  const income = Number(salary);
  const rrspContribution = Number(rrsp);
  const taxableIncome = income - rrspContribution;
if (!salary || income <= 0) {
  alert("Please enter a valid income.");
  return;
}
let federalTaxRate;
let quebecTaxRate;
if (taxableIncome <= 50000) {
  federalTaxRate = 0.15;
} else if (taxableIncome <= 100000) {
  federalTaxRate = 0.20;
} else {
  federalTaxRate = 0.25;
}
if (taxableIncome <= 50000) {
  quebecTaxRate = 0.10;
} else if (taxableIncome <= 100000) {
  quebecTaxRate = 0.15;
} else {
  quebecTaxRate = 0.20;
}
const federalTax = income * federalTaxRate;

const quebecTax = income * quebecTaxRate;

  const totalTax = federalTax + quebecTax;

  const netIncome = income - totalTax;
  const taxSavings = rrspContribution * 0.25;

  setResults({
    taxableIncome,
rrspContribution,
taxSavings,
    federalTax,
    quebecTax,
    totalTax,
    netIncome,
  });
};
  const chartData = results
  ? [
      {
        name: "Federal Tax",
        amount: results.federalTax,
      },
      {
        name: "Quebec Tax",
        amount: results.quebecTax,
      },
      {
        name: "Net Income",
        amount: results.netIncome,
      },
    ]
  : [];

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
      <input
  type="number"
  placeholder="Enter RRSP contribution"
  value={rrsp}
  onChange={(e) => setRrsp(e.target.value)}
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
      <p className="flex justify-between">
  <span>RRSP Contribution</span>
  <span>{formatCurrency(results.rrspContribution)}</span>
</p>

<p className="flex justify-between">
  <span>Taxable Income</span>
  <span>{formatCurrency(results.taxableIncome)}</span>
</p>
  <span>Federal Tax</span>
  <span>${results.federalTax.toFixed(2)}</span>
 {formatCurrency(results.federalTax)}</p>

    <p className="flex justify-between">
  <span>Quebec Tax</span>
  <span>${results.quebecTax.toFixed(2)}</span>
 {formatCurrency(results.quebecTax)}</p>

    <p className="flex justify-between">
  <span>Total Tax</span>
  <span>${results.totalTax.toFixed(2)}</span>
 {formatCurrency(results.totalTax)}</p>
 <p className="flex justify-between font-bold text-blue-600">
  <span>Estimated Tax Savings</span>
  <span>{formatCurrency(results.taxSavings)}</span>
</p>

    <p className="flex justify-between font-bold text-green-600">
  <span>Net Income</span>
  <span>${results.netIncome.toFixed(2)}</span>
 {formatCurrency(results.netIncome)}</p>
  </div>
)}
{results && (
  <div className="w-full h-80 mt-6">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)}
</div>
    </main>
  );
}