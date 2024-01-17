import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  }
  );

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
    const response = await fetch('http://localhost:5000/api/auth/register',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),  /*coverting object into json format*/
    });


    const res_data = await response.json();
    console.log("res from server", res_data.extraDetails);

    if(response.ok){
      //stored the token in localhost
      storeTokenInLS(res_data.token);
      setUser({username: "", email: "", password: "" });
      toast.success("Registration Successful");
      navigate("/");
    }else{
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
    }
  }catch(error){
    console.log("register", error);
  }
  };

  return (
    <>
      <section>
        <main>
          <div className="register-container">
            <div className="register-content">
                <h1>Registration form</h1>
              {/* our main registration code  */}
              <div className="register-form">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
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
                  <button type="submit" className="register-button">
                    Register Now
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

