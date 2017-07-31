export default function(client, data) {
  client.fs.renameFile(client.state.renameFrom, data, () => {
    client.state.setRenameFrom(null);
    client.control.send('250 Requested file action okay, completed.');
  });
}
