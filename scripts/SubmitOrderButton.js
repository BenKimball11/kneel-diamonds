import { addNewCustomerOrder } from "./database.js"

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id === "submitOrderButton"){
            const customerOrderSuccess = addNewCustomerOrder()

            if(!customerOrderSuccess){
                window.alert("Your order is incomplete! Please choose from all options.")
            }
        }
    }
)

export const SubmitOrderButton = () => {
    return `
        <button id="submitOrderButton">Submit Order</button>
    `
}