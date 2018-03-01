import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import OptionsPane from '../OptionsPane';

const LeaderBoardPage = (props) => {
  let i = 0;

  return (
    <div className="LeaderBoardPage">
      <div className="Score">
        <p className="Score-Text">Your Score</p>
        <p className="Score-Number"><span className="big">{props.score}</span><span className="small">/12</span></p>
      </div>
      <div className="LeaderBoard">
        <p className="Lead">Leaderboard</p>
        <div className="Leaders">
          {
  props.arr.map((leader) => {
i += 1;
  let rowStyle = null;
  if (props.userName === leader.quizzer) {
    rowStyle = 'Champions highlight';
  }
  else {
    // style 2
    rowStyle = 'Champions';
  }

    return (
      <div className={rowStyle}>
        <span className="name"> <span className="black">{i}.</span>{leader.quizzer} </span>
        <span className="score" >{leader.score}</span>
      </div>
    );
          })
}
        </div>
        <button className="again-button" onClick={() => { props.playAgain(); }}>Play Again</button>
      </div>
    </div>
  );
};

LeaderBoardPage.propTypes = {
  question: PropTypes.string,
};

LeaderBoardPage.defaultProps = {
  question: '',
};

export default LeaderBoardPage;
