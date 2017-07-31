export default function(client, filename) {
  client.fs.delete(filename, () => {
    client.control.send('250 Requested file action okay, completed.');
  });
}
