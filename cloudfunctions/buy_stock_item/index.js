// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const _ = db.command;

  const query = await db
    .collection("user_stock")
    .where({
      _id: event.stock_owner_id,
    })
    .get();
  const data = query.data;

  if (!data || !data.length) {
    return {
      success: false,
      message: "找不到该库存",
    };
  }

  if (data[0].price <= 0) {
    return {
      success: false,
      message: "该货品不出售",
    };
  }

  if (data[0].number <= 0) {
    return {
      success: false,
      message: "无库存",
    };
  }

  await db
    .collection("user_stock")
    .where({
      _id: event.stock_owner_id,
    })
    .update({
      data: {
        number: _.inc(-1),
      },
    });

  // TODO: 记录

  return {
    success: true,
  };
};
