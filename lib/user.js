import hash from './hash';

const parameters = process.argv.slice(2);

console.log(`sha512#${hash('sha512', parameters[0], parameters[1])}`);
