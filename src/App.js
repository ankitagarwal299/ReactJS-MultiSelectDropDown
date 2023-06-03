import "./styles.css";

import React, { useState, useEffect, useRef } from "react";

const peopleList = [];
for (let i = 0; i < 100; i++) {
  peopleList.push(`people ${i}`);
}

export default function App() {
  return (
    <>
      <div className="container">
        <section>
          <header>
            <h2> Add any providers you have seen within the last 3 years</h2>
          </header>
        </section>

        <section>
          <SelectDropdown label="Add providers" options={peopleList}>
            {" "}
          </SelectDropdown>
        </section>

        <p className="btn-container">
          <button>Continue</button>
        </p>
      </div>
    </>
  );
}

const SelectDropdown = ({
  label, // string - Add providers
  options // string[] - ["people1","people2", "people3"]
}) => {
  /*States */
  const [allOptions, setAllOptions] = useState(
    options.map((o) => ({ label: o, selected: false }))
  );
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = allOptions.filter((o) => o.selected == true);

  // handler functions here (add, remove)
  function handleSelection(personSelected) {
    let newAllOptions = allOptions.map((person) => {
      if (person.label == personSelected.label) {
        person.selected = !person.selected;
        return person;
      }
      return person;
    });

    setAllOptions([...newAllOptions]);
  }

  return (
    <div>
      <label className="lable-style">{label}</label>
      <BadgeArea
        options={selectedOptions}
        remove={handleSelection}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <Dropdown
          options={allOptions}
          handleSelection={handleSelection}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

const BadgeArea = ({ options, remove, setIsOpen }) => {
  return (
    <div
      className="multi-select"
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {options.map((o, i) => (
        <Badge key={i} person={o} remove={remove} setIsOpen={setIsOpen} />
      ))}
    </div>
  );
};

const Badge = ({ person, remove, setIsOpen }) => {
  return (
    <span className="chips">
      <span>{person.label} </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          remove(person);
        }}
      >
        {" "}
        x{" "}
      </button>
    </span>
  );
};

const Dropdown = ({ options, handleSelection, setIsOpen }) => {
  return (
    <div className="list-dropdown">
      {options.map((person, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              name="people"
              checked={person.selected}
              onChange={() => handleSelection(person)}
            />
            {person.label}
          </div>
        );
      })}
    </div>
  );
};
