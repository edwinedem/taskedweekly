//import logo from './logo.svg';
import React, { useState } from "react";
import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  //loading formdata from local storage
  React.useEffect(() => {
    const storeData = localStorage.getItem("formData");
    if (storeData) {
      setFormData(JSON.parse(storeData));
    }
  }, []);
  // Toggle between login page and register page 
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  // Validation rules for formdata or userdata
  const validationRules = {
    name: { required: isRegister, minLength: 5 },
    email: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    password: {
      required: true,
      minLength: 8,
    },
  };

  // Validation function for the rules to validate 
  const validate = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      const value = formData[field];

      if (rule.required && !value) {
        newErrors[field] = `${field} is required`;
      } else if (rule.minLength && value.length < rule.minLength) {
        newErrors[
          field
        ] = `${field} must be at least ${rule.minLength} characters`;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = `Invalid ${field} format`;
      }
    });
    return newErrors;
  };

  
  // Handle input  submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (isRegister) {
      const storedData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem("formData", JSON.stringify(storedData));
      setFormData({ name: "", email: "", password: "" });

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        alert("Registration successful!");
        setErrors({});
      }
    } else {
      const storedData = JSON.parse(localStorage.getItem("formData"));

      if (storedData) {
        if (
          formData.email === storedData.email &&
          formData.password === storedData.password
        ) {
          alert("Login successful!");
          setErrors({});
          setFormData({ name: "", email: "", password: "" });
        } else {
          setErrors({ email: "Invalid email or password" });
        }
      } else {
        setErrors({ email: "No registered user found" });
      }
    }
  };

  // Handle changes in input 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{isRegister ? "REGISTER" : "LOGIN"}</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isRegister && (
          <>
            <input
              name="name"
              placeholder="Enter Username"
              value={formData.name}
              onChange={handleChange}
              style={{
                borderRadius: "100px",
                padding: "10px",
                marginBottom: "10px",
                width: "250px",
              }}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </>
        )}

        <input
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            borderRadius: "100px",
            padding: "10px",
            marginBottom: "10px",
            width: "250px",
          }}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={{
            borderRadius: "100px",
            padding: "10px",
            marginBottom: "10px",
            width: "250px",
          }}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <button
          type="submit"
          style={{
            width: "170px",
            borderRadius: "100px",
            padding: "10px",
            marginBottom: "10px",
            width: "250px",
          }}
        >
          {isRegister ? "REGISTER" : "LOGIN"}
        </button>
      </form>

      <button
        onClick={toggleForm}
        style={{ color: "green", border: "none", background: "none" }}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
      {formData && (
        <div>
          <h2>Saved userdata:</h2>
          <p>name:{formData.name}</p>
          <p>email:{formData.email}</p>
        </div>
      )}
    </div>
  );
}
export default App;
