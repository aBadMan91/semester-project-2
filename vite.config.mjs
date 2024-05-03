import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        listing: path.resolve(__dirname, "listing/index.html"),
        listingCreate: path.resolve(__dirname, "listing/create/index.html"),
        listingEdit: path.resolve(__dirname, "listing/edit/index.html"),
        listings: path.resolve(__dirname, "listings/index.html"),
        profile: path.resolve(__dirname, "profile/index.html"),
        profileEdit: path.resolve(__dirname, "profile/edit/index.html"),
        login: path.resolve(__dirname, "profile/login/index.html"),
        register: path.resolve(__dirname, "profile/register/index.html"),
        userListings: path.resolve(__dirname, "profile/userlistings/index.html"),
        userListingsBids: path.resolve(__dirname, "profile/userlistingsbids/index.html"),
        userListingsWins: path.resolve(__dirname, "profile/userlistingswins/index.html"),
      },
    },
  },
});
