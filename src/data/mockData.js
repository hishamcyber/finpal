export const members = [
  { id: 1, name: 'person1', email: 'person1@example.com', balance: 1500 },
  { id: 2, name: 'person2', email: 'person2@example.com', balance: 2300 },
  { id: 3, name: 'person3', email: 'person3@example.com', balance: 850 },
  { id: 4, name: 'person4', email: 'person4@example.com', balance: 3200 }
]

export const exchanges = [
  { id: 1, from: 'person1', to: 'person2', amount: 500, date: '2024-01-15' },
  { id: 2, from: 'person3', to: 'person4', amount: 300, date: '2024-01-14' }
]

export const notifications = [
  { id: 1, message: 'New exchange request from person1', read: false },
  { id: 2, message: 'Your payment was successful', read: true }
]