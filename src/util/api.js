import { apiKey, galleryId } from "./config";

export async function getPhotosfromTags(tags, page) {
  let perPage = 12;
  let gallery = await fetch(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&gallery_id=${galleryId}&per_page=${perPage}&page=${page}&tags=${tags}&format=json&nojsoncallback=1`
  );
  return await gallery.json();
}
export async function getPhotos(gallery) {
  let promises = [];
  gallery.forEach((photo) => {
    let res = fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photo.id}&format=json&nojsoncallback=1`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
      }
    ).then((res) => res.json());
    promises.push(res);
  });
  return Promise.all(promises).then((values) => {
    return values;
  });
}
