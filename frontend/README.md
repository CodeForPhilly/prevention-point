# Prevention Point URS Frontend
The frontend app for the Prevention Point Unified Reporting System (URS) project.

## Project Frameworks and Tools
 - Main Framework: [React](https://reactjs.org/)
 - UI Framework: [Material UI](https://material-ui.com/)
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
