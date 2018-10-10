var test = {
    cell: 'A',
    result: 'true',
    check: function () {
        if (this.cell == 'A') {
            return this.result = false;
        }
    }
}

console.log(test.check());
console.log(test.result);