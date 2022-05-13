import Modal from "./modal/Modal";
import { ModalHeader, ModalFooter, ModalBody } from "./modal/Modal";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import axios from "axios";
import AddListing from "./button/AddListing";

function CompleteModal({ setShowModal, showModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useAuth0();

  let fileInfo = {
    file: undefined,
    fileName: undefined,
    fileType: undefined,
    img: undefined,
  };

  function handlePhoto(event) {
    console.log({ event });

    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (photo) => {
      fileInfo = {
        file: photo.target.result,
        fileName: file.name,
        fileType: file.type,
        img: "",
      };
    };
    reader.readAsDataURL(file);
  }

  async function AddItem() {
    let id = user?.sub?.split("|")[1];
    const data = await axios.post(`/api/s3`, fileInfo);
    if (data.status !== 200) {
      return;
    } else {
      let newListing = {
        id,
        name,
        description,
        price,
        shipping,
        category,
        data: data.data.Location,
      };

      await axios
        .post("/addNewListing", newListing)
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setShowModal(false);
  }

  return (
    <div>
      <AddListing onClick={() => setShowModal(true)}>
        Add Item for sale
      </AddListing>
      <Modal setShow={setShowModal} show={showModal}>
        <ModalHeader>
          <h2>Add an Item you'd like to sale.</h2>
        </ModalHeader>
        <ModalBody style={{ textAlign: "justify" }}>
          <form>
            <label>
              {" "}
              Name of Item:
              <input
                type="text"
                placeholder="item name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Description:
              <input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Price:
              <input
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(+e.target.value)}
              />
            </label>
            <label>
              Is shipping Available?{" "}
              <select onChange={(e) => setShipping(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Shipping Unavailable">
                  Shipping unavailable.
                </option>
                <option value="Shipping Avalailable">
                  Shipping available.
                </option>
              </select>
            </label>
            <label>
              Item Category:{" "}
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="select">Select</option>
                <option value="Electronics">Electronics</option>
                <option value="Sporting Goods">Sporting Goods</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Picture: <input type="file" onChange={handlePhoto} />
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <AddListing onClick={AddItem}>Add Item</AddListing>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CompleteModal;
