export default function(client, filename) {
  client.fs.writeFile(filename, (stream) => {
    client.data.on('data', (chunk) => {
      stream.write(chunk, client.data.encoding);
    });
    client.data.on('end', () => {
      stream.end();
    });
  });
}
