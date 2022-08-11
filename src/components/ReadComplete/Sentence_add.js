import { useState } from "react";
import "./Sentence.css";
import "./button.css";  

function Sentence_add({setSentences}) {
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
    setSentences(serviceList);
    console.log(serviceList);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

//   const sendToParent = (e) => {
//     e.preventDefault();
//     setSentences(serviceList);
//     console.log(serviceList);
//     };

  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service" > Sentences</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 10 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Add Sentence</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>

            
           
          </div>
        ))}

        {/* <div>
            <button className="button-54v2" onClick={sendToParent}>
                Done
            </button>
        </div> */}
      </div>
    </form>
  );
}

export default Sentence_add;