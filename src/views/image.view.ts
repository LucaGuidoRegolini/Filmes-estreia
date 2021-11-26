import { Images } from "../models/Image";

const port = process.env.PORT || 80;
const url = process.env.BASE_URL || "localhost";

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `http://${url}:${port}/uploads/${image.path}`,
    };
  },

  renderMany(images: Images[]) {
    return images.map((image) => this.render(image));
  },
};
