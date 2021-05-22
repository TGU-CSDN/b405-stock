// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const query = await db
    .collection("stock")
    .where({
      _id: event._id,
    })
    .get();

  const data = query.data[0];

  return {
    data,
  };
};
