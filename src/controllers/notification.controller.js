const { Expo } = require("expo-server-sdk");
const expo = new Expo();

module.exports = {
  sendNotification: async (req, res) => {
    try {
      const { expoPushToken, body, title } = req.body;

      if (!expoPushToken || !body || !title)
        return res.json({ error: "Invalid payload" });

      const expoPushMessage = {
        to: expoPushToken,
        title,
        body,
        sound: "default",
        data: { additionalData: "optional" },
      };
      const chunks = expo.chunkPushNotifications([expoPushMessage]);
      const tickets = [];
      const sendPushNotifications = async () => {
        for (const chunk of chunks) {
          try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
      };
      const getReceipts = async () => {
        const receiptIds = tickets.map((ticket) => ticket.id);
        const receipt = await expo.getPushNotificationReceiptsAsync(receiptIds);
        if (Object.keys(receipt).length === 0) {
          console.error(`There was an error sending the notification`);

          return res.json({
            error: "There was an error sending the notification",
          });
        } else {
          return res.json({
            message: "Success",
            data: {
              ticket: receiptIds[0],
              sent_at: new Date().toISOString(),
              expoPushMessage,
            },
          });
        }
      };

      await sendPushNotifications();
      await getReceipts();
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  },
};
