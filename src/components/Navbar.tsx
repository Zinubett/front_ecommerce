import React, { useEffect } from "react";
import axios from "axios";
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { Menu } from "./Menu";
import { TiThMenuOutline } from "react-icons/ti";
import { useState } from "react";
import { useFormik } from "formik";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";
import styled from "styled-components";
import "../index.css";

import { Modal, Button } from "react-bootstrap";

export function Navbar({ logo }: any) {
  const [modal, setModal] = useState(false);
  const [modale, setModale] = useState(false);
  const [username, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [usernameR, setUserNameR] = React.useState<string>("");
  const [passwordR, setPasswordR] = React.useState<string>("");
  const [nom, setNom] = React.useState<string>("");
  const [prenom, setPrenom] = React.useState<string>("");
  const [tel, setTel] = React.useState<string>("");

  const [loginStatus, setLoginStatus] = React.useState<string>("");

  // const onSubmit = async (values: any, actions: any) => {
  //   console.log(values);

  // };

  async function Login() {
    axios
      .post(`http://localhost:4000/Login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log({ error });
      });
  }

  const getMenu = () => {
    return setModal(true);
  };

  const inscription = () => {
    return setModale(true);
  };

  const handleClose = () => setModal(false);
  const Close = () => setModale(false);

  const schema = yup.object().shape({
    nom: yup.string().required(),
    prenom: yup.string().required(),
    tel: yup.number().positive().min(8).required(),
    email: yup.string().email("please enter a valid email").required(),
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, {
        message:
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number ",
      })
      .required(),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      tel: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm();
      axios
        .post(`http://localhost:4000/register`, {
          nom: values.nom,
          prenom: values.prenom,
          email: values.email,
          password: values.password,
          tel: values.tel,
        })
        .then((response) => {
          if (response.data.message) {
            // setLoginStatus(response.data.message);
            console.log(response.data.message);
          } else {
            // setLoginStatus(response.data[0].username);
            console.log(response.data[0].username);
          }
        })
        .catch(function (error) {
          // handle error
          console.log({ error });
        });
    },
  });
  // const val: any = values;
  // console.log(val);
  return (
    <>
      <NavbarBs className="flex bg-white shadow-sm mb-3 w-100">
        <Container>
          <NavbarBs.Brand href="/">
            {" "}
            <img
              src={logo}
              width="100"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </NavbarBs.Brand>
          <Nav className="ml-auto">
            <div
              className="d-flex fs-4 mb-4"
              style={{ position: "relative", width: "50px", margin: "20px" }}
            >
              <TiThMenuOutline
                color="dark"
                height={60}
                width={60}
                onClick={() => getMenu()}
              />

              {/* <Nav.Link href="/Franchise">Franchise</Nav.Link> */}
            </div>
          </Nav>
        </Container>
      </NavbarBs>

      <Modal
        className="modal right fade"
        show={modal}
        onHide={handleClose}
        aria-labelledby="myModalLabel2"
        tabindex="-1"
        role="dialog"
        height="100%"
      >
        <Modal.Header>
          <Modal.Title>Connexion</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>
        </Modal.Header>

        <Modal.Body>
          <div className="Auth-form-container">
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p className="forgot-password text-right mt-2">
                  Forgot <a href="#">password?</a>
                </p>
                <div className="d-grid gap-2 mt-3">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={Login}
                  >
                    Submit
                  </button>
                  <div className="text-center">
                    <h5 className="forgot-password  mt-2">Ou</h5>
                  </div>
                  <div className="text-center">
                    <p className="forgot-password fs-4 mt-2 ">
                      <a href="#" onClick={() => inscription()}>
                        Inscription
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="modal right fade"
        show={modale}
        onHide={Close}
        aria-labelledby="myModalLabel2"
        tabindex="-1"
        role="dialog"
        height="100%"
      >
        <Modal.Header>
          <Modal.Title>Inscription</Modal.Title>
          <button type="button" className="btn-close" onClick={Close}></button>
        </Modal.Header>

        <Modal.Body>
          <div className="Auth-form-container">
            <form onSubmit={handleSubmit} className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Register</h3>
                <div className="form-group mt-3">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={values.nom}
                    onBlur={handleBlur}
                    id="nom"
                    className="form-control mt-1"
                    placeholder="Enter nom"
                    onChange={handleChange}
                  />
                </div>
                {errors.nom && touched.nom && (
                  <p className="text-danger">{errors.nom}</p>
                )}
                <div className="form-group mt-3">
                  <label>Prenom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={values.prenom}
                    onBlur={handleBlur}
                    id="prenom"
                    className="form-control mt-1"
                    placeholder="Enter prenom"
                    onChange={handleChange}
                  />
                </div>
                {errors.prenom && touched.prenom && (
                  <p className="text-danger">{errors.prenom}</p>
                )}
                <div className="form-group mt-3">
                  <label>Num Tel</label>
                  <input
                    type="number"
                    name="tel"
                    value={values.tel}
                    onBlur={handleBlur}
                    id="tel"
                    className="form-control mt-1"
                    placeholder="Enter tel"
                    onChange={handleChange}
                  />
                </div>
                {errors.tel && touched.tel && (
                  <p className="text-danger">{errors.tel}</p>
                )}
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    id="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-danger">{errors.email}</p>
                )}
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    id="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </div>
                {errors.password && touched.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
                <div className="form-group mt-3">
                  <input
                    type="password"
                    name="confirmpassword"
                    value={values.confirmpassword}
                    onBlur={handleBlur}
                    id="confirmpassword"
                    className="form-control mt-1"
                    placeholder="Confirmer password"
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmpassword && touched.confirmpassword && (
                  <p className="text-danger">{errors.confirmpassword}</p>
                )}

                <div className="d-grid gap-2 mt-3">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-dark"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
