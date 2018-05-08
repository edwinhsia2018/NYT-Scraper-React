import React from "react";

const Nav = () => (
  <div className="jumbotron text-center text-white">
    <h1 className="display-4"><strong>New York Times Article Scrubber</strong></h1>
    <p className="lead">Search and save articles of interest</p>
    <hr className="my-4"></hr>
    <a className="btn btn-primary btn-lg" href="/saved" role="button">Saved Articles</a>
  </div>
);

export default Nav;
