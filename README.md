This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Nana: A simple 2 Screens application

* An initial screen that contains a list of posts
* A detail screen to show details for each post

## Sample API

* Nana uses Sample API provided by typicode
* http://jsonplaceholder.typicode.com/posts to display the list of posts
* http://jsonplaceholder.typicode.com/users to display the description and the author of the detail post

## Purpose

The purpose of this project is to show how I work with React and TDD in mind.

## Offline

There is a branch (https://github.com/renaudjenny/nana/tree/offline) who shows how we can add an offline mode. But it still in progress and not automatically tested yet.

### `yarn install`

To install the project

### `yarn test`

Launches standard JS linter and the test runner in the interactive watch mode.

### `yarn start`

To run the project. If you want to test the work in progress offline mode, don't forget to switch branch.

### Next steps

* Better UI/UX
* Better NotFound page
* Better navigations between components
* More data about user in Post Detail?
* Complete offline mode
  * With an indicator that shows we are offline
  * With a button to force refreshing
* Network error handling, not just the loading indicator that runs forever
* ...
