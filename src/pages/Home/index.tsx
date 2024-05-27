import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import Box from "../../components/Statistic";
import student from "../../assets/graduation-cap 1.png";
import course from "../../assets/bookmark 1.png";
import payments from "../../assets/usd-square 1.png";
import user from "../../assets/Vector.png";
import { Result } from "../../type/result";
import { AppContext } from "../../contexts/app.context";

const Home = () => {
  const { setIsAuthenticated, isAuthenticated, setProfile, users, setUser } =
    useContext(AppContext);
  const url = new URL(
    "https://66179268ed6b8fa434830f0b.mockapi.io/api/students"
  );
  url.searchParams.append("sortBy", "name");
  url.searchParams.append("order", "asc");

  const fetchUsers = () => {
    fetch(url, {
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

  return (
    <div className="home">
      <Box
        bgColor="#F0F9FF"
        total={(users as Result[]).length}
        name="Students"
        imgSrc={student}
      />
      <Box bgColor="#FEF6FB" total={13} name="Course" imgSrc={course} />
      <Box
        bgColor="#FEFBEC"
        currency="INR"
        total={550}
        name="Payments"
        imgSrc={payments}
      />
      <Box
        bgColor="linear-gradient(110.42deg, #FEAF00 18.27%, #F8D442 91.84%)"
        total={3}
        name="Users"
        imgSrc={user}
      />
    </div>
  );
};

export default Home;

// [
//   {
//     "end_datetime": "",
//     "updated_at": "2024/04/26 09:37:28",
//     "trial_id": 1002,
//     "visit_no": 1,
//     "vacant_slot_count": 3,
//     "created_at": "2024/04/26 09:37:28",
//     "booking_count": 0,
//     "combination_no": 1,
//     "start_datetime": "2024/03/03 00:00:00",
//     "id": 171005,
//     "reserve_deadline": "2024/03/02 17:00:00"
//   },
//   {
//     "end_datetime": "",
//     "updated_at": "2024/04/26 09:37:28",
//     "trial_id": 1002,
//     "visit_no": 1,
//     "vacant_slot_count": 3,
//     "created_at":

// {
//     "end_datetime": "",
//     "updated_at": "2024/04/26 09:37:28",
//     "trial_id": 1002,
//     "visit_no": 1,
//     "vacant_slot_count": 3,
//     "created_at": "2024/04/26 09:37:28",
//     "booking_count": 0,
//     "combination_no": 1,
//     "start_datetime": "2024/03/03 00:00:00",
//     "id": 171005,
//     "reserve_deadline": "2024/03/02 17:00:00"
//   },
// booking_count
// :
// 0
// combination_no
// :
// 1
// created_at
// :
// "2024/04/26 09:42:49"
// end_datetime
// :
// ""
// id
// :
// 171038
// reserve_deadline
// :
// "2024/04/27 17:00:00"
// start_datetime
// :
// "2024/04/28 09:00:00"
// trial_id
// :
// 1002
// updated_at
// :
// "2024/04/26 09:42:49"
// vacant_slot_count
// :
// 4
// visit_no
// :
// 2
// {
//     "end_datetime": "",
//     "updated_at": "2024/04/26 09:42:49",
//     "trial_id": 1002,
//     "visit_no": 2,
//     "vacant_slot_count": 4,
//     "created_at": "2024/04/26 09:42:49",
//     "booking_count": 0,
//     "combination_no": 1,
//     "start_datetime": "2024/04/28 09:00:00",
//     "id": 171038,
//     "reserve_deadline": "2024/04/27 17:00:00"
// }
