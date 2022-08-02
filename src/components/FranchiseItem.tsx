import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FranchiseItem({
  iuud,
  designation,
  listshopid,
  logo,
  couleur,
}: FranchiseProps) {
  return (
    <React.Fragment>
      <Link to={`/Shops/${designation}`}>
        <Card
          style={{ width: "100%", borderColor: `${couleur}` }}
          className="m-2"
        >
          <Card.Img
            variant="top"
            src={logo}
            height="250px"
            width="100%"
            style={{ objectFit: "contain" }}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
              <span className="fs-2" style={{ color: `${couleur}` }}>
                {designation}
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </React.Fragment>
  );
}
