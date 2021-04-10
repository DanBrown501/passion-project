import React from "react";
import NewPost from "./components/NewPost";
import { Route, NavLink, Switch } from "react-router-dom";
import Post from "./components/Post";
import Box from './components/Box';
import Router from './router';
import routes from './router/config';
import theme from './theme';
import './App.css';
import Navbar from './components/Navbar';
import BlogHome from "./components/BlogHome";
import { ThemeProvider } from "@theme-ui/theme-provider";

/** Overall blog application:
 *
 * - shows header, nav links, and contains routes to:
 *   - new form
 *   - homepage
 *   - individual posts
 */

function App() {

  return (
  <ThemeProvider theme={theme}>
    <Navbar />
    <div className="App container">
      <header className="App-header jumbotron mt-2">
        <h1 className="App-title display-4">Blog Bible</h1>
        <p className="lead">Blog Through the Bible!</p>
        <nav>
          <NavLink exact to="/">Blog</NavLink>
          <NavLink exact to="/new">Add a new post</NavLink>
          <NavLink exact to="/Bible">The Bible</NavLink>
        </nav>
      </header>
        
      <Box>
      
      <Switch>
      {routes.map(route => (
              <Router key={route.path} {...route} />
            ))}
        <Route exact path="/">
          <BlogHome />
        </Route>
        <Route exact path="/new">
          <NewPost />
        </Route>
        <Route exact path="/:postId">
          <Post />
        </Route>
      </Switch>
    </Box>
     </div>
    </ThemeProvider>
  );
}

export default App;