export default function(client /* , data */) {
  let fileString = '';
  client.fs.eachFile((file) => {
    if(file.isDirectory) {
      fileString += 'd';
    } else {
      fileString += '-';
    }
    fileString += file.ownerPermissions;
    fileString += file.groupPermissions;
    fileString += file.otherPermissions;

    fileString += ' ';
    fileString += file.username;
    fileString += ' ';
    fileString += file.group;
    fileString += ' ';
    fileString += file.size;
    fileString += ' ';
    fileString += file.date;
    fileString += ' ';
    fileString += file.name;
    fileString += '\r\n';
  });

  client.data.transfer((socket) => {
    socket.write(fileString, client.data.encoding);
    socket.end();
  });

  client.control.send('150 File status okay; about to open data connection.');
}
