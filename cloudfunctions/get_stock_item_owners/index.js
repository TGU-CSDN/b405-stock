// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const $ = db.command.aggregate;

  const query = await db
    .collection("user_stock")
    .aggregate()
    .match({
      stock_id: event.stock_id,
    })
    .lookup({
      from: "users",
      localField: "_openid",
      foreignField: "_openid",
      as: "user",
    })
    .group({
      _id: "$_id",
      number: $.first("$number"),
      price: $.first("$price"),
      user: $.first("$user"),
    })
    .project({
      number: 1,
      price: 1,
      user: {
        username: 1,
        avatar_url: 1,
      },
    })
    .project({
      number: 1,
      price: 1,
      user: $.arrayElemAt(["$user", 0]),
    })
    .end();

  const data = query.list;

  return {
    success: true,
    data,
  };
};
