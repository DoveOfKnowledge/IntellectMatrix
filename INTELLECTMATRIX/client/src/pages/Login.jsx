import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try{
      const response = await fetch('http://localhost:5000/api/auth/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),  /*coverting object into json format*/
      });

      console.log("Login form", response);
      const res_data = await response.json();

      if(response.ok){
       
        console.log("res from server", res_data);
        //stored the token in localhost
        storeTokenInLS(res_data.token);

        setUser({email: "", password: "" });
        toast.success("Login Successful");
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid Credential");
      }
      console.log(response);
    }catch(error){
      console.log("login", error);
    }

  };


  return (
    <>
      <section>
        <main>
          <div className="login-container">
            <div className="login-content">
              <h1>Login form</h1>
              {/* our main Login code  */}
              <div className="login-form">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="login-button">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

