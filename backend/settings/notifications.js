const Subscription = require('./models/Subscription');
const { publicPushKey, privatePushKey } = require('./settings/dontCommit.json');
const webPush = require('web-push');


async function sendNotification(ids, message) {
    // prepare webPush to send a notification
    webPush.setVapidDetails('mailto:somemail@mail.com', publicPushKey, privatePushKey);
  
    // get all subscriptions matching the ids
    let subs;

    if(ids) {
        subs = await Subscription.find({
            userId: { $in: ids }  
        });
    } else {
        subs = await Subscription.find();
    }
  
    subs.filter(s => s.endpoint).forEach(sub => {
      let config = {
        endpoint: sub.endpoint,
        keys: sub.keys
      };

  
      // send notification to clients service worker
      webPush.sendNotification(config, JSON.stringify(message)).catch(async err => {
        // if a user stopped being subbed to notifications
        if(err.body == 'push subscription has unsubscribed or expired.\n') {
          // remove invalid subscription
          await Subscription.deleteOne({ endpoint: err.endpoint });
        }
      });
    });
  }

  module.exports = sendNotification;