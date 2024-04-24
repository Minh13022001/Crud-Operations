import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Result } from "../../type/result";
import { setProfileToLS } from "../../utils/authen";
import { AppContext } from "../../contexts/app.context";
const Login = () => {
  const [users, setUser] = useState<Result[]>([]);
  const [formData, setFormData] = useState({ email: "", password: "" })

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [error, setError] = useState({ email: "", password: "" });
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const navigate = useNavigate();
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
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
  // const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;

  const validationErrors: { email: string; password: string } = {
    email: "",
    password: "",
  };
  const emailRegex = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;

  const checkEmail = () => {
    if (emailRegex.test(formData.email)) {
      validationErrors.email = "";
      console.log("ok");
    } else {
      validationErrors.email = "Email is not valid";
      console.log("not ok");

    }
  };

  const checkPassword = () => {
    if (passwordRegex.test(formData.password)) {
      console.log("password is ok");
      validationErrors.password = "";
    } else {
      validationErrors.password = "Password is not valid";
    }
  };
  const isMatch = users.some(user => user.email === formData.email && user.password === formData.password);
  const matchedUser = users.find(user => user.email === formData.email && user.password === formData.password);

  const updateStatus = () => {
    setProfile(matchedUser as Result)
    setIsAuthenticated(true)

  }


  // console.log(matchedUser, 'this is mathched userr')
  // console.log(formDataaa, 'this is  userr')

  const checkFinalResult = () => {
    const isErrorEmpty = Object.values(error).every((value) => value === "");
    
    if(isErrorEmpty && isMatch){

        updateStatus()

        setProfileToLS(matchedUser as Result)
        navigate('/')
        
    }
      
  }
  // console.log('so this is the formData', formData)


  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('matcheddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')

  

    // setSubmitted(true);

    checkEmail();
    checkPassword();
    console.log('matcheddddddddddddddddddddddddddddddddddddddddddddddd')

    setError(validationErrors);
    console.log('matcheddddddddddddddddddddddddddddddddddd')

    checkFinalResult();
    console.log('matcheddddddddddddddddddddd')

   };

  const Validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === "email") {
      setFormData({...formData, email: value});

      setError({...error, email : ''})
    } else if (name === "password") {
      setFormData({...formData, password: value});
      setError({...error, password : ''})

    }
  };

  // console.log(error, 'this is emailllll')
  return (
    <div className="signin">
      <div className="signin-info">
        <h1>CRUD OPERATIONS</h1>
        <h2>SIGN IN</h2>
        <h3>Enter your credentials to access your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="signin-email">
            <p>Email</p>
            <input
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={Validate}
            />
              <div className="error-message">{error.email}</div>
          </div>
          <div className="signin-password">
            <p>Password</p>
            <input
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={Validate}
            />
              <div className="error-message">{error.password}</div>
          </div>
          <button type="submit">SIGN IN</button>
        </form>
        <p>
          Forgot your password? <Link to="/">Reset password</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;

//so bc setError and setFormData is not seted yet but i started checking so there just no value to check;
// i thought the 2 state in updateStatus will get setted before setLocalStorage()
// cant update let object