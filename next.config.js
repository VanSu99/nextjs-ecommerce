module.exports = {
  distDir: "build",
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://sa:1234567890@cluster0.zgdzw.mongodb.net/next_ecommerce?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "HSYM.mrXE'457?'et~qA,x}(j/]APB@m?3L-}]@w[x$gkL^Rs&",
    REFRESH_TOKEN_SECRET:
      "K}B<Ur2&wSvf?dAa{.we4?[xb')D7FQH;x9m>geYM%ndZK,4@zPf\\etY)#vYupr)dnKTD*xp'Vgz2",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
};
