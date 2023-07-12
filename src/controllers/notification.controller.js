const { Expo } = require("expo-server-sdk");
const expo = new Expo();

module.exports = {
  sendNotification: async (req, res) => {
    try {
      const { expoPushToken, body } = req.body;

      if (!expoPushToken || !body)
        return res.json({ error: "Invalid payload" });

      const expoPushMessages = {
        to: expoPushToken,
        body,
        sound: "default",
        data: { additionalData: "optional" },
      };
      const chunks = expo.chunkPushNotifications([expoPushMessages]);
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

      await sendPushNotifications();
      for (const ticket of tickets) {
        if (ticket.status === "ok") {
          return res.json({
            message: "Success",
            data: {
              ticket: tickets[0],
              sent_at: new Date().toISOString(),
            },
          });
        } else if (ticket.status === "error") {
          console.error(`There was an error sending a notification`);

          return res.stats(400).json({ error: ticket.details });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  },
};
