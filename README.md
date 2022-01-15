# Ajaib Frontend Test - Personal Project

This project is created to showcase my abilities for the Senior Software Engineer position in Ajaib. This project is built in accordance to the test question provided by the company, and this project should follow the rules specified on the question to the best of my capacity.

For the mini-questionnaire part of the test, please refer to the `mini-questionnaire.md` file on this project's root directory.

The demo of the project is available [here](https://ajaib-fe-test.vercel.app/example).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project requires the following items to be pre-installed in your machine:

- [`node.js`](https://nodejs.org/en/download/)


### Installing

After cloning a local copy of this project from Github, please run the following commands:

```
npm install
```

This command will run installation for all dependencies listed on `package.json`.

After installation is complete, you are now free to make any changes to the code.

To view the project, you may run the project locally on your machine using:

```
npm start
```

Should you wish to build & deploy the project, please refer to the Deployment section of this document.

## Description & Explanation

This following section aims to explain the design decision of the project, including basic structure of the code.

```
.
├── build                   # Compiled files
├── node_modules            # Project dependencies
├── public                  # Publicly available resources (i.e. index & logo)
├── src
│   ├── index.js            # Top-level application file, which includes provider setup for the application
│   ├── App.jsx             # Root Application file of the project, hosts the basic routing and/or basic layouts of the project
│   ├── config.js           # Server-related configuration files
|   │   ├── components      # Reusable components
|   │   ├── utils
|   |   │   ├── redux       # All redux-related files, including redux store, actions & reducers
|   |   │   ├── router      # List of all available routes for the application
|   │   ├── views           # Pages directly accessible through the App.jsx routing
│   └── unit                # Unit tests
├── LICENSE
├── package.json
└── README.md
```

The main logic of the application is located on the `views` directory, each for its respective pages. The test question did not actually mention anything regarding page routing, and thus splitting the code in this manner might not be necessary. However, the test question did show a Breadcrumb, and since that I wanted to make that Breadcrumb usable, I decided to take a slight detour and added page routing as part of the application as well. Plus, it makes the directory much cleaner anyway if I split it into views.

Most of the logic asked on the test question is available under `src/views/Example/Example.jsx`, which is the main component for the `app/example` url. Each smaller chunks of the items are separated into smaller components, with globally reusable components are located on `src/components`, while the page-specific components are located on `src/views/Example/components`. Each of the reusable components only takes input (as `props`) and returns a key-value pair output (through callbacks).

All logic regarding data fetching (i.e. *axios*) is written on the *redux* section of the project, located on `src/utils/redux/slices/dataSlice.js`. The data response is stored on *redux*, as these types of data (i.e. data received from backend) may be used globally by other views. However, data such as search keywords and active filters are stored on the view's local state, as different views/pages most likely requires to keep track different set of data.

And thus, as user input to parameter conversion is already done in each of the smaller components, while converting from a list of parameters into a query string is done by axios in the redux section of the project, the only thing left in the `views` page is the local state management itself.

## Running the tests

There are several test cases available for this project (mostly unit testing). To run the test, you may simply run the following command:

```
npm run test
```

Each test are designed to test the appropriate component *only*, and thus should not test logic being handled by the child nor parent components. Should you wish to add more testcases, please ensure the aforementioned statement still holds true.

## Deployment

Assuming the project is completed without any major bugs or warnings, you may opt to deploy the project on a live system.

First, you need to create a static build using:

```
npm run build
```

This will create a new directory called `build` within the root of the folder. This folder contains the built project as static files.

Now you may serve the package using any server you prefer, such as:

- Locally using serve

```
npm install serve -g
serve ./build
```

- Or using any reverse proxy, all you have to do is point the location to the `build` folder. Please check with the appropriate guide for more information.

## Built With

* [React](https://reactjs.org/) using [Create React App](https://create-react-app.dev/) - The web framework used
* [Redux](https://redux.js.org/) - State Management
* [React Router](https://reactrouter.com/) - Page routing
* [Bootstrap](https://getbootstrap.com/) & [Fontawesome](https://fontawesome.com/) - CSS Styling
* [Randomuser.me](https://randomuser.me/) - Data faker

## Authors

* **Jose Gunawarman** - [joseadhitya](https://github.com/joseadhitya)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
