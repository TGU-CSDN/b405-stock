// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  if (event._id) {
    // edit
    await db
      .collection("stock")
      .where({
        _id: event._id,
      })
      .update({
        image: event.image,
        name: event.name,
        code: event.code,
      });
  } else {
    // add
    const query = await db
      .collection("stock")
      .where({
        code: event.code,
      })
      .get();

    const data = query.data;

    if (data.length) {
      return {
        success: false,
        message: "已有该条码的商品存在",
      };
    }

    await db.collection("stock").add({
      data: {
        image: event.image,
        name: event.name,
        code: event.code,
      },
    });
  }

  return {
    success: true,
  };
};
