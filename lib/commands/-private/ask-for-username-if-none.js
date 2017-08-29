import askForUsername from './ask-for-username';

export default function(users) {
  if(users.length) {
    return new Promise((resolve) => {
      resolve(users);
    });
  }
  return askForUsername();
}
