const fs = require("../models/FreeCredit");

const connection = async (socket) => {
  console.log(`User connect ${socket.id}`);
  SendData();
  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
};

async function SendData() {
  try {
    const Result = await fs
      .find({})
      .populate("firstCode")
      .populate("secondCode");

    if (!Result) return;

    

    for (let i = 0; i < Result.length; i++) {
      const item = Result[i];

      if (item.firstCode?.[0]?.code && item.secondCode?.[0]?.code) {
        _io.emit("Data", {
          _id: item._id,
          account: item.account,
          firstCode: item.firstCode[0].code,
          secondCode: item.secondCode[0].code,
          status: item.status,
          startTime: item.starttime,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connection };
