import React, { useState } from "react";
import data from "../data";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import Typeahead from "./Typeahead";

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Typeahead
          suggestions={data.books}
          categories={data.categories}
          handleSelect={(suggestion) => {
            window.alert(suggestion);
          }}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vh;
  height: 100vh;
`;

export default App;
