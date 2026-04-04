import { useState } from "react";
import supabase from "../config/supabaseClient"

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        console.error("Error signing up:", signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setLoginError("L'adresse mail ou le mot de passe n'est pas bon.")
        console.error("Error signing up:", signInError.message);
        return;
      }
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-form__title">{isSignUp ? "S'enregistrer" : "Se connecter"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
        <input
          id="password"  
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
        <button
          type="submit"
        >
          {isSignUp ? "S'enregistrer" : "Se connecter"}
        </button>
      </form>
      <button
      className="login-form__button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setLoginError(null)
        }}
      >
        {isSignUp ? "Déjà enregistré ?" : "Créer un compte ?"}
      </button>
      <div>{loginError ?? <p>{ loginError }</p>}</div>
    </div>
  );
};

export default Auth;