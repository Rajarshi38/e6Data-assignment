import { useMemo, useState } from "react";
import styled from "styled-components";
import dataset from "./data.json";
import Autocomplete from "./Autocomplete";

const App = () => {
  const [data] = useState({ ...dataset });
  const suggestions = useMemo(() => {
    return data.summaries.map((summary) => ({
      title: data.titles[summary.id],
      ...summary,
    }));
  }, [data]);

  const [selectedValue, setSelectedValue] = useState();
  const [books, setBooks] = useState([]);
  const [resetForm, setResetForm] = useState(false);

  const generateBook = (value) => {
    return {
      id: value,
      title: data.titles[value],
      summary: data.summaries[value].summary,
      author: data.authors[value],
    };
  };

  const onSelect = (value) => {
    setSelectedValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const book = generateBook(selectedValue);
    setBooks((prev) => [...prev, book]);
    setSelectedValue("");
    setResetForm(true);
    setTimeout(() => {
      setResetForm(false);
    }, 600);
  };

  return (
    <MainContainer>
      {/* form */}
      <FormContainer onSubmit={onSubmit}>
        <Autocomplete
          dataset={suggestions}
          onSelect={onSelect}
          inputProps={{ name: "summary" }}
          reset={resetForm}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
      {/* results */}
      <div></div>
    </MainContainer>
  );
};

export default App;

const MainContainer = styled.main`
  display: flex;
  min-height: 100vh;
  background-color: #f2f2f2;
  margin: auto;
  flex-direction: column;
`;

const FormContainer = styled.form`
  margin: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const SubmitButton = styled.button`
  background-color: #3399ff;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  border-color: transparent;
  cursor: pointer;
  padding: 10px 20px;
  transition: background 0.2s ease-in;
  align-self: flex-start;

  &:hover {
    background-color: #0080ff;
  }
`;
