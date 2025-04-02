import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="ornek@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            placeholder="Şifreniz"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label> Şartları kabul ediyorum</label>
          {errors.terms && <p style={{ color: "red" }}>{errors.terms}</p>}
        </div>

        <button type="submit" disabled={!isFormValid}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
