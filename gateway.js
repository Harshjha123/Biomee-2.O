const axios = require('axios');
const querystring = require('querystring');
const { sign } = require('./signapi'); // Assuming signapi.js contains your sign function

const merchantKey = "90f56b63a50143d2bc61805d21caf541"; // Replace with your actual merchant key
let date = new Date()

const version = process.env.VERSION || '1.0'; // Replace with your actual values or use a configuration mechanism
const mchId = process.env.MCH_ID || '100666718';
const notifyUrl = process.env.NOTIFY_URL || 'https://api.ludo.khelo/recharge/callback';
const pageUrl = process.env.PAGE_URL || 'https://www.ludo.khelo/#/';
const mchOrderNo = process.env.MCH_ORDER_NO || 'LXCBG7777VB8D36NE';
const payType = process.env.PAY_TYPE || '101';
const tradeAmount = process.env.TRADE_AMOUNT || '500';
const orderDate = process.env.ORDER_DATE || `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const bankCode = process.env.BANK_CODE;
const goodsName = process.env.GOODS_NAME || 'testing';
const signType = process.env.SIGN_TYPE || 'MD5';
const mchReturnMsg = process.env.MCH_RETURN_MSG || '';

let signStr = "";
if (bankCode) {
    signStr += `bank_code=${bankCode}&`;
}
signStr += `goods_name=${goodsName}&`;
signStr += `mch_id=${mchId}&`;
signStr += `mch_order_no=${mchOrderNo}&`;
if (mchReturnMsg) {
    signStr += `mch_return_msg=${mchReturnMsg}&`;
}
signStr += `notify_url=${notifyUrl}&`;
signStr += `order_date=${orderDate}&`;
if (pageUrl) {
    signStr += `page_url=${pageUrl}&`;
}
signStr += `pay_type=${payType}&`;
signStr += `trade_amount=${tradeAmount}&`;
signStr += `version=${version}`;

const signData = sign(signStr, merchantKey);

const postData = {
    goods_name: goodsName,
    mch_id: mchId,
    mch_order_no: mchOrderNo,
    notify_url: notifyUrl,
    order_date: orderDate,
    pay_type: payType,
    trade_amount: tradeAmount,
    version: version,
    sign_type: signType,
    sign: signData,
    // Include additional parameters if necessary
    // bank_code: bankCode,
    // mch_return_msg: mchReturnMsg,
    // page_url: pageUrl
};

console.log(signData)
console.log('Requesting...')


axios.post('https://interface.sskking.com/pay/web', querystring.stringify(postData))
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
