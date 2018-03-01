import React from 'react';
// import PropTypes from 'prop-types';
import './index.css';
import OptionsPane from '../OptionsPane';

const QuestionPane = props => (
  <div className="QuestionPane">
    <div className="Question-number">
        Question {props.questionNumber}
    </div>
    <div className="Questions">
      {props.question}
    </div>
    <div className="options">
      {/* // {console.log("na na",props.qid)} */}

      {props.options.map(option => (
        <OptionsPane
          option={option}
          qid={props.qid}
          handleOptionChange={(event, qid) => props.handleOptionChange(event, qid)}
          ansPersist={props.ansPersist}
        />
      ))}

    </div>
  </div>
);

// QuestionPane.propTypes = {
//   // options: PropTypes.string,
// };

// QuestionPane.defaultProps = {
//   question: '',
// };

export default QuestionPane;
