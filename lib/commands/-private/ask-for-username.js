import createSimpleReadline from './create-simple-readline';

export default function() {
  return new Promise((resolve) => {
    let rl = createSimpleReadline();
    rl.question('Username: ', function(username) {
      rl.close();
      resolve([username]);
    });
  });
}
