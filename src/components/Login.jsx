import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css"; // stilleri buradan alacak

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  useEffect(() => {
    const newErrors = {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Geçerli bir email giriniz.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Şifre en az 8 karakter, büyük harf ve sayı içermeli.";
    }
    if (!acceptedTerms) {
      newErrors.terms = "Şartları kabul etmelisiniz.";
    }
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [email, password, acceptedTerms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      history.push("/success");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Giriş Yap</h2>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="ornek@mail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          placeholder="Şifreniz"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label>Şartları kabul ediyorum</label>
        </div>
        {errors.terms && <p className="error">{errors.terms}</p>}

        <button type="submit" disabled={!isFormValid}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
