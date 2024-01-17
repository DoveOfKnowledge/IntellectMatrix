import { useState } from "react";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";
import { resolvePath } from "react-router-dom";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };


export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);

  const {user} = useAuth();

  if(userData && user){
    setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
      setUserData(false);
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:5000/api/form/contact",
     { method: "POST",
       headers:{
      'Content-Type': "application/json"
     },
     body: JSON.stringify(contact),
    });

    console.log(response);
    const data = await response.json();

    if(response.ok){

      console.log(data.userData);
      setContact(defaultContactFormData);
  
      toast.success("message sent successfully");
    }
    console.log(response);
    }catch(error){
      toast.error("message not send");
      console.log(error);
    }
  };

  return (
    <>
      <section className="Contact-container">
        <div className="Contact-conent">
          <h1>Contact Us</h1>
          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  placeholder="username"
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  placeholder="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  placeholder="message"
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button className="Contact-button" type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>
        </section>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30150.054266577376!2d72.82275632566554!3d19.16212079008777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b65081d27f11%3A0xa3ddbac169463ee3!2sGoregaon%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703503839161!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
    </>
  );
};