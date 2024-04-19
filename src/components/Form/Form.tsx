import React, { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

interface FormProps {
  handleClick: () => void;
  isAdd?: string;
  refetch: ()=> void
}

const Form: React.FC<FormProps> = ({ handleClick, isAdd, refetch }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const navigate = useNavigate()
  const [img, setImg] = useState('')
  const [phone, setPhone] = useState<number>();
  const [enrollNumber, setEnrollNumber] = useState<number>(0);
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    phone: false,
    enroll: false,
    birthday: false,
    confirm: !isAdd,
  });
  const isAllValid = Object.values(isValid).every((value) => value === true);

  console.log(isValid, "this is isvalid");

  const addUsers = (userInfo : Record<string, string | File>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      fetch("https://66179268ed6b8fa434830f0b.mockapi.io/api/students", {
        method: "POST",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(userInfo)
      })
      .then(res => {
        if (res.ok) {
            resolve();
        } else {
            reject(new Error('Failed to add user'));
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  }

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

    addUsers(jsonObject).then(() => {
      // Call the refetch function to fetch the updated list of users
      refetch();
      
    });
    console.log(JSON.stringify(jsonObject), 77);
    console.log("submitted,0009");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;

    setConfirmPassword(event.target.value);
    setIsValid({ ...isValid, [name]: event.target.value === password });
  };

  const ValidateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { value, name } = e.target;
    console.log(name, "this is name");

    if (name === "name" && value.length > 4 && value.length < 50) {
      console.log(" nameeeeeeeeeeeeeeeeeeeeeeeeeeee");
      setIsValid({ ...isValid, name: true });
    } else if (name === "email" && emailRegex.test(value)) {
      setIsValid({ ...isValid, [name]: true });
    } else if (name === "phone") {
      const removeChar = value.replace(/[^0-9]/g, "");
      const removed = Number(removeChar);
      setPhone(removed);
      if (removeChar.length > 6 && removeChar.length < 30) {
        setIsValid({ ...isValid, [name]: true });
      }
    } else if (name === "enroll") {
      const removeChar = value.replace(/[^0-9]/g, "");
      const removed = Number(removeChar);
      setEnrollNumber(removed);
      if (removeChar.length > 7 && removeChar.length < 100) {
        setIsValid({ ...isValid, [name]: true });
      } else {
        setIsValid({ ...isValid, [name]: false });
      }
    } else if (name === "birthday") {
      const birthdayDate = new Date(value);
      console.log(birthdayDate, "this is birthDay date");
      const currentDate = new Date();
      console.log(currentDate, "this is current date");

      if (birthdayDate < currentDate) {
        setIsValid({ ...isValid, [name]: true });
        console.log("first");
      }
    }else if(name === 'avatar'){
      setImg(value)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="field avatar">
        <label htmlFor="avatar">Your avatar</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          placeholder=" Your avatar"
          onChange={(e) => ValidateChange(e)}
        />
        <img src={img} alt="image preview" height='20px' width='20px'/>
      </div>
      <div className="field name">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="name"
          placeholder=" Required, at least 4 chracters"
          onChange={(e) => ValidateChange(e)}
        />
        <div className="error"></div>
      </div>
      <div className="field email">
        <label htmlFor="creditCard">Email</label>
        <input
          type="email"
          name="email"
          id="card"
          className="email"
          placeholder=" ... @gmail.com"
          minLength={4}
          maxLength={20}
          onChange={(e) => ValidateChange(e)}
        />
        <div className="error"></div>
      </div>
      <div className="field phone">
        <label htmlFor="Phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={phone}
          className="phone-input"
          placeholder=" Phone number"
          maxLength={19}
          onChange={(e) => ValidateChange(e)}
        />
        <div className="error"></div>
      </div>
      <div className="field enroll">
        <label htmlFor="enroll">Enroll Number</label>
        <input
          type="text"
          id="enrrol"
          value={enrollNumber}
          name="enroll"
          className="enroll-input"
          placeholder=" 123. . ."
          onChange={(e) => ValidateChange(e)}
        />
        <div className="error"></div>
      </div>
      <div className="field birthday">
        <label htmlFor="birthday">Birthday</label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          className="birthday-input"
          placeholder="enter your birthday ..."
          maxLength={19}
          onChange={(e) => ValidateChange(e)}
        />
        <div className="error"></div>
      </div>
      <div className="field password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="password-input"
          placeholder="enter your password ..."
          maxLength={19}
          onChange={(e) => handlePasswordChange(e)}
        />
        <div className="error"></div>
      </div>
      {isAdd && (
        <div className="field confirm-password">
          <label htmlFor="confirm-password-input">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            id="confirm-password-input"
            className="input confirm-password-input"
            placeholder="Confirm your password..."
            maxLength={19}
            onChange={(e) => handleConfirmPasswordChange(e)}
          />
        </div>
      )}
      <div className="button-form">
        <button className="close" onClick={handleClick}>
          Close
        </button>
        <button
          onClick={handleClick}
          type="submit"
          disabled={!isAllValid}
          className="submit"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Form;
