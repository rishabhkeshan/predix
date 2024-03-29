import React, { useEffect, useState } from "react";
import "./CreateMarketPage.scss";
import ImageDropzone from "./ImageDropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";
import Api from "../../utils/api";

export default function MarketDetails({ inputData, setInputData }) {
    const api = new Api();

  const [categories, setCategories] = useState([{ id: 0, name: "All" }]);

  const minExpDate = new Date();

  const [eventImage, setEventImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      closeDateTime: e,
    }));
  };
  const handleDrop = (file) => {
    setInputData((prevData) => ({
      ...prevData,
      imageFile: file.data,
    }));
  };
  const handleCategoryChange = (e) => {
    const category = categories.find(
      (cat) => String(cat.name) === e.target.value
    );
    setInputData((prevData) => ({
      ...prevData,
      category: e.target.value,
      categoryId: category.id
    }));
  };
  const handleResolutionTypeChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      resolutionType: e.target.value,
    }));
  };
  const resolutionOptions = ["Pyth", "Admin", "Switchboard"];

  const categoryOptions = ["Crypto", "Entertainment", "NFT", "Others"];
    useEffect(() => {
      fetchData();
    }, []);
    const fetchData = async () => {
      try {
        const data = await api.fetchCategories();
        if (data.success)
          setCategories([...data.data?.categoryInfo]);
        console.log(data);
  
      } catch (error) {
        console.log("some error occured");
      }
    };

  return (
    <section className="marketdetails">
      <div className="marketdetails_inputcontainer">
        <div className="marketdetails_inputcontainer_titlecontainer">
          <div className="marketdetails_inputcontainer_titlecontainer_title">
            Market Name <span>*</span>
          </div>
        </div>
        <input
          name="name"
          value={inputData.name}
          className="marketdetails_inputcontainer_input"
          onChange={handleInputChange}
        />
        <div className="marketdetails_inputcontainer_subtext">
          Everyone can see this
        </div>
      </div>
      <div className="marketdetails_inputcontainer">
        <div className="marketdetails_inputcontainer_titlecontainer">
          <div className="marketdetails_inputcontainer_titlecontainer_title">
            Description <span>*</span>
          </div>
          <div className="marketdetails_inputcontainer_titlecontainer_criteria">
            Max Characters <span>50</span>
          </div>
        </div>
        <input
          name="description"
          value={inputData.description}
          className="marketdetails_inputcontainer_input"
          onChange={handleInputChange}
        />
      </div>
      <div className="marketdetails_halfcontainer">
        <div className="marketdetails_inputcontainer">
          <div className="marketdetails_inputcontainer_titlecontainer">
            <div className="marketdetails_inputcontainer_titlecontainer_title">
              Category <span>*</span>
            </div>
          </div>
          <select
            name="category"
            value={inputData.category}
            className="marketdetails_inputcontainer_input marketdetails_dropdown"
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.length> 0 && categories.map((option) => (
              <option value={option.name} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="marketdetails_inputcontainer">
          <div className="marketdetails_inputcontainer_titlecontainer">
            <div className="marketdetails_inputcontainer_titlecontainer_title">
              Resolution Source
            </div>
          </div>
          <select
            name="resolutionType"
            value={inputData.resolutionType}
            className="marketdetails_inputcontainer_input marketdetails_dropdown"
            onChange={handleResolutionTypeChange}
          >
            <option value="">Select a resolution source</option>
            {resolutionOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="marketdetails_inputcontainer">
        <div className="marketdetails_inputcontainer_titlecontainer">
          <div className="marketdetails_inputcontainer_titlecontainer_title">
            Resolution Source
          </div>
        </div>
        <input
          name="resolutionSource"
          value={inputData.resolutionSource}
          className="marketdetails_inputcontainer_input"
          onChange={handleInputChange}
        />
      </div>
      <div className="marketdetails_halfcontainer">
        <div className="marketdetails_inputcontainer">
          <div className="marketdetails_inputcontainer_titlecontainer">
            <div className="marketdetails_inputcontainer_titlecontainer_title">
              Closing Date and Time <span>*</span>
            </div>
          </div>
          <DatePicker
            name="closeDateTime"
            selected={inputData.closeDateTime}
            dateFormat="yyyy-MM-dd HH:mm"
            onChange={handleDateChange}
            minDate={minExpDate}
            showTimeSelect
            className="marketdetails_inputcontainer_input"
          />
        </div>
        <div className="marketdetails_inputcontainer">
          <div className="marketdetails_inputcontainer_titlecontainer">
            <div className="marketdetails_inputcontainer_titlecontainer_title">
              Upload Image
            </div>
          </div>
          <ImageDropzone type={"event"} handleDrop={handleDrop} height="h-64" />
        </div>
      </div>
    </section>
  );
}
