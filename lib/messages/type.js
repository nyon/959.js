/**
 * The server keeps track of a binary flag for the client.
 * At any moment, the binary flag is either on or off. At the beginning of the FTP connection,
 * the binary flag is off.
 * While the binary flag is on, all RETR, STOR, APPE, and STOU requests are for binary files.
 * While the binary flag is off, all RETR, STOR, APPE, and STOU requests are for text files.
 * The binary flag has no effect on NLST and LIST.
 * A TYPE request controls the binary flag. It has a parameter.
 * There are four possibilities for the parameter:
 * * A: Turn the binary flag off.
 * * A N: Turn the binary flag off.
 * * I: Turn the binary flag on.
 * * L 8: Turn the binary flag on.
 * * The server accepts the TYPE request with code 200.
 *
 * @param {Client} client
 * @param {string} flag
 */
export default function(client, flag) {
  const downcasedFlag = flag.toLowerCase();
  switch (downcasedFlag) {
    case 'i':
    case 'l 8':
      client.data.setEncoding('binary');
      client.control.send('200 Command okay.');
      break;
    case 'a':
    case 'a n':
      client.data.setEncoding('ascii');
      client.control.send('200 Command okay.');
      break;
    default:
      client.control.send('504 Command not implemented for that parameter.');
  }
}
