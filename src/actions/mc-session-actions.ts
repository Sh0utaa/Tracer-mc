export async function fetchSession(id: string) {
  const res = await fetch(`/api/mc-table?id=${id}`);
  if (!res.ok) {
    throw new Error("Session not found");
  }
  return res.json();
}

export async function fetchSessionsByCity(city: string) {
  const res = await fetch(`/api/mc-table?city=${city}`);
  if (!res.ok) {
    throw new Error("Sessions not found");
  }
  return res.json();
}

export async function fetchAllRegisteredCities() {
  const res = await fetch(`/api/mc-table}`);
  if (!res.ok) {
    throw new Error("Sessions not found");
  }
  return res.json();
}
