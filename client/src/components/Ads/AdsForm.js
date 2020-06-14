import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { addAd, editAd } from "../../actions/adactions";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import Alert from '../Layout/Alert'
const AdsForm = ({ addAd, current, editAd, catagories }) => {

  const timestamp = new Date().getTime().toString();

  const [ad, setAd] = useState({
    title: "",
    description: "",
    address: "",
    start: "",
    end: "",
    minbid: "",
    category: "",
    image: "",
  });

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  var name = ""
  var fls = []

  const setImageName = (e) => {

    setFile(e.target.files[1]);

    setAd({
      ...ad,
      image: e.target.files,
    });

    Object.keys(e.target.files).forEach(function (key) {
      name = name + " " + (e.target.files[key].name)
    });
    setFilename(name);
  };

  const onChange = (e) => {
    setAd({
      ...ad,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var lst = []
    var obj = document.getElementById('customFile').files

    Object.keys(obj).forEach(function (key) {
      lst.push(timestamp + obj[key].name)
    });

    //  console.log(lst)

    if (current === null) {
      //     nimage = timestamp + image
      ad.image = lst
    }
    current === null ? addAd(ad) : editAd(ad, current._id);

    if (current === null) {



      var l = 0;
      for (l = 0; l < obj.length; l++) {
        const formData = new FormData();
        formData.append("file", obj[l]);
        formData.append("imagename", timestamp + obj[l].name)


        axios.post("/upload/ad/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // } catch (err) {
        //   if (err.response.status === 500) {
        //     setAlert("There was a problem with the server", "danger");
        //   } else {
        //     setAlert(err.response.data.msg, "success");
        //   }
        // }
      }
    }

    setAd({
      title: "",
      description: "",
      address: "",
      start: "",
      end: "",
      minbid: "",
      image: '', category: ""
    });
  };

  useEffect(() => {
    if (current !== null) {
      const {
        title,
        description,
        minbid,
        start,
        end,
        address,
        image, category
      } = current;
      setAd({
        image: image,
        title: title,
        description: description,
        minbid: minbid,
        start: start,
        end: end,
        category: category,
        address: address,
      });
    }
  }, [current]);
  const { title, address, description, minbid, start, end, image, category } = ad;
  return (
    <React.Fragment>
      <Alert />
      <form
        onSubmit={onSubmit}
        style={{ width: "400px" }}
        className="rt-form rt-line-form"
      >
        <h2 className="text-primary">
          {current === null ? "Create New Ad" : "Edit Ad"}
        </h2>

        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Enter Description"
          name="description"
          value={description}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Enter minimum bid price"
          name="minbid"
          value={minbid}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Enter Address"
          name="address"
          value={address}
          onChange={onChange}
        />
        <input
          type="date"
          placeholder="Start Time"
          name="start"
          value={start}
          onChange={onChange}
        />
        <input
          type="date"
          placeholder="Expire Time"
          name="end"
          value={end}
          onChange={onChange}
        />
        {catagories && (
          <select name="category" onChange={onChange}>
            {catagories.map((catagory) => (
              <option value={catagory.title}>{catagory.title}</option>
            ))}
          </select>
        )}

        <br />
        {current === null && (
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              name="image"
              onChange={setImageName}
              multiple
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>
        )}

        <div>
          <input
            type="submit"
            value={current === null ? "Submit New Ad" : " Edit Ad"}
            className="rt-btn rt-outline-gray pill text-uppercase"
          />
        </div>
      </form>
    </React.Fragment>
  );
};
const mapper = (state) => ({
  current: state.ad.ad,
});
export default connect(mapper, { addAd, editAd })(AdsForm);
