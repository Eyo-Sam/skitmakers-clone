"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";  // ✅ alias import

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error(error);
      } else {
        setData(data || []);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <h1>Hello Skitmakers 👋</h1>
      <ul>
        {data.map((user, idx) => (
          <li key={idx}>{user.username}</li>
        ))}
      </ul>
    </main>
  );
}
