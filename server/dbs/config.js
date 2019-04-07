export default {
  // 对于数据库地址的配置，MongoDB默认的端口为27017，
  dbs: 'mongodb://127.0.0.1:27017',
  // 对于redis的配置（用来存储session的）
  redis: {
    get host() {
      return '127.0.0.1';
    },
    get port() {
      return 6379;
    },
  },
  // 关于smtp的配置，这里我们使用的是腾讯邮箱，我们需要进入腾讯邮箱里面打开设置，进行配置，并且生成授权码
  smtp: {
    get host() {
      return 'smtp.qq.com';
    },
    // 这里填你的邮箱
    get user() {
      return 'xxxx@qq.com';
    },
    // 这里就填授权码
    get pass() {
      return '';
    },
    // 生成的验证码
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    // 验证码的生命周期
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000;
      };
    },
  },
};
