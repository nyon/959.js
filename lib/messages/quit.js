export default function(client) {
  client.control.send('221 Service closing control connection.');
  client.stop();
}
