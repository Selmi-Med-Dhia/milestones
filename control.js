
function person(name, lastname){
    this.name = name;
    this.lastname = lastname;
}

const fs = require('fs');
/*
var obj = new person('dhia', 'selmi');

const jsonString = JSON.stringify(obj);

const binaryData = Buffer.from(jsonString);

fs.writeFileSync("testfile.bin", binaryData);
*/
const binaryData = fs.readFileSync('testfile.bin');

const jsonString = binaryData.toString('utf8');

const obj = JSON.parse(jsonString);

console.log(obj.name);