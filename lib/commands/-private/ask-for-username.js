import createSimpleReadline from './create-simple-readline';

export default function() {
  return new Promise((resolve) => {
    const rl = createSimpleReadline();
    rl.question('Username: ', (username) => {
      rl.close();
      resolve([username]);
    });
  });
}
