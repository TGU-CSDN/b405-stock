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
      code: event.code,
    })
    .get();

  if (!query.data || !query.data.length) {
    return {
      success: false,
      message: "该货品不存在",
    };
  }

  const data = query.data[0];

  return {
    success: true,
    data,
  };
};
