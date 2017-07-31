export default function(client, data) {
  client.fs.deleteDirectory(data, () => {
    client.control.send('250 Requested file action okay, completed.');
  });
}
