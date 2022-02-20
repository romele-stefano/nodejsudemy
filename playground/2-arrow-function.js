/* // regular syntax
const square = function(x){
    return x * x
}
*/

/* // arrow function
const square = (x) => {
    return x * x
} 

const square = (x) => x *
console.log(square(3)) 
*/

const party = {
    name: 'Birthday Party',
    guestList: ['Gandalf', 'Bilbo', 'Frodo'],
    printGuestList: function(){
        console.log('Guest list for ' + this.name)
        this.guestList.forEach((guest) => {
            // we have to use arrow function in order to get 'this' of the party object
            // normal function declaration will give 'undefine' because name is not defined
            // inside guestList
            console.log(guest + ' is attending the party ' + this.name)
        })
    }
}

party.printGuestList()