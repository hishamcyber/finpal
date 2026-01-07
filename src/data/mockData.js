// src/data/mockData.js

// EMPTY users array - will be filled when users register
export let registeredUsers = []

// Get next ID
const getNextId = () => {
  if (registeredUsers.length === 0) return 1
  const maxId = registeredUsers.reduce((max, user) => Math.max(max, user.id), 0)
  return maxId + 1
}

// Add new user with password
export const addUser = (email, password, name) => {
  // Check if user exists
  const existingUser = registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    throw new Error('User already exists')
  }
  
  const newUser = {
    id: getNextId(),
    email: email.toLowerCase().trim(),
    password: password, // SAVING PASSWORD
    name: name.trim(),
    balance: 0,
    transactions: [],
    createdAt: new Date().toISOString()
  }
  
  registeredUsers.push(newUser)
  console.log(`User registered: ID=${newUser.id}, Name=${newUser.name}, Email=${newUser.email}, Password=${newUser.password}`)
  return newUser
}

// Find user by email
export const findUserByEmail = (email) => {
  return registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase())
}

// Dashboard data
export const members = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', balance: 1500 },
  { id: 2, name: 'Maria Garcia', email: 'maria@example.com', balance: 2300 },
  { id: 3, name: 'David Chen', email: 'david@example.com', balance: 850 },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', balance: 3200 }
]

export const exchanges = [
  { id: 1, from: 'Alex', to: 'Maria', amount: 500, date: '2024-01-15' },
  { id: 2, from: 'David', to: 'Sarah', amount: 300, date: '2024-01-14' }
]

export const notifications = [
  { id: 1, message: 'New exchange request from Alex', read: false },
  { id: 2, message: 'Payment successful', read: true }
]