import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Autocomplete = ({
  dataset,
  onSelect,
  inputProps,
  reset,
  customFilterFn,
  onInputChange,
  inputValue,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const autocompleteRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        // setFilteredSuggestions([]);
        setShowSuggestion(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (reset) {
      setShowSuggestion(false);
      setFilteredSuggestions([]);
    }
  }, [reset]);

  const normalFilterFn = (input) => {
    return dataset.filter((d) =>
      d.value.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    onInputChange(input);
    if (input.length === 0) {
      setShowSuggestion(false);
      setFilteredSuggestions([]);
      return;
    }
    let suggestions;
    if (!!customFilterFn && typeof customFilterFn === "function") {
      suggestions = customFilterFn(input);
    } else {
      suggestions = normalFilterFn(input);
    }
    if (suggestions.length <= 0) {
      setShowSuggestion(false);
      setFilteredSuggestions([]);
      return;
    }
    setShowSuggestion(true);
    setFilteredSuggestions(suggestions);
  };

  const onOptionSelect = (summary) => {
    onSelect(summary);
    setFilteredSuggestions([]);
    setShowSuggestion(false);
  };

  const onFocus = () => {
    setShowSuggestion(true);
  };

  return (
    <AutocompleteContainer ref={autocompleteRef}>
      <AutocompleteInput
        type="text"
        onFocus={onFocus}
        value={inputValue}
        onChange={handleInputChange}
        {...inputProps}
      />
      {showSuggestion && filteredSuggestions.length > 0 ? (
        <List>
          {filteredSuggestions.map((summary) => (
            <ListItem key={summary.id} onClick={() => onOptionSelect(summary)}>
              {summary.label}
            </ListItem>
          ))}
        </List>
      ) : null}
    </AutocompleteContainer>
  );
};

export default Autocomplete;

const ListItem = styled.li`
  color: #000000;
  cursor: pointer;
  margin-bottom: 4px;
  list-style: none;
  /* background-color: black; */
  /* color: white; */
  padding: 8px 5px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }
  &:hover {
    background-color: #d9d9d9;
  }
`;

const AutocompleteInput = styled.input`
  padding: 8px 6px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  width: 100%;
  font-size: 17px;
  &:focus-visible {
    outline: none;
    outline: #cccccc 1px solid;
  }
  &::placeholder {
    color: #bfbfbf;
  }
`;

const AutocompleteContainer = styled.div`
  flex-basis: 400px;
  position: relative;
`;

const List = styled.ul`
  width: 100%;
  position: absolute;
  margin-top: 8px;
  display: block;
  max-height: 400px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
