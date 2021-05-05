/*

    This module contains all of the data, or state, for the
    application. It exports two functions that allow other
    modules to get copies of the state.

*/
const database = {
    styles: [
        { id: 1, style: "Classic", price: 500 },
        { id: 2, style: "Modern", price: 710 },
        { id: 3, style: "Vintage", price: 965 }
    ],
    sizes: [
        { id: 1, carets: 0.5, price: 405 },
        { id: 2, carets: 0.75, price: 782 },
        { id: 3, carets: 1, price: 1470 },
        { id: 4, carets: 1.5, price: 1997 },
        { id: 5, carets: 2, price: 3638 }
    ],
    metals: [
        { id: 1, metal: "Sterling Silver", price: 12.42 },
        { id: 2, metal: "14K Gold", price: 736.4 },
        { id: 3, metal: "24K Gold", price: 1258.9 },
        { id: 4, metal: "Platinum", price: 795.45 },
        { id: 5, metal: "Palladium", price: 1241.0 }
    ],
    orders: [
        {
            id: 1,
            metalId: 3,
            sizeId: 2,
            styleId: 3,
            timestamp: 1614659931693
        }
    ],
    orderBuilder: {}, // switch this to an array after this is implemented to see what it changes
}


export const addNewCustomerOrder = () => {

    if (
        "styleId" in database.orderBuilder && // in operator looks for the property ("styleId") inside the specified object in orders
        "metalId" in database.orderBuilder &&
        "sizeId" in database.orderBuilder 
      ) {

    // Copy the current state of user choices
    const newOrder = {...database.orderBuilder}

      //* Use ternary statement to conditionally set the value of newOrder.id...   ternary statement 
        // Are there any existing order objects in the orders array?
        newOrder.id = database.orders.length > 0
        // Yes? (length of orders array is greater than 0)
        // ---- Get the value of id of the the last order object from orders array.
        // ---- Set the newOrder.id equal to that value + one
        ? [...database.orders].pop().id + 1
        // No? (length of orders array is 0)
        // ---- Set newOrder.id equal to 1
        : 1

        //* This is the if..else way of writing the conditional logic above
        // if(database.orders.length > 0){
        //     newOrder.id = [...database.orders].pop().id + 1
        // } else {
        //     newOrder.id = 1
        // }


   /*  // Add a new primary key to the object
    newOrder.id = [...database.orders].pop().id + 1 */

    // Add a timestamp to the order
    newOrder.timestamp = Date.now()

    // Add the new order object to custom orders state
    database.orders.push(newOrder)

    // Reset the temporary state for user choices
    database.orderBuilder = {}

    // Broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("stateChanged"))
    return true
}
return false

}

export const getOrders = () => {
    return [...database.orders]
}

export const getMetals = () => {
    return [...database.metals]
}

export const getStyles = () => {
    return [...database.styles]
}

export const getSizes = () => {
    return [...database.sizes]
}


export const setMetal = (id) => {   
    database.orderBuilder.metalId = id
}

export const setSize = (id) => {
    database.orderBuilder.sizeId = id
}

export const setStyle = (id) => {
    database.orderBuilder.styleId = id
}
