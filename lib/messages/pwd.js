export default function(client) {
  client.control.send(`257 "${client.fs.pwd()}"`);
}
