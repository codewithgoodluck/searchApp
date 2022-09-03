import React, { useState, useEffect, Children } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { MdLocalDining } from "react-icons/md";

const rootUrl = "https://api.github.com";


const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [request, setRequest] = useState(0);
  const [MdLocalDining, setLoading] = useState(false);

  // check rate

  // const checkRequest = () => {
  //   axios(`${rootUrl}/rate_limit}`,)
    
  //     .then(({data}) => {
  //       console.log(data)
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(checkRequest(), []);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  );
};
export { GithubProvider, GithubContext };
