export async function getNotificationsMock() {
  await new Promise(r => setTimeout(r, 150));

  return [
    {
      id: "n1",
      category: "inbox",
      title: "New message received",
      body: "You have a new message from a member.",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      link: "/message"
    },
    {
      id: "n2",
      category: "following",
      title: "Member you follow posted an update",
      body: "A followed member posted new activity.",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      link: "/members"
    },
    {
      id: "n3",
      category: "archive",
      title: "System notice",
      body: "Your weekly report is available.",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      link: "/statistics"
    }
  ];
}
