export interface IRazorpayWebhook {
    order_id?: string;
    payment_id?: string;
    subscription_id?: string;
    payment_link_id?: string;
    payment_link_reference_id?: string;
    payment_link_status?: string;
}

/**
* Verify webhook verification
*
* @param {string} body 
* raw webhook request body
* @param {string} signature  
* The hash signature is calculated using HMAC with SHA256 algorithm; with your webhook 
* secret set as the key and the webhook request body as the message.
* @param {string} secret
* your webhook secret
*
*/
export function validateWebhookSignature(body: string, signature: string, secret: string): boolean

/**
*  Payment verfication
*
* @param {object} payload
* Check [doc](https://github.com/razorpay/razorpay-node/blob/master/documents/paymentVerfication.md) for required params
* @param {string} signature
* The hash signature is calculated using HMAC with SHA256 algorithm; with your webhook 
* secret set as the key and the webhook request body as the message.
* @param {string} secret
* your webhook secret
*
*/
export function validatePaymentVerification(payload: IRazorpayWebhook, signature: string, secret: string): boolean

/**
* given an object , returns prettified string
*
* @param {Object} val
* @return {string}
*/
export function prettify(val: Object): string