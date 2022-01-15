# Ajaib Frontend Test

This project is created to showcase my abilities for the Senior Software Engineer position in Ajaib. This project is built in accordance to the test question provided by the company, and this project should follow the rules specified on the question to the best of my capacity.

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
