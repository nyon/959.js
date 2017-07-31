// ALLO is obsolete. The server should accept any ALLO request with code 202.
// Source: http://cr.yp.to/ftp/stor.html
export default function(client) {
  client.control.send('202 Command not implemented, superfluous at this site.');
}
