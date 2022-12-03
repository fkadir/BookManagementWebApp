import Dropdown from "react-bootstrap/Dropdown";

function ReadingStatusDropdown() {
  return (
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle variant="light" id="dropdown-autoclose-true">
        Reading Status
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Currently Reading</Dropdown.Item>
        <Dropdown.Item href="#">Read</Dropdown.Item>
        <Dropdown.Item href="#">To Read</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ReadingStatusDropdown;
