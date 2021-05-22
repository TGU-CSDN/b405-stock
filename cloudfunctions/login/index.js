// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const query = await db
    .collection("users")
    .where({
      _openid: openid,
    })
    .get();

  const data = query.data;
  const isNewUser = !data || !data.length;

  if (isNewUser) {
    await db.collection("users").add({
      data: {
        _openid: openid,
        username: null,
        avatar_url: null,
      },
    });
  }

  return {
    success: true,
    data: data && data[0],
    isNewUser,
  };
};
