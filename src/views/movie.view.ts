import { Movies } from "../models/Movies";
import imagesView from "./image.view";

export default {
  render(movie: Movies) {
    return {
      id: movie.id,
      name: movie.name,
      about: movie.about,
      release_date: movie.release_date,
      maximum_date: movie.maximum_date,
      images: imagesView.renderMany(movie.images),
    };
  },

  renderMany(movies: Movies[]) {
    return movies.map((movie) => this.render(movie));
  },
};
