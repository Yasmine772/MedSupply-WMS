import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../src/axios-client.js";
import { useStateContext } from "../../src/contexts/ContextProvider.jsx";

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient.post("/signin", payload)
      .then(({ data }) => {
        console.log("Login success:", data);
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1 className="title">Sign in to your account</h1>

        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button className="btn btn-block">Login</button>
      </form>

      <p className="message">
        Not Registered? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
