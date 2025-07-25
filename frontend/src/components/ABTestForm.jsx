import React, { useState, useEffect } from "react";
import axios from "axios";

const ABTestForm = () => {
  const [variant, setVariant] = useState("A");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
  });

  useEffect(() => {
    const random = Math.random() < 0.5 ? "A" : "B";
    setVariant(random);
    axios.post("http://localhost:5000/api/abtest", { variant: random, action: "view" });
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ABTestForm submit:", variant, formData);
    await axios.post("http://localhost:5000/api/abtest", {
      variant,
      action: "submit",
    });
    alert(`Form submitted (Variant ${variant})`);
    setFormData({ name: "", email: "", phone: "", source: "" });
  };

  return (
    <div>
      <h2>Lead Generation Form – Variant {variant}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {variant === "B" && (
          <>
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              name="source"
              placeholder="How did you find us?"
              value={formData.source}
              onChange={handleChange}
            />
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ABTestForm;
