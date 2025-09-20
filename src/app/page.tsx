"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const [contests, setContests] = useState<any[]>([])

  useEffect(() => {
    const fetchContests = async () => {
      const { data, error } = await supabase.from("contests").select("*")
      if (error) console.error(error)
      else setContests(data || [])
    }
    fetchContests()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 Skitmakers Clone</h1>
      <p className="mb-6">A platform for contests, submissions, and votes.</p>
      <h2 className="text-xl font-semibold mb-2">Active Contests</h2>
      {contests.length === 0 ? (
        <p>No contests yet. Add one from Supabase dashboard!</p>
      ) : (
        <ul className="space-y-2">
          {contests.map((c) => (
            <li
              key={c.id}
              className="border p-3 rounded shadow-sm hover:bg-gray-100"
            >
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p>{c.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(c.start_at).toLocaleDateString()} →{" "}
                {new Date(c.end_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
