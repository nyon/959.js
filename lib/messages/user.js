export default function(client, username) {
  client.state.setUsername(username);
  client.control.send('331 User name okay, need password.');
}
