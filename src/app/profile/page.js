"use client";

import { auth } from "../../firebase/config";

export default function ProfilePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        User Profile
      </h1>

      <p>
        {auth.currentUser?.email}
      </p>
    </main>
  );
}