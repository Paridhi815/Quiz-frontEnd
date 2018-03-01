import React from 'react';
import './index.css';
// import SideBar from '../SideBar';
import Header from '../Header';
import Page1 from '../Page1';
import QuestionPane from '../QuestionPane';
import LeaderBoardPage from '../LeaderBoardPage';

const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      num: 0,
      pageNumber: 0,
      userName: '',
      scores: 0,
      ansArr: {},
      leaders: [],
      persist: [],
      ansPersist: [],
      allDone: false,
    };
  }
  componentDidMount() {
    fetch('/readDb', {
      method: 'GET',
    }).then(response => response.json())
      .then((questionObj) => {
        console.log('pari', questionObj);

        this.setState({
          questions: questionObj,
        });
        //   console.log('>>>>', this.state.books);
      });
  }
  userNameEntered(event) {
    this.setState({
      userName: event.target.value,
    });
  }
login = () => {
  axios({
    method: 'PUT',
    url: '/user',
    data: {
      user: this.state.userName,
    },
  }).then((result) => {
    this.setState({
      pageNumber: 1,
      scores: 0,
    });
  });

  this.getPersistState();

  //   fetch('/user',{
  //       method:'PUT',
  //       body:JSON.stringify(this.state.userName),
  //   }).then((response)=>response.json());
}

getPersistState = () => {
  axios({
    method: 'PUT',
    url: '/persist',
    data: {
      user: this.state.userName,
    },
  }).then((usersAnswerArr) => {
    console.log('1', usersAnswerArr);
    this.setState({
      ansPersist: usersAnswerArr.data,
    });
    if (this.state.ansPersist.length === this.state.questions.length) {
      this.setState({
        allDone: true,
      });
    } else {
      this.setState({
        allDone: false,
      });
    }
    console.log('2', this.state.ansPersist);
  });
}

handleOptionChange(event, qid) {
  const ans = event.target.value;
  // console.log("ans",ans);
  // this.state.persist.push(ans);
  axios({
    method: 'PUT',
    url: '/userWithAns',
    data: {
      userName: this.state.userName,
      qid,
      selectedOption: ans,
    },
  }).then((result) => {
    this.getPersistState();
    this.setState({
      // scores:0,
    });
  });
  // .then((result)=>{
  //     this.setState({
  //         pageNumber:1,
  //     });
  // });
  // console.log("finally",this.state.persist);
}

calculateScore() {
  axios({
    method: 'PUT',
    url: '/scoreCalculated',
    data: {
      userName: this.state.userName,
    },
  }).then((score) => {
    console.log('yayy', score);
    this.setState({
      scores: score.data,
      pageNumber: 2,
    });

    console.log('jbikhi', this.state.scores);
    axios({
      method: 'PUT',
      url: '/scores',
      data: {
        userName: this.state.userName,
        score: this.state.scores,
      },
    }).then(() => {
      axios({
        method: 'GET',
        url: '/leaderBoard',
        // data:{
        //     userName:this.state.userName,
        // },
      }).then((leaderObj) => {
        console.log('dhat', leaderObj.data);
        this.setState({
          leaders: leaderObj.data,
        });
        console.log('dhat', this.state.leaders);
      });
    });
  });
}


playAgain() {
  this.setState({

    num: 0,
    pageNumber: 0,
    userName: '',
    scores: 0,
    ansArr: {},
    leaders: [],
    persist: [],
    ansPersist: [],
    allDone: false,

  });
}


render() {
  const n = 0;
  if (this.state.pageNumber === 0) {
    return (
      <div className="App">
        <Header title="Quizzy" />
        <Page1
          userNameEntered={event => this.userNameEntered(event)}
          login={() => { this.login(); }}
        />
      </div>
    );
  } else if (this.state.pageNumber === 1) {
    return (
      <div className="App">
        <Header
          title="Quizzy"
          hello="Hello"
          name={this.state.userName}
        />
        { this.state.questions.map((questionObj, index) => (
          <QuestionPane
            // num={this.state.num -= 12}
            questionNumber={index + 1}
            question={questionObj.question}
            qid={questionObj.qid}
            options={questionObj.options}
            handleOptionChange={(event, qid) => this.handleOptionChange(event, qid)}
            ansPersist={this.state.ansPersist}
          />
         ))
     }
        <button className="calculate-button" onClick={() => { this.calculateScore(); }}>Calculate</button>
      </div>
    );
  } else if (this.state.pageNumber === 2) {
    return (
      <div className="App">
        <Header
          title="Quizzy"
          hello="Hello"
          name={this.state.userName}
        />
        <LeaderBoardPage
          score={this.state.scores}
          arr={this.state.leaders}
          playAgain={() => this.playAgain()}
          classValue={this.state.userName}
          userName={this.state.userName}
        />
      </div>
    );
  }
}
}

export default App;
