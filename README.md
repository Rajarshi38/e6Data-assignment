## Feature

We have a dataset where we have a couple of books with authors,summaries, titles. Based on the summary we are searching the title of book.

Technologies used

- React with Vite
- Javascript
- Styled-components

Components used for now -

- Autocomplete
- Card

### For running in local server

- Clone the project and do `yarn` or `npm install`
- then run `yarn dev` or `npm run dev` to start the local server in 3000

## Areas to improve -

- could have make the autocomplete more scalable, by giving more props so that we can control how to filter and what to do when input change. Currently we have custom inputChange which we can refactor for more control and reusability.
- we can get a base structure for datalist. for example here we are using id,title and summary but we can use something like a {id,value,label}. It would have been a common structure which we can use anywhere where we need a autocomplete search feature.
