const chai = require("chai");
const CustomError = require("../extensions/custom-error");

const chainMaker = {
  items: [],
  getLength() {
    return this.items.length;
  },
  addLink(value = '') {
    this.items.push(String(value));
    return this;
  },
  removeLink(position) {
    if (!this.items[position]) {
      this.items = [];
      throw new Error('Invalid position!');
    } 
    this.items = this.items.filter((item, index) => index !== position - 1);
    return this;
  },
  reverseChain() {
    this.items = this.items.reverse();
    return this;
  },
  finishChain() {
    const result = `( ${this.items.join(' )~~( ')} )`;
    this.items = [];
    return result;
  }
};

module.exports = chainMaker;
