export default class ClientState {
  constructor() {
    this.username = null;
    this.renameFrom = null;
  }

  setUsername(username) {
    this.username = username;
  }

  setRenameFrom(renameFrom) {
    this.renameFrom = renameFrom;
  }
}
