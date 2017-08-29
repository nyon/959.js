import readline from 'readline';

export default function() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}
