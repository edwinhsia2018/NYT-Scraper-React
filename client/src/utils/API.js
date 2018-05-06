import axios from "axios";

export default {
  // Gets all articles
  getArticle: function (topic, startYear, endYear) {
    const apiKey = "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json" + apiKey + "&q=" + topic + "&being_date=" + startYear + "0101&end_date=" + endYear + "0101";
    return axios.get(queryURL);
  },
  getSavedArticle: function () {
    return axios.get("/api/saved");
  },
  // Deletes the book with the given id
  deleteArticle: function (id) {
    return axios.delete(`/api/articles/${id}`);
  },
  // Saves a book to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  }
};
