import { useState, useEffect } from "react";

export default function ABTestForm() {
  const [variant, setVariant] = useState("A");

  useEffect(() => {
    // Randomly assign A or B only once when component mounts
    const assigned = Math.random() < 0.5 ? "A" : "B";
    setVariant("B");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      variant,
    };

    await fetch("/api/abtest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // After submitting A or B, show a confirmation or switch to B
    alert(`Variant ${variant} submitted successfully.`);
    // Optional: Switch variant for next render
    // setVariant(variant === "A" ? "B" : "A");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lead Form Variant {variant}</h2>
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
