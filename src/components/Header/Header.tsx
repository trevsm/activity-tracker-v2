import styled from 'styled-components';

const StyledHeader = styled.header`
  z-index: 1;
  position: relative;
  height: 65px;
  max-height: 100px;
  padding: 20px;
  box-shadow: 0 0 35px -25px black;

  .date {
    letter-spacing: 1px;
    font-weight: 500;
    display: flex;
    font-size: 20px;
  }
`;

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function Header() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  return (
    <StyledHeader>
      <div className="date">
        <div>
          <span className="mmdd">
            {months[month]} {day}, {year}
          </span>
        </div>
      </div>
    </StyledHeader>
  );
}
