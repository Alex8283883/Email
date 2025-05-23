import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/latest-email")
        .then(res => res.json())
        .then(data => setEmail(data.body || "No email yet"));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Latest Email from SkinApe</h1>
      <pre>{email}</pre>
    </div>
  );
  }
