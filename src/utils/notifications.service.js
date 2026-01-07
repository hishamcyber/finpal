const LS_KEY = "finpal_notifications_v1";

function seed() {
  return [
    {
      id: crypto.randomUUID(),
      category: "inbox",
      type: "message",
      title: "New message from a member",
      body: "A member sent you a message. Tap to view the conversation.",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      link: "/members"
    },
    {
      id: crypto.randomUUID(),
      category: "following",
      type: "activity",
      title: "Someone you follow posted an update",
      body: "A followed user posted a new activity update.",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      link: "/dashboard"
    },
    {
      id: crypto.randomUUID(),
      category: "archive",
      type: "system",
      title: "Weekly stats report ready",
      body: "Your weekly report is available in Statistics.",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
      link: "/statistics"
    }
  ];
}

function readLS() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeLS(items) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export async function fetchNotifications() {
  // simulate real network delay
  await new Promise((r) => setTimeout(r, 200));

  let items = readLS();
  if (!items) {
    items = seed();
    writeLS(items);
  }
  return items;
}

export async function saveNotifications(items) {
  await new Promise((r) => setTimeout(r, 50));
  writeLS(items);
  return true;
}