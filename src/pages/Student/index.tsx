import React, { useContext, useEffect } from "react";
import "./index.scss";
import sort from "../../assets/sort 1.png";
import trash from "../../assets/trash 1.png";
import pen from "../../assets/pen 1.png";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "../../components/Form/Form";
import { Result } from "../../type/result";
import Button from "react-bootstrap/Button";
import Pagination from "../../components/pagination/Pagination";
import { AppContext } from "../../contexts/app.context";
import FormEdit from "../../components/Form/FormEdit";
import { toDate } from "../../utilities";
import dayjs from "dayjs";

const Student = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);
  const { setIsAuthenticated, isAuthenticated, setProfile, users, setUser } = useContext(AppContext);


  const [deleteIndex, setDeleteIndex] = useState(0); // State variable to store the index

  const [editUser, setEditUser] = useState<Result>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    console.log(deleteIndex, "delete this user");
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    handleDelete(deleteIndex);
    console.log("this gotta be deleted");
  };

  const handleShowDeleteConfirm = (index: number) => {
    setShowDeleteConfirm(true);
    setDeleteIndex(index);
  };

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

  // console.log(users, "this is the user you looking 4");

  const deleteUser = (id: number) => {
    fetch(`https://66179268ed6b8fa434830f0b.mockapi.io/api/students/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((task) => {
        console.log(9999999);
        fetchUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (index: number) => {
    const userId = currentPosts[index].id;
    deleteUser(Number(userId));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("first");
  };

  const closeEditModal = () => setVisible(false);
  const openEditModal = (index: number) => {
    setVisible(true);
    const userId =  currentPosts[index];
    setEditUser(userId)
    console.log("opening edit modal");
  };

  // Now you have a JSON object ready to be sent to the API

  // console.log("submitted");

  // console.log(phone, 8900);

  // console.log(isValid, 666);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = (users as Result[]).slice(firstPostIndex, lastPostIndex);

  return (
    <div className="student">
      <div className="student-list">
        <h3>Students List</h3>
        <img src={sort} alt="rtg" height="22px" width="14px" />
        <button onClick={handleShow}>ADD NEW STUDENT</button>
      </div>
      <div className="list">
        <p>Name</p>

        <p>Email</p>

        <p>Phone</p>
        <p>Enroll Number</p>

        <p>Date of admission</p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form handleClick={handleClose} isAdd="true" refetch={fetchUsers} />
        </Modal.Body>
      </Modal>

      <Modal show={isVisible} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEdit handleClick={closeEditModal} refetch={fetchUsers} info={editUser}/>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Are you sure want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Yes!
          </Button>
        </Modal.Footer>
      </Modal>

      {currentPosts.length > 0 &&
        currentPosts.map((user, index) => (
          <div className="student-info" key={user.id}>
            <div className="img-info">
              <img src={user.avatar} />
            </div>
            <div>{user.name}</div>
            <div>{user.email}</div>

            <div>{user.phone}</div>

            <div>{user.enroll}</div>
            <div>{dayjs(user.birthDay).format('DD/MM/YYYY')}</div>
            <img src={pen} alt="edit" onClick={() => openEditModal(index)} />

            <img
              src={trash}
              alt="delete"
              onClick={() => handleShowDeleteConfirm(index)}
            />
          </div>
        ))}

      <div className="student-info">
        <div className="img-info">
          <img src="https://s3-alpha-sig.figma.com/img/7f02/c446/9c5672219055d43b0ffb2caf907f4b0d?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZKrksQixb~VVqMV~RRLMBR2V8fQjkmSmqUIMMGBgNls14Nk6N-qbkyobnWYhl~bwYS8~mnjriaJ813EMKb9N5wBpou7ck4lb-RJAwg5xd2BjZR-ppWqiQMv-mchvEMSElXbI4wa67s8MjARPJUQ3t~mz51gPl9-u9oyR5g6BA6TupWIsAPfPzwJrwt0PN4tyLArMiKoj6G31Kh4s0mMCb0yRKblsFnibUxi472-0PbwJPlacAoNaj6abNCj2YQyy9oLp4w3dP37MgMUoLRVQv7Z2Io3Mz3YIYjK9BA06gtYdOmi1GBAlzK2Frf8CPsxM0GSEu6Zzrt1zlfoYzI1SCw__" />
        </div>
        <div>Karthi</div>
        <div>karthi@gmmail.com</div>

        <div>7305477760</div>

        <div>1234567305477760</div>
        <div>08-Dec, 2021</div>
        <img src={pen} alt="edit"  />

        <img src={trash} alt="delete" />
      </div>
      <Pagination
        totalPosts={(users as Result[]).length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Student;

// chua xu ly birthday, pw, confirm pw
// loi if else
// the return inside useeffect
