export default function(client, data) {
  const [permissions, filename] = data.split(' ', 2);
  client.fs.changePermissions(permissions, filename, () => {
    client.control.send('200 SITE CHMOD command ok.');
  });
}
