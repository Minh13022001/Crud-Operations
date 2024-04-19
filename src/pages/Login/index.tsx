import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { Result } from "../../type/result";
const Login = () => {
  const [users, setUser] = useState<Result[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const fetchUsers = () => {
    fetch("https://66179268ed6b8fa434830f0b.mockapi.io/api/students", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Specify the return type as Promise<Task[]>
        }
        // handle error
      })
      .then((data: Result[]) => {
        setUser(data);
      })
      .catch((error) => {
        console.log("you got an error", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  // const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
  // const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonObject: Record<string, string | File> = {};

    formData.forEach((value, key) => {
      if (value instanceof File) {
        jsonObject[key] = value;
      } else {
        jsonObject[key] = value.toString();
      }
    });

    // Now you have a JSON object ready to be sent to the API
    console.log(jsonObject, "this is json Object");


    console.log(JSON.stringify(jsonObject), 77);
    console.log("submitted,0009");
  };



  const ValidateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const emailRegex = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;

    const { value, name } = e.target;
    const validationErrors : {email: string, password: string} = {
      email: '',
      password: ''
    }

    if (name === "email" && emailRegex.test(value)) {
      console.log('ok')
    } else {
      validationErrors.email = "Email is not valid";
    } 
     
    if (name === 'password') {
      if(passwordRegex.test(value)){
        console.log('ok')
      }else{
        validationErrors.password = 'Password is not valid'
      }
    }
    
  };

  return (
    <div className="signin">
      <div className="signin-info">
        <h1>CRUD OPERATIONS</h1>
        <h2>SIGN IN</h2>
        <h3>Enter your credentials to access your account</h3>
        <form>
          <div className="signin-email">
            <p>Email</p>
            <input placeholder="Enter your email" value={email} name="email"/>
            <div className="error-message"> Invalid email</div>
          </div>
          <div className="signin-password">
            <p>Password</p>
            <input placeholder="Enter your password" value={password} name="password"/>
            <div className="error-message">Invalid password</div>
          </div>
          <button>SIGN IN</button>
        </form>
        <p>
          Forgot your password? <Link to="/">Reset password</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
