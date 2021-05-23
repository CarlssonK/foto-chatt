export default async function loginCheck() {
    const res = await fetch("http://localhost:3000/api/user");
    const data = await res.json();
    return data
}