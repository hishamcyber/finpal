// src/data/mockData.js

// MEMBERS DATA - Enhanced with UI details
export const members = [
  {
    id: 1,
    name: 'Alex Chen',
    email: 'alex@example.com',
    balance: 1500,
    // Additional UI data
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    joined: '3 months ago',
    lastActive: 'Today',
    status: 'active',
    recentMessage: 'Thanks for sending the rent! 🟧',
    role: 'Roommate',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Maya Rodriguez',
    email: 'maya@example.com',
    balance: 2300,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    joined: '1 year ago',
    lastActive: '2 days ago',
    status: 'inactive',
    recentMessage: 'Can you pick up the groceries this week? I\'ll pay you back.',
    role: 'Roommate',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'David Kim',
    email: 'david@example.com',
    balance: 850,
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    joined: '6 months ago',
    lastActive: '1 week ago',
    status: 'inactive',
    recentMessage: 'The concert tickets came to $86 each.',
    role: 'Friend',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    balance: 3200,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    joined: '2 years ago',
    lastActive: 'Yesterday',
    status: 'active',
    recentMessage: 'Mom\'s birthday gift total is $120 split 4 ways.',
    role: 'Sister',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    name: 'Jamal Williams',
    email: 'jamal@example.com',
    balance: 450,
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    joined: '1 month ago',
    lastActive: 'Online now',
    status: 'online',
    recentMessage: 'Coffee fund is running low, want to chip in?',
    role: 'Co-worker',
    phone: '+1 (555) 567-8901'
  }
];

// CHAT HISTORIES - For when clicking on members
export const chatHistories = {
  1: [ // Alex Chen's chat (from your image)
    {
      id: 1,
      sender: 'them',
      senderName: 'Alex Chen',
      time: '14:06',
      text: 'What is it bro? I\'m all ears',
      type: 'text',
      read: true
    },
    {
      id: 2,
      sender: 'you',
      senderName: 'You',
      time: '14:17',
      text: 'Its almost time for the deadline on the rent I just wanted to let you know in advance.',
      type: 'text',
      read: true
    },
    {
      id: 3,
      sender: 'them',
      senderName: 'Alex Chen',
      time: '15:31',
      text: 'Thanks for sending the rent! 😊',
      type: 'text',
      read: true
    }
  ],
  2: [ // Maya Rodriguez's chat
    {
      id: 1,
      sender: 'them',
      senderName: 'Maya Rodriguez',
      time: 'Yesterday',
      text: 'Hey! Can you pick up groceries this week?',
      type: 'text',
      read: true
    },
    {
      id: 2,
      sender: 'you',
      senderName: 'You',
      time: 'Yesterday',
      text: 'Sure, what do we need?',
      type: 'text',
      read: true
    },
    {
      id: 3,
      sender: 'them',
      senderName: 'Maya Rodriguez',
      time: 'Yesterday',
      text: 'Milk, eggs, bread. Total should be around $45.',
      type: 'text',
      read: true
    }
  ],
  3: [ // David Kim's chat
    {
      id: 1,
      sender: 'them',
      senderName: 'David Kim',
      time: '1 week ago',
      text: 'The concert tickets came to $86 each.',
      type: 'text',
      read: true
    }
  ],
  4: [ // Sarah Johnson's chat
    {
      id: 1,
      sender: 'them',
      senderName: 'Sarah Johnson',
      time: '2 days ago',
      text: 'Mom\'s birthday gift total is $120 split 4 ways.',
      type: 'text',
      read: true
    }
  ],
  5: [ // Jamal Williams's chat
    {
      id: 1,
      sender: 'them',
      senderName: 'Jamal Williams',
      time: 'Today',
      text: 'Coffee fund is running low, want to chip in?',
      type: 'text',
      read: false
    }
  ]
};

// EXCHANGES - Enhanced with more details
export const exchanges = [
  { 
    id: 1, 
    from: 'person1', 
    fromId: 1,
    to: 'person2', 
    toId: 2,
    amount: 500, 
    date: '2024-01-15',
    time: '14:30',
    description: 'Rent share',
    category: 'rent',
    status: 'completed'
  },
  { 
    id: 2, 
    from: 'person3', 
    fromId: 3,
    to: 'person4', 
    toId: 4,
    amount: 300, 
    date: '2024-01-14',
    time: '16:45',
    description: 'Dinner bill',
    category: 'food',
    status: 'completed'
  },
  { 
    id: 3, 
    from: 'Alex Chen', 
    fromId: 1,
    to: 'You', 
    toId: 0,
    amount: 1200, 
    date: '2024-03-15',
    time: '15:31',
    description: 'March Rent',
    category: 'rent',
    status: 'completed'
  },
  { 
    id: 4, 
    from: 'Maya Rodriguez', 
    fromId: 2,
    to: 'You', 
    toId: 0,
    amount: 45.50, 
    date: '2024-03-10',
    description: 'Groceries',
    category: 'food',
    status: 'pending'
  },
  { 
    id: 5, 
    from: 'David Kim', 
    fromId: 3,
    to: 'You', 
    toId: 0,
    amount: 86.00, 
    date: '2024-03-08',
    description: 'Concert Tickets',
    category: 'entertainment',
    status: 'pending'
  }
];

// NOTIFICATIONS - Enhanced
export const notifications = [
  { 
    id: 1, 
    message: 'New exchange request from person1', 
    read: false,
    type: 'request',
    memberId: 1,
    amount: 500,
    date: '2024-01-15 14:30'
  },
  { 
    id: 2, 
    message: 'Your payment was successful', 
    read: true,
    type: 'payment',
    memberId: 2,
    amount: 300,
    date: '2024-01-14 16:45'
  },
  { 
    id: 3, 
    message: 'Alex Chen sent you $1,200.00 for rent', 
    read: true,
    type: 'payment_received',
    memberId: 1,
    amount: 1200.00,
    date: '2024-03-15 15:31'
  },
  { 
    id: 4, 
    message: 'Maya Rodriguez requested $45.50 for groceries', 
    read: false,
    type: 'request',
    memberId: 2,
    amount: 45.50,
    date: '2024-03-14 15:45'
  },
  { 
    id: 5, 
    message: 'David Kim requested $86.00 for concert tickets', 
    read: true,
    type: 'request',
    memberId: 3,
    amount: 86.00,
    date: '2024-03-08 19:20'
  }
];

// STATISTICS DATA (for StatisticsView)
export const statistics = {
  totalBalance: 8500,
  totalMembers: 5,
  activeExchanges: 2,
  monthlyTotal: 1426.50,
  categories: [
    { name: 'Rent', amount: 1700, percentage: 65 },
    { name: 'Food', amount: 345.50, percentage: 12 },
    { name: 'Utilities', amount: 185.25, percentage: 10 },
    { name: 'Entertainment', amount: 86.00, percentage: 5 },
    { name: 'Other', amount: 94.50, percentage: 8 }
  ]
};

// HELPER FUNCTIONS
export const getMemberById = (id) => {
  return members.find(member => member.id === id);
};

export const getChatHistoryByMemberId = (id) => {
  return chatHistories[id] || [];
};

export const getExchangesByMemberId = (memberId) => {
  return exchanges.filter(exchange => 
    exchange.fromId === memberId || exchange.toId === memberId
  );
};

export const getUnreadNotifications = () => {
  return notifications.filter(notification => !notification.read);
};

export const getUnreadCount = () => {
  return notifications.filter(notification => !notification.read).length;
};

// DASHBOARD DATA
export const dashboardData = {
  streak: 659,
  totalMembers: members.length,
  pendingExchanges: exchanges.filter(e => e.status === 'pending').length,
  totalAmountThisMonth: 1426.50
};

// Export everything in a default object for convenience
export default {
  members,
  chatHistories,
  exchanges,
  notifications,
  statistics,
  dashboardData,
  getMemberById,
  getChatHistoryByMemberId,
  getExchangesByMemberId,
  getUnreadNotifications,
  getUnreadCount
};