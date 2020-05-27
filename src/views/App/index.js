import React from "react";
import {Switch,Route} from "react-router-dom";

import Articles from "./Articles";
import Archives from "./Archives";
import Tags from "./Tags";
import About from "./About";
import TagsContent from "./TagsContent";
import Detail from "./Detail";
import Header from "@/components/Header";
import RouterContent from "@/components/RouterContent";
import PageLoading from "@/components/PageLoading";
import TouchEffect from "@/components/TouchEffect";

function App(){
  return(
    <>
      <TouchEffect />
      <PageLoading />
      <Header />
      <RouterContent>
        <Switch>
          <Route exact path="/articles">
            <Articles />
          </Route>
          <Route path="/archives">
            <Archives />
          </Route>
          <Route path="/tags">
            <Tags />
          </Route>
          <Route path="/tagsContent">
            <TagsContent />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </RouterContent>
    </>
  )
}

export default App;

