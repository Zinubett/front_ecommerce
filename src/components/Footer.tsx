import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram } from "react-icons/bs";

export const Footer = ({ logo }: any) => {
  return (
    <div>
      <footer className="text-white mt-4 py-4 bg-secondary">
        <Container>
          <Row>
            <Col>
              <nav>
                <Link
                  to="/"
                  className="col-12 col-md3 d-flex aling-items-center justify-content-cente"
                >
                  <img src={logo} className="mx-2" width="100" />
                </Link>
              </nav>
            </Col>
            <Col>
              <nav>
                <div>
                  <ul className="col-12 col-md-3 list-unstyled">
                    <li className="font-weight-bold mb-2 ">Suivez-nous:</li>
                    <li className="d-flex justify-content-between">
                      <i className="">
                        <BsFacebook size="2em" className="" />
                      </i>
                      <i>
                        <BsInstagram size="2em" className="" />
                      </i>
                    </li>
                  </ul>
                </div>
              </nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};
