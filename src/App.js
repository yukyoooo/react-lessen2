import React, { Component } from "react";

const App = () => {
  const profile = [
    { name: "Taro", age: 10 },
    { name: "Hanako", age: 20 },
    { name: "NoName" },
  ]
  return (
    <div>
      {
        profile.map((profile, index) => {
          return <User name={profile.name} age={profile.age} key={index}/> 
        })
      }
    </div>
  )
}
const User = (props) => {
  return <div>Hi, i am { props.name }!, and {props.age} years old! </div>
}

User.defaultProps = {
  age: 1
}

export default App;
