// Kept under the original module path so the legacy guestbook can use the VPS API.
const request = async (url, options) => {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error('הפעולה נכשלה. נסו שוב.')
  return response.json()
}

export const greetingsApi = {
  createGreeting: value => request('/api/greetings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) }),
  getApprovedGreetings: async () => (await request('/api/greetings')).filter(item => item.status === 'approved'),
  getAllGreetings: () => request('/api/greetings'),
  getPendingGreetings: async () => (await request('/api/greetings')).filter(item => item.status === 'pending'),
  approveGreeting: id => request(`/api/greetings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'approved' }) }),
  rejectGreeting: id => request(`/api/greetings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'rejected' }) }),
  deleteGreeting: id => request(`/api/greetings/${id}`, { method: 'DELETE' }),
}
