import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import dataset from "./data.json";
import Autocomplete from "./components/Autocomplete";
import BookCard from "./components/BookCard";

const App = () => {
  const suggestions = useMemo(() => {
    return dataset.summaries.map((summary) => ({
      id: summary.id,
      label: dataset.titles[summary.id],
      value: summary.summary,
    }));
  }, []);

  const [data, setData] = useState(suggestions);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [books, setBooks] = useState([]);
  const [isReset, setIsReset] = useState(false);

  const generateBook = (value) => {
    return {
      id: value,
      title: dataset.titles[value],
      summary: dataset.summaries[value].summary,
      author: dataset.authors[value].author,
    };
  };

  const onSelect = (value) => {
    setInputValue(value.label);
    setSelectedValue(value.id);
  };

  const resetForm = () => {
    setInputValue("");
    setSelectedValue("");
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
    }, 600);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const book = generateBook(selectedValue);
    setBooks((prev) => [...prev, book]);
    setData((prev) => prev.filter((d) => d.id !== selectedValue));
    resetForm();
    // setResetForm(true);
    // setTimeout(() => {
    //   setResetForm(false);
    // }, 600);
  };

  const getSuggestions = useCallback(
    (input) => {
      const term = input.toLowerCase();
      const matches = data
        .map((summary) => {
          const matchingOccurences = summary.value
            .toLowerCase()
            .match(new RegExp(term, "g"));
          const count = matchingOccurences ? matchingOccurences.length : 0;
          return {
            ...summary,
            count,
          };
        })
        .filter((summary) => summary.count > 0)
        .sort((a, b) => b.count - a.count);
      return matches;
    },
    [data]
  );

  const onInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <MainContainer>
      {/* form */}
      <FormContainer onSubmit={onSubmit}>
        <Autocomplete
          dataset={data}
          onSelect={onSelect}
          customFilterFn={getSuggestions}
          inputValue={inputValue}
          reset={isReset}
          onInputChange={onInputChange}
          inputProps={{
            name: "summary",
            placeholder: "Search books by keyword ..",
          }}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
      {/* results */}
      {books.length > 0 ? (
        <>
          <CardWrapperHeader>Books</CardWrapperHeader>
          <CardsWrapper>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </CardsWrapper>
        </>
      ) : null}
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
  padding-bottom: 32px;
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

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 60px;
  gap: 26px;
  margin-top: 15px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 940px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapperHeader = styled.h2`
  text-align: center;
  margin-top: 20px;
  font-size: 32px;
  font-weight: 500;
`;
