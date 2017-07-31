export default function(client, directory) {
  client.fs.createDirectory(directory, () => {
    client.control.send(`257 "${directory}" created.`);
  });
}
