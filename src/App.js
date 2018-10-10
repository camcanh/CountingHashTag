import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import './App.css';

//creating redux Hashtag form with input field and submitting button
let HashTagForm = props => {
  const { handleSubmit } = props;
  return (
   <form onSubmit={handleSubmit}>
      <div>
        <Field component={renderField} type="text" id="inputfield" refs="inputTag" name="yourTag" placeholder="Hashtag" />
      </div>
      <div>
        <button type="submit" className = "button1">Submit</button>
      </div>

  </form>)
};

//checking if the value of input field is empty or not
const validate = val => {
  const err = {};
  if(!val.yourTag){
    console.log('Required');
    err.yourTag = 'Required';
  }
  return err;
};

//a warning text is the input field is empty
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
  <label className="field">{label}</label>
    <div>
      <input className="input"  {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

//register the form with validation
HashTagForm = reduxForm({form: 'submit', validate,})(HashTagForm);

class App extends Component {
  constructor(props){
    super(props);
    this.state ={"media_count": ""};
    this.getHashTagCount = this.getHashTagCount.bind(this);
    this.getData = this.getData.bind(this);
  }

    //fetching data from instagram API
   getHashTagCount(tag) {
        var hashtag1 = this.getData(tag);
        fetch('https://api.instagram.com/v1/tags/'+ hashtag1.yourTag +'?access_token=1068398574.4039003.f05768ac537c4cce88c4cd6a3ca4f1ec')
          .then(response => response.json())
          .then(data => {this.setState({media_count : data.data.media_count}); console.log(data.data.media_count)
            return data.data.media_count;
            });
    }
    //taking data from the input
    getData = a => {
        console.log(a);
        return a;
    }

  render() {
    return (
      <div className="App">
        <header >
          <h1>My App</h1>
        </header>
        <div>
        <HashTagForm onSubmit = {this.getHashTagCount}/>
        </div>
        <div>
        <label>Number of images</label>
        <p>{this.state.media_count}</p>
        </div>
      </div>
    );
  }
}

export default (App);
