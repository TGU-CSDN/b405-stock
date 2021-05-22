// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const query = await db.collection("stock").get();

  const data = query.data;

  // for development only
  data.map((ele) => {
    ele.stock_number = 0;
    ele.stock_list = [];
  });

  return {
    data,
  };
};
