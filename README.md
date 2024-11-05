# Books Storage App

This app is deployed to production and can be viewed at [https://books-storage.com/](https://books-storage.com/).

This project is a book storage application built with React. It allows users to search for books, add them to their personal collection, and manage their stored books. User authentication and secure access are handled using Firebase Authentication.

## Available Scripts

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will automatically reload if you make edits.  
You may also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production in the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes for cache-busting.  
Your app is ready to be deployed.

For more information on deployment, see the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build setup and configuration, you can `eject` at any time. This command will copy all configuration files and dependencies directly into your project, giving you full control over them.

## Firebase Integration

This application uses Firebase for user authentication. Firebase setup is handled in the `firebaseConfig.js` file and includes the necessary configuration for connecting with Firebase Authentication. Ensure you have a valid Firebase configuration setup and Firebase API keys stored in your `.env` file as follows:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Google Books API Integration

The app utilizes the Google Books API to fetch book data. You need to add a Google Books API key in the `.env` file as well:

```
REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
```

Make sure to replace `your_google_books_api_key_here` with an actual API key from your Google Cloud Console.

## Deployment to Netlify

To deploy this app to [Netlify](https://www.netlify.com/), follow these steps:

1. Link your GitLab repository with Netlify.
2. Set the environment variables for Firebase and Google Books API in the Netlify dashboard.
3. Configure your custom domain (e.g., `books-storage.com`) in the domain settings on Netlify.

For further guidance, see the [Netlify deployment documentation](https://docs.netlify.com/).

## Additional Documentation

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). For more on React itself, check out the [React documentation](https://reactjs.org/).
