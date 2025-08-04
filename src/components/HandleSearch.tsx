import { Icon } from "@iconify/react/dist/iconify.js";
import SearchResults from "./SearchResults";
import { useEffect, useState } from "react";
import axios from "axios";

const HandleSearch = ({ triggerSearch, setTriggerSearch }) => {
  const [customersData, setCustomersData] = useState([]);
  const [resultData, setResultData] = useState([]);
  useEffect(() => {
    const customers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/customers`);
        console.log(response.data);
        setCustomersData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    customers();
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value;
    const filtered = customersData.data?.filter((element) =>
      element.name.toLowerCase().includes(value)
    );
    setResultData(filtered);
  };

  console.log(resultData);
  return (
    <>
      <div className="search-wrapper">
        <input
          onClick={() => setTriggerSearch(true)}
          type="text"
          className={`search-input ${triggerSearch ? "expand" : ""}`}
          placeholder="Search..."
          onChange={handleSearch}
        />
        <Icon
          onClick={() => setTriggerSearch(true)}
          className={`search-icon ${
            triggerSearch === true ? "turn-to-black" : ""
          }`}
          icon={"ic:outline-search"}
          width="24"
          height="24"
        />

        <Icon
          className={`close-icon ${triggerSearch ? "visible" : ""}`}
          icon={"ic:outline-close"}
          width="24"
          height="24"
          onClick={() => setTriggerSearch(false)}
        />

        {resultData.length !== 0 && triggerSearch ? (
          <SearchResults resultData={resultData} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default HandleSearch;
