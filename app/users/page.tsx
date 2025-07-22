'use client'

import { useState, useEffect } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })

    if (res.ok) {
      setName('')
      setEmail('')
      fetchUsers() // Refresh the user list
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="mb-6">
          {users.map((user: any) => (
            <li key={user.id} className="mb-2">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mb-2">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  )
}
