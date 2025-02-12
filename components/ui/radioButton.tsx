import React from "react";
import styled from "styled-components";

const Radiobutton = () => {
  return (
    <StyledWrapper>
      <div className="radio-input">
        <label className="label mr-11">
          <div className="back-side" />
          <input
            type="radio"
            id="value-1"
            name="value-radio"
            defaultValue="value-1"
          />
          <span className="text">All</span>
          <span className="bottom-line" />
        </label>
        <label className="label mr-11">
          <div className="back-side" />
          <input
            type="radio"
            id="value-2"
            name="value-radio"
            defaultValue="value-2"
          />
          <span className="text">Mern</span>
          <span className="bottom-line" />
        </label>
        <label className="label">
          <div className="back-side" />
          <input
            type="radio"
            id="value-3"
            name="value-radio"
            defaultValue="value-3"
          />
          <span className="text">Nextjs</span>
          <span className="bottom-line" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-input {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: white;
    padding: 6px;
    border-radius: 8px;
    overflow: hidden;
    height: 94px;
  }

  .radio-input input {
    display: none;
  }

  .radio-input .label {
    width: 70px;
    height: 80px;
    background-color: #2a2a2a;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 8px 6px;
    border-top: 1px solid #383838;
    transition: all 0.1s linear;
    position: relative;
    z-index: 2;
  }

  .label .back-side {
    position: absolute;
    top: -10px;
    left: 0px;
    background-color: #2a2a2a;
    border-radius: 4px 4px 2px 2px;
    width: 100%;
    height: 14px;
    box-shadow: inset 0 5px 3px 1px rgba(0, 0, 0, 0.5),
      inset 0px -5px 2px 0px rgba(56, 163, 224, 0.1);
    transform: perspective(300px) rotateX(50deg);
    z-index: 1;
    opacity: 0;
    transition: all 0.1s linear;
  }

  .label:has(input[type="radio"]:checked) .back-side {
    opacity: 1;
  }

  .label:has(input[type="radio"]:checked) {
    transform: perspective(200px) rotateX(-18deg);
    transform-origin: 50% 40%;
    box-shadow: inset 0px -20px 15px 0px rgba(0, 0, 0, 0.5);
    border-top: 1px solid #2589c362;
    margin-top: 6px;
    border-radius: 0 0 4px 4px;
  }

  .label .text {
    color: white;
    font-size: 15px;
    line-height: 12px;
    padding: 0px;
    font-weight: 800;
    text-transform: uppercase;
    transition: all 0.1s linear;
    text-shadow: -1px -1px 1px rgb(224, 224, 224, 0.1);
  }

  .label input[type="radio"]:checked + .text {
    color: #258ac3;
    text-shadow: 0px 0px 8px rgb(37, 138, 195), 1px 1px 2px rgb(0, 0, 0, 1);
  }

  .label .bottom-line {
    width: 100%;
    height: 4px;
    border-radius: 999px;
    background-color: #2a2a2a;
    box-shadow: 0 0 3px 0px rgb(19, 19, 19);
    border-top: 1px solid #383838;
    transition: all 0.1s linear;
  }

  .label:has(input[type="radio"]:checked) .bottom-line {
    background-color: #1a1a1a;
    border-top: 1px solid #258ac340;
  }
`;

export default Radiobutton;
