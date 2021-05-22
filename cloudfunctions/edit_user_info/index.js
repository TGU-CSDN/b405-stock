// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const query = db.collection("users").where({
    _openid: openid,
  });

  const data = {};
  const { username, avatar_url } = event;
  if (username) {
    data.username = username;
  }
  if (avatar_url) {
    data.avatar_url = avatar_url;
  }

  query.update({
    data,
  });

  return {
    success: true,
  };
};
