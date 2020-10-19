import React, { useState } from "react";
import styled from "styled-components";

const Typeahead = ({ suggestions, handleSelect, categories }) => {
  const [value, setValue] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );

  const filteredSuggestions = suggestions.filter(
    (book) =>
      book.title.toLowerCase().includes(value.toLowerCase()) &&
      value.length >= 2 &&
      book.title.toLowerCase() !== value.toLowerCase()
  );

  console.log(selectedSuggestionIndex);

  return (
    <MainWrapper>
      <WrapperInput>
        <Input
          type="text"
          value={value}
          placeholder="Search book..."
          onChange={(keyDown) => setValue(keyDown.target.value)}
          onKeyDown={(event) => {
            console.log(event.key);
            switch (event.key) {
              case "Enter": {
                handleSelect(
                  filteredSuggestions[selectedSuggestionIndex].title
                );
                return;
              }
              case "ArrowUp": {
                if (selectedSuggestionIndex > 0) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                }
                return;
              }
              case "ArrowDown": {
                if (selectedSuggestionIndex < filteredSuggestions.length - 1) {
                  setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                }
                return;
              }
            }
          }}
        />

        <Button onClick={() => setValue("")}>Clear</Button>
      </WrapperInput>
      <WrapperSuggestions>
        {filteredSuggestions.length > 0 && (
          <HiddenWrapperSuggestions>
            {filteredSuggestions.map((book, index) => {
              const suggestionStart = book.title
                .toLowerCase()
                .indexOf(value.toLowerCase());
              const suggestionEnd = suggestionStart + value.length;

              const firstHalf = book.title.slice(0, suggestionEnd);
              const secondHalf = book.title.slice(suggestionEnd);

              const categoryId = book.categoryId;
              const category = categories[categoryId].name;
              return (
                <SuggestionsList
                  key={book.id}
                  onClick={() => handleSelect(book.title)}
                  onMouseOver={() => setSelectedSuggestionIndex(index)}
                  style={{
                    background:
                      selectedSuggestionIndex === index
                        ? "beige"
                        : "transparent",
                  }}
                >
                  <span>
                    {firstHalf}
                    <Prediction>{secondHalf}</Prediction>
                    {" in "}
                    <Category>{category}</Category>
                  </span>
                </SuggestionsList>
              );
            })}
          </HiddenWrapperSuggestions>
        )}
      </WrapperSuggestions>
    </MainWrapper>
  );
};

const MainWrapper = styled.div``;

const WrapperInput = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const Input = styled.input`
  width: 400px;
  padding: 7px;
  margin-right: 10px;
  outline: none;
`;

const Button = styled.button`
  padding: 6px 15px;
  color: white;
  background-color: blue;
  border: solid blue;
  border-radius: 5px;
`;

const WrapperSuggestions = styled.div``;

const HiddenWrapperSuggestions = styled.div`
  position: relative;
  width: 478px;
  top: 35px;
  left: 25px;
  padding: 7px;
  box-shadow: 0px 0px 5px 1px grey;
  border-radius: 5px;
`;

const SuggestionsList = styled.li`
  padding: 7px;
  list-style-type: none;
  cursor: pointer;
`;

const Prediction = styled.strong``;

const Category = styled.i`
  color: #925299;
`;

export default Typeahead;
