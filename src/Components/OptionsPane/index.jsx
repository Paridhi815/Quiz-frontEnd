import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const OptionsPane = (props) => {
  const localqid = props.qid;
  const persist = props.ansPersist;
  let ansQid;
  let selectionOption;
  let check = false;
  console.log(persist, 'persit');
  persist.forEach((element) => {
    ansQid = element.qid;
    if (localqid === ansQid) {
      selectionOption = element.selectedoption;
      if (selectionOption === props.option) {
        check = true;
      }
    }
  });
  console.log(selectionOption === props.option, 'checked value');
  return (
    <div className="OptionPane">
      <input
        type="radio"
        className="radio"
        name={props.qid}
        value={props.option}
        onChange={(event, qid) => props.handleOptionChange(event, props.qid)}
        checked={check}
      />
      {/* {console.log('jh', props.qid)} */}

      <p className="text"> {props.option}</p>
      <br />
    </div>
  );
};


OptionsPane.propTypes = {
  qid: PropTypes.number,
};

OptionsPane.defaultProps = {
  qid: 0,
};

export default OptionsPane;
