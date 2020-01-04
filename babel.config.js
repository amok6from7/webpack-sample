// .babaelrc ではなく、js とする理由は関数が使えるため

module.exports = api => {
    api.cache(true);
  
    return {
        "presets": [
            ["@babel/preset-env", {
                targets: [
                    //ie: "11", // IE11は必ず動くようにする
                    //chrome: "60" // version指定はあまり使わない
                    "last 1 version",
                    "> 1%",
                    "maintained node versions",
                    "not dead"
                ],
                useBuiltIns: "usage",
                corejs: 3
            }]
        ]
    }
  }