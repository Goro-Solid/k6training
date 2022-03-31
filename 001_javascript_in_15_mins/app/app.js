let c = 3;
c = 4.7;

const C = [1, 2, 3];

//types
c = 1; //number
c = "gabriel" //string
c = true;
c = [1, 2, 3, "name"] //array-list
c = { //object literal
    name: "Gabriel"
}
c = function () { //function
    console.log("Hello from func")
}
c = undefined; //not initialized
c = null; //null content
c = NaN;//Not a number

console.log(1 == "1") //checks for equal values
console.log(1 === "1") //check for valeu and type
// ------------- 
function f1(arg = 'hello') {
    return arg
}
console.log(f1())
f2 = function (arg = 'hello') { //anonymous function
    return arg
}
console.log(f2())
f3 = (arg = 'hello') => { return arg } //arrow function
console.log(f3())

//object literals
c = {
    name: "Gabriel",
    voice: function () {
        console.log(this.name)
    },
    experience: [1, 2, 3, 4],
    child: {
        name: "jeremi"
    }
}
//JSON vs JSON Object
console.log(c)
c = JSON.stringify(c) //before network send
console.log(c) //text rep of object
c = JSON.parse(c) //after network received
console.log(c)

//lists
c = [1, { name: " Gabriel" }, [0], () => { console.log("lol") }]
c.push("1") //add element at the end
c.unshift("0") //add element at the beginning
c.pop()
console.log(c)
//iterating with lists
for (element of c) {
    console.log(typeof (element))
}
c.forEach(element => {
    console.log(typeof (element))
});
//itearing over object properties
o = {
    name: "Gabriel",
    voice: function () {
        console.log("My name is" + this.name)
    }
}
for (prop in o) {
    console.log(`${prop} : ${o[prop]} - ${1 + 2 + 4} `) //string interpolation
}
//defaults
const a = 'i'; //false - '',0,false, ....
const b = a || 'costam'
console.log(b)









