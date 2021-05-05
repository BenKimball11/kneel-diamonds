import { getOrders, getMetals, getStyles, getSizes } from "./database.js"


const metals = getMetals()
const styles = getStyles()
const sizes = getSizes()

/* const buildOrderListItem = (order) => {
    return `<li>
        Order #${order.id} was placed on ${order.timestamp}
    </li>`
} */

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()  // the state is changed when a new order is saved in the database

   const arrayOfOrderHTMLStrings = orders.map(
        (order) => {
                let totalCost = 0
            
            const foundMetal = metals.find(
                (metalObject) => {
                    if(metalObject.id === order.metalId) {
                        return true
                    }
                }
            )
             totalCost += foundMetal.price

            const foundStyle = styles.find(
                (styleObject) => {
                    if(styleObject.id === order.styleId) {
                        return true
                    }
                }
            )
            totalCost += foundStyle.price

            const foundSize = sizes.find(
                (sizeObject) => {
                    if(sizeObject.id === order.sizeId) {
                        return true
                    }
                }
            )
            totalCost += foundSize.price

            /* const foundStyle = styles.find(
                (styleObject) => {
                    if(styleObject.id === order.styleId) {
                        return true
                    }
                }
            ) */


                return `
                    <div class="order">
                        Order #${order.id} has the metal of ${foundMetal.metal} with a ${foundStyle.style} style, with a ${foundSize.carets} caret diamond with a total cost of ${totalCost.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })}
                    </div>
                `

        }
    )

    const html = arrayOfOrderHTMLStrings.join("")

    return html
}

