import {useState} from 'react';
import styled from 'styled-components';

const AddButton = styled.button`
  position: absolute;
  z-index: 10;
  right: 0;
  bottom: 0;
  margin: 30px;
  background-color: white;
  border: 1px solid #0000000d;
  box-shadow: 2px 2px 3px #0000003d;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  font-size: 70px;
  line-height: 0;
  color: grey;
  font-weight: 100;
  filter: blur(1px);
  span {
    display: block;
    transform: translateY(-4px);
  }
`;

const MoreOptions = styled.div<{open: boolean}>`
  position: absolute;
  z-index: 15;
  bottom: 0;
  right: 0;
  margin: 70px;
  button {
    border-radius: 100%;
    border: unset;
    width: 60px;
    box-shadow: 0 0 2px #00000070;
    height: 60px;
    font-size: 40px;
    line-height: 0;
    margin-right: 10px;
    background-color: white;
    color: grey;
    span {
      display: block;
      transform: translateY(-4px);
    }
  }
`;

export function AddButtons() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MoreOptions open={open}>
        <button>
          <span>x</span>
        </button>
        <button>
          <span>x</span>
        </button>
        <button>
          <span>x</span>
        </button>
      </MoreOptions>
      <AddButton onClick={() => setOpen(true)}>
        <span>+</span>
      </AddButton>
    </>
  );
}
