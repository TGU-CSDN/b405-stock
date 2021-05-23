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

  const oldStockNumber = data[0].number;

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

  // 添加购买记录
  const newQuery = await db
    .collection("user_stock")
    .where({
      _id: event.stock_owner_id,
    })
    .get();
  const newData = newQuery.data[0];

  await db.collection("stock_record").add({
    data: {
      action_type: "buy",
      time: new Date().getTime(),
      stock_id: data[0].stock_id,
      belonger_openid: data[0]._openid, // 事件归属者
      operator_openid: openid, // 事件操作者
      old_number: oldStockNumber,
      new_number: newData.number,
    },
  });

  return {
    success: true,
  };
};
