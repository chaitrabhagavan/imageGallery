import React, { Component } from "react";
import { getPhotosfromTags, getPhotos } from "./util/api";
import Gallery from "./components/Gallery";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import "./css/index.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
      page: 1,
      tags: `"mountains","dogs"`,
      filter: false,
      checked: false,
    };
    this.onSearchOrFilter = this.onSearchOrFilter.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  async componentDidMount() {
    let res = await this.fetchPhotos();
    this.setState({ photos: res.photos, loading: false, page: res.page });
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  async handleScroll() {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (parseInt(userScrollHeight) >= parseInt(windowBottomHeight - 1)) {
      let photos = this.state.photos;
      this.setState({ loading: true });
      let res = await this.fetchPhotos(this.state.tags, this.state.page + 1);
      this.setState({
        photos: photos.concat(res.photos),
        loading: false,
        page: res.page,
      });
    }
  }

  async fetchPhotos(tags, page) {
    tags = tags ? tags : this.state.tags;
    page = page ? page : this.state.page;
    let gallery = await getPhotosfromTags(tags, page);
    let photos = await getPhotos(gallery.photos.photo);
    return { photos, page };
  }
  async onSearchOrFilter(value) {
    this.setState({ photos: [], loading: true, checked: false });
    let res = await this.fetchPhotos(value);
    this.setState({ photos: res.photos, loading: false, page: res.page });
  }
  async handlePrevious() {
    this.setState({ photos: [], loading: true });
    let res = await this.fetchPhotos(this.state.tags, this.state.page - 1);
    this.setState({ photos: res.photos, loading: false, page: res.page });
  }
  async handleNext() {
    this.setState({ photos: [], loading: true });
    let res = await this.fetchPhotos(this.state.tags, this.state.page + 1);
    this.setState({ photos: res.photos, loading: false, page: res.page });
  }
  render() {
    return (
      <div id="container">
        <Header onSearch={this.onSearchOrFilter} />
        <Filter onFilter={this.onSearchOrFilter} checked={this.state.checked} />
        <Pagination
          handlePrevious={this.handlePrevious}
          handleNext={this.handleNext}
          page={this.state.page}
          loading={this.state.loading}
        />
        <Gallery photos={this.state.photos} />
        <Loading loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
