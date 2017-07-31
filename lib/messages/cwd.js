export default function(client, directory) {
  client.fs.changeDirectory(directory);
  client.control.send(`200 directory changed to ${directory}`);
}
