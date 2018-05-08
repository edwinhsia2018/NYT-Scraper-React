import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import Saved from "../Saved";
import Search from "../Search";
import Results from "../Results";

class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  // When the component mounts then render the saved articles
  componentDidMount() {
    this.getSavedArticles();
  }

  // Getting all saved articles from the DB
  getSavedArticles = () => {
    API.getSavedArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  //Handler for saving the article and sends it to the DB
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((search) => search.id === id);
    const newSave = {
      title: findArticleByID.headline.main,
      date: findArticleByID.pub_date,
      url: findArticleByID.web_url
    };
    API.saveArticle(newSave)
      .then(this.getSavedArticles());
  }

  // Handler for deleting a saved article
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  // Handler when the submit button is clicked for searching articles
  handleFormSubmit = (event) => {
    event.preventDefault();
    API.getArticle(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs })
      })
  }

  // Handler to capture the start year that the user enters
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value })
  }

  // Handler to capture the end year that the user enters
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value })
  }

  // Handler to capture the topic that the user enters
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value })
  }

  // Render the articles based on the search
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article.id}
        key={article.id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // Render the articles that the user saved
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ))
  }

  render() {
    return (
      <div className="container">
        <Nav />

        <Search
          handleTopicChange={this.handleTopicChange}
          handleStartYearChange={this.handleStartYearChange}
          handleEndYearChange={this.handleEndYearChange}
          handleFormSubmit={this.handleFormSubmit}
          renderArticles={this.renderArticles}
        />

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    <strong>
                      <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                  </h3>
                </div>
                <div className="panel-body">
                  <ul className="list-group">
                    {this.renderSaved()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
