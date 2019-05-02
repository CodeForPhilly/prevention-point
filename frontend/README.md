# Prevention Point URS Frontend
The frontend app for the Prevention Point Unified Reporting System (URS) project.

## Get started:
 - Make sure you have [`node (>=10.15.3)`](https://nodejs.org/en/) and [`yarn (>=1.15.2)`](https://yarnpkg.com/en/docs/install) installed 
 - From the project's root directory, `cd frontend`
 - Run `yarn` to install dependencies
 - Run `yarn dev` and navigate to `localhost:1234`

## Project Frameworks and Tools
 - Main Framework: [React](https://reactjs.org/)
 - UI Framework: [Material UI](https://material-ui.com/)
 - State Management: [Mobx](https://mobx.js.org/), including bindings for both [class components](https://github.com/mobxjs/mobx-react) and [functional components with hooks](https://github.com/mobxjs/mobx-react-lite)
 - Styling: [Sass](https://sass-lang.com/)
 - Bundler: [Parcel](https://parceljs.org/)
 - Package manager: [Yarn](https://yarnpkg.com/)

## Project Style Conventions:
### Javascript
- Javascript styling / formatting is enforced by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
  - configure ESLint settings in .eslintrc.json
  - configure Prettier settings in .prettierrc.json
- The project uses [Husky](https://github.com/typicode/husky) to run a precommit hook to lint files before they are commited. If there are any files ESlint and/or Prettier can't fix automatically, they'll fail to commit and an error log will be displayed

### SCSS
- When possible, try to rely onn Material UI component APIs for styling
- SCSS styling enforced by [stylelint](https://stylelint.io/)
- When writing SCSS, try to adhear to [BEM conventions](http://getbem.com/)