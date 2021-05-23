// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const $ = db.command.aggregate;

  const query = await db
    .collection("stock")
    .aggregate()
    .lookup({
      from: "user_stock",
      localField: "_id",
      foreignField: "stock_id",
      as: "user_stock",
    })
    .group({
      _id: "$_id",
      name: $.first("$name"),
      image: $.first("$image"),
      code: $.first("$code"),
      stock_list: $.first("$user_stock"),
    })
    .project({
      name: 1,
      image: 1,
      code: 1,
      stock_number: $.sum("$stock_list.number"),
    })
    .sort({
      stock_number: -1,
    })
    .end();

  const data = query.list;

  return {
    data,
  };
};
