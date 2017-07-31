export default function(client, data) {
  client.state.setRenameFrom(data);
  client.control.send('350 Requested file action pending further information.');
}
