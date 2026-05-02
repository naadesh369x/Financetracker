// Frontend helper to add expense using saved token
export async function addExpense({ amount, description }) {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({ amount, description }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw data || new Error('Failed to add expense');
  }

  return res.json();
}
