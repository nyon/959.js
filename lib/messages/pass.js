export default function(client, password) {
  // TODO: lookup password
  if(client.login(client.state.username, password)) {
    client.control.send('230 User logged in');
  } else {
    client.control.send('530 Not logged in.');
  }
  client.state.setUsername(null);
}
