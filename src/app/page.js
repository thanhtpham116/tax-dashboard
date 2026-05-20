"use client";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [history, setHistory] = useState([]);
  const [salary, setSalary] = useState("");
  const [rrsp, setRrsp] = useState("");
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formatCurrency = (value) => {
  return value.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
};
  const calculateTax = async () => {
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

const federalTax = taxableIncome * federalTaxRate;

const quebecTax = taxableIncome * quebecTaxRate;

  const totalTax = federalTax + quebecTax;

  const netIncome = income - totalTax;
  const taxSavings = rrspContribution * 0.25;

try {
  if (auth.currentUser) {
    await addDoc(collection(db, "taxCalculations"), {
      uid: auth.currentUser.uid,

      salary: Number(salary),

      rrsp: Number(rrsp),

      taxableIncome,

      federalTax,

      quebecTax,

      netIncome,

      createdAt: new Date(),
    });
    loadHistory();
  }
} catch (error) {
  console.log(error);
}

  setResults({
    taxableIncome,
rrspContribution,
taxSavings,
    federalTax,
    quebecTax,
    totalTax,
    netIncome,
  });

await loadHistory();

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

const handleSignup = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created successfully!");
  } catch (error) {
    alert(error.message);
  }
};

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in successfully!");
  } catch (error) {
    alert(error.message);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (error) {
    alert(error.message);
  }
};

const loadHistory = async () => {
  try {
    if (!auth.currentUser) {
      console.log("No user logged in");
      return;
    }

    console.log("Loading history for:", auth.currentUser.uid);

    const q = query(
      collection(db, "taxCalculations"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    const historyData = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      historyData.push(doc.data());
    });

    console.log("History loaded:", historyData);

    setHistory(historyData);

  } catch (error) {
    console.log("Firestore error:", error);
  }
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
    }
  });

  return () => unsubscribe();
}, []);
  return (
<main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">      
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4">
<h1 className="text-4xl font-bold text-center text-black">
          Canadian Tax Calculator
      </h1>
<input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="border border-gray-300 p-3 rounded-lg w-full text-lg"
/>
<input
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="border border-gray-300 p-3 rounded-lg w-full text-lg"
/>

<button
  onClick={handleSignup}
  className="bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
>
  Sign Up
</button>

<button
  onClick={handleLogin}
  className="bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition mt-2"
>
  Log In
</button>

<button
  onClick={handleLogout}
  className="bg-red-600 text-white py-3 rounded-lg text-lg hover:bg-red-700 transition mt-2"
>
  Log Out
</button>

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
  <span>RRSP Contribution</span>
  <span>{formatCurrency(results.rrspContribution)}</span>
</p>

<p className="flex justify-between">
  <span>Taxable Income</span>
  <span>{formatCurrency(results.taxableIncome)}</span>
</p>

<p className="flex justify-between">
  <span>Federal Tax</span>
  <span>{formatCurrency(results.federalTax)}</span>
</p>

<p className="flex justify-between">
  <span>Quebec Tax</span>
  <span>{formatCurrency(results.quebecTax)}</span>
</p>

<p className="flex justify-between">
  <span>Total Tax</span>
  <span>{formatCurrency(results.totalTax)}</span>
</p>

 <p className="flex justify-between font-bold text-blue-600">
  <span>Estimated Tax Savings</span>
  <span>{formatCurrency(results.taxSavings)}</span>
</p>

<p className="flex justify-between">
  <span>Net Income</span>
  <span>{formatCurrency(results.netIncome)}</span>
</p>

<p className="text-sm text-gray-600 mt-2">
  Status: {auth.currentUser ? "Logged in" : "Not logged in"}
</p>

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

<div className="mt-8 w-full">
  <h2 className="text-2xl font-bold mb-4">
    Previous Calculations
  </h2>
{history.length === 0 && (
  <p>No saved calculations yet.</p>
)}
    {history.map((item, index) => (
      <div
        key={index}
        className="bg-gray-100 p-4 rounded-xl"
      >
        <p>Salary: {formatCurrency(item.salary)}</p>

        <p>RRSP: {formatCurrency(item.rrsp)}</p>

        <p>
          Net Income:
          {formatCurrency(item.netIncome)}
        </p>
      </div>
    ))}
  </div>

    </main>
  );
}