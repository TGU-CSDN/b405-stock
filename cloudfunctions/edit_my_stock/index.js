// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const query = await db
    .collection("user_stock")
    .where({
      _openid: openid,
      stock_id: event.stock_id,
    })
    .get();
  const data = query.data;

  let oldStockNumber = 0;

  if (data && data.length) {
    oldStockNumber = data[0].number;

    // edit
    await db
      .collection("user_stock")
      .where({
        _openid: openid,
        stock_id: event.stock_id,
      })
      .update({
        data: {
          number: event.number || 0,
          price: Math.round(event.price * 10) / 10 || 0,
        },
      });
  } else {
    // add
    await db.collection("user_stock").add({
      data: {
        _openid: openid,
        stock_id: event.stock_id,
        number: event.number || 0,
        price: Math.round(event.price * 10) / 10 || 0,
      },
    });
  }

  // 添加修改记录
  const newQuery = await db
    .collection("user_stock")
    .where({
      _openid: openid,
      stock_id: event.stock_id,
    })
    .get();
  const newData = newQuery.data[0];

  await db.collection("stock_record").add({
    data: {
      action_type: "edit",
      time: new Date().getTime(),
      stock_id: event.stock_id,
      belonger_openid: openid, // 事件归属者
      operator_openid: openid, // 事件操作者
      old_number: oldStockNumber,
      new_number: newData.number,
    },
  });

  return {
    success: true,
  };
};
