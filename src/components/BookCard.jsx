import styled from "styled-components";

const BookCard = ({ book }) => {
  const { author, title, summary } = book;

  const generateSmallerString = (summary) => {
    if (summary.length >= 300) {
      return summary.substring(0, 300) + "....";
    }
    return summary;
  };

  return (
    <CardContainer>
      {/* top section */}
      <CardHeader>
        <h3>{title}</h3>
        <CardSubtitle>
          By <Author>{author}</Author>
        </CardSubtitle>
      </CardHeader>
      <CardBody>
        <span>{generateSmallerString(summary)}</span>
      </CardBody>
    </CardContainer>
  );
};

export default BookCard;

const CardContainer = styled.div`
  background-color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  /* width: 500px; */
  width: 100%;
  padding: 15px 20px 15px 16px;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: pointer;
  max-height: 400px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    /* scale: 1.15; */
    transform: scale(1.2, 1.2);
  }
`;

const CardSubtitle = styled.span`
  font-size: 14px;
  color: #666666;
`;

const Author = styled.span`
  color: #1a1a1a;
  margin-left: 2px;
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
  h3 {
    font-weight: 600;
  }
`;

const CardBody = styled.article`
  font-size: 15px;
  color: #4d4d4d;
  /* border: 1px solid red; */
  /* max-height: 250px; */
  overflow: hidden;
  /* text-overflow: ellipsis; */
  span {
    /* width: 140px;
    height: 200px;
    white-space: nowrap; */
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
  }
`;
