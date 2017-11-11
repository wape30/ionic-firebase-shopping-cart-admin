const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const messaging = admin.messaging();

/* Listens for new messages added to /messages/:pushId and sends a notification to subscribed users */
exports.pushNotification = functions.database.ref('orders/{ordersId}').onWrite( event => {
//console.log('Push notification event triggered');
/* Grab the current value of what was written to the Realtime Database */
    var valueObject = event.data.val();
/* Create a notification and data payload. They contain the notification information, and message to be sent respectively */


    const payload = {
        notification: {
            title: 'La barrApp',
            body: "Nuevo Pedido",
            sound: "default"
        },
        data: {
            title: "Revisa",//valueObject.product_name,
            message: "Hay un nuevo Pedido"//valueObject.product_price
        }
    };
/* Create an options object that contains the time to live for the notification and the priority. */
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24 //24 hours
    };
  return admin.messaging().sendToTopic("topicoAdmin", payload, options);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
