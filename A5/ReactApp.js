import React,{useState, useEffect } from 'react';

function ReactApp() {

  const [topic,setTopic] = useState('');
  const [data,setData] = useState('');
  const [viewposts,setViewposts]= useState([]);
  const [setTopicAsc]= useState([]);
  const [setTopicDsc]= useState([]);
  const [setTimeAsc]= useState([]);
  const [setTimeDsc]= useState([]);

  useEffect(() => {fetch('http://localhost:8080/loadchat').then((response) => { setViewposts(response.data)});}, []);

  const Topic_Asc = async () => {
    useEffect(() => {fetch('http://localhost:8080/topicasc').then((response) => {setTopicAsc(response.data)});}, []);
  }
  
  const Time_Asc = async () => {
    useEffect(() => {fetch('http://localhost:8080/timeasc').then((response) => {setTimeAsc(response.data)});}, []);
  }
  
  const Topic_Dsc = async () => {
    useEffect(() => {fetch('http://localhost:8080/topicdsc').then((response) => {setTopicDsc(response.data)});}, []);
  }
  
  const Time_Dsc = async () => {
    useEffect(() => {fetch('http://localhost:8080/timedsc').then((response) => {setTimeDsc(response.data)});}, []);
  }

  const createPost = async () => {
    const result = {
      topic: topic,
      data: data
    }

    const setting = {
      method: "POST",
      headers: { 
        Accepts: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(result),
    };

    fetch('http://localhost:8080/chat', setting ).then(response => response.json()).then(alert("Posted!"));
}

  return (
    <div className="ReactApp">
      <h3>Enter the topic and data then click the button.</h3>

      <label for="topic"> topic: </label>
      <input  type="text" placeholder="Add Topic" onChange={(e)=> {setTopic(e.target.value)}}/><br></br><br></br>
      <label for="data"> data: </label>
      <input type="text" placeholder="Add Data" onChange={(e)=> {setData(e.target.value)}}/><br></br><br></br>
      <button onclick= {createPost}> Create Post </button>

      <h3>View posts.</h3>
      {viewposts.map((row) => { return<h1>topic: {row.topic} | data: {row.data} | timestamp: {row.timestamp} </h1>})}

      <h3>Sort the table in ascending or descending order for topic or time.</h3>
      <button onclick= {Topic_Asc}> Topic Ascending </button><br></br>
      <button onclick= {Topic_Dsc}> Topic Descending </button><br></br>
      <button onclick= {Time_Asc}> Time Ascending </button><br></br>
      <button onclick= {Time_Dsc}> Time Descending </button><br></br>

    </div>
  );
}

export default ReactApp;
