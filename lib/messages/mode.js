/**
 * MODE is obsolete. The server should accept MODE S (in any combination of lowercase and uppercase)
 * with code 200, and reject all other MODE attempts with code 504.
 * Source: https://cr.yp.to/ftp/type.html
 *
 * @param {Client} client
 * @param {string} data
 */
export default function(client, mode) {
  if(mode.downcase() === 's') {
    client.control.send('200 Command okay.');
  } else {
    client.control.send('504 Command not implemented for that parameter.');
  }
}
