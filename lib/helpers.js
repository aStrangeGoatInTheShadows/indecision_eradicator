
const dbFuncs = require('../lib/db')

const makeID = length => {
  var result = [];
  // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var characters = 'abcdef';

  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() *
      charactersLength)));
  }
  return result.join('');
};

const generateLink = () => {
  // const existingLinks = db.getLinksExist();
  const existingLinks = [];
  let surveyLinks = [];
  let newLink = null;

  for (let urls of existingLinks) {
    surveyLinks.push(urls.survey);
  }

  while (surveyLinks.includes(newLink) || newLink === null) {
    newLink = `http://localhost:8080/poll/${makeID(6)}`
  }
  return newLink;
};

/* set the error message and redirect if errors are occuring */
const errorRedirect = (res, req, errorCode, errorMessage, redirectPage) => {
  req.session.error = errorMessage;
  res.status(errorCode).redirect(redirectPage);
};

/* redirect if no errors occure */
const happyRedirect = (res, req, path) => {
  req.session.error = null;
  res.redirect(path);
};

/* render if no errors occure */
const happyRender = (res, req, path, templateVars) => {
  req.session.error = null;
  res.render(path, templateVars);
};

module.exports = {
  generateLink,
  errorRedirect,
  happyRedirect,
  happyRender
}
