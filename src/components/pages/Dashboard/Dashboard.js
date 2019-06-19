import React, { Component } from "react"
import Default from 'components/templates/Default'
import Fetch from "./Fetch";
import Drivers from "components/organisms/Drivers";

const Dashboard = () => (
  <Default>
    <Fetch
      url={"https://randomuser.me/api?nat=gb&results=246"}
      parseFormat={"json"}
      success={(data) => <Drivers data={data} />}
      loading={(loading) => <h1>{loading}</h1>}
      error={(err) => <h1>{err}</h1>}
    />
  </Default>
);

export default Dashboard;
