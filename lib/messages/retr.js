export default function(client, file) {
  client.fs.readFile(file, (err, data) => {
    client.data.transfer((socket) => {
      socket.write(data, client.data.encoding);
      socket.end();
    });
    client.control.send('150 File status okay; about to open data connection.');
  });
}
