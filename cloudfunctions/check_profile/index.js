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
  const hasProfile =
    data && data.length && data[0].username && data[0].avatar_url
      ? true
      : false;

  return {
    success: true,
    hasProfile,
  };
};
