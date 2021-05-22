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

  if (data && data.length) {
    // edit
    await db
      .collection("user_stock")
      .where({
        _openid: openid,
        stock_id: event.stock_id,
      })
      .update({
        data: {
          number: event.number,
          price: event.price,
        },
      });
  } else {
    // add
    await db.collection("user_stock").add({
      data: {
        _openid: openid,
        stock_id: event.stock_id,
        number: event.number,
        price: event.price,
      },
    });
  }

  return {
    success: true,
  };
};
