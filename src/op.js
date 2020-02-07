export default class op {
  constructor(id, method) {
    this._id = id
    this._method = method
  }
  get id() {
    return this._id
  }
  get method() {
    return this._method
  }
}
