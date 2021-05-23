// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const _ = db.command;
  const $ = db.command.aggregate;

  const query = await db
    .collection("stock_record")
    .aggregate()
    .match({
      belonger_openid: openid,
      stock_id: event.stock_id,
    })
    .lookup({
      from: "users",
      localField: "belonger_openid",
      foreignField: "_openid",
      as: "belonger_user",
    })
    .lookup({
      from: "users",
      localField: "operator_openid",
      foreignField: "_openid",
      as: "operator_user",
    })
    .project({
      action_type: 1,
      old_number: 1,
      new_number: 1,
      stock_id: 1,
      time: 1,
      belonger_user: {
        username: 1,
        avatar_url: 1,
      },
      operator_user: {
        username: 1,
        avatar_url: 1,
      },
    })
    .project({
      action_type: 1,
      old_number: 1,
      new_number: 1,
      stock_id: 1,
      time: 1,
      belonger_user: $.arrayElemAt(["$belonger_user", 0]),
      operator_user: $.arrayElemAt(["$operator_user", 0]),
    })
    .sort({
      time: -1,
    })
    .end();

  const data = query.list;

  return {
    success: true,
    data,
  };
};
