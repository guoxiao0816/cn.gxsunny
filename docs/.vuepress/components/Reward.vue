<template>
  <div>
    <details class="custom-block details">
      <summary>打赏一下</summary>
      <br />
      <p align="center" style="max-width: 200px; margin: 0 auto">
        <img
          :src="rewardImg"
          style="border: 1px solid #dddddd"
          class="medium-zoom-image"
        />
      </p>
      <p align="center">「真诚赞赏，手留余香」</p>
      <h3 id="打赏记录"><a href="#打赏记录" class="header-anchor">#</a> 打赏记录</h3>
      <table>
        <thead>
          <tr>
            <th style="text-align: center">打赏者</th>
            <th style="text-align: center">打助金额 (元)</th>
            <th style="text-align: center">支付方式</th>
            <th style="text-align: center">时间</th>
            <th style="text-align: center">备注</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in rewarder" :key="index">
          <tr>
            <td style="text-align: center">{{ item[0] }}</td>
            <td style="text-align: center">{{ item[1] }}</td>
            <td style="text-align: center">{{ item[2] }}</td>
            <td style="text-align: center">{{ item[3] }}</td>
            <td style="text-align: center">{{ item[4] }}</td>
          </tr>
        </tbody>
      </table>
    </details>
  </div>
</template>

<script>
let rewarder = [
  // ['打赏者','打助金额','支付方式','时间','备注'],
  ['攒钱养猪', '9.9', '微信', '2021-05-20', '攒钱养猪赞赏'],
];
export default {
  name: 'Reward',
  data() {
    return {
      rewarder,
      rewardImg: 'https://blog-gxsunny-cn.oss-accelerate.aliyuncs.com/blog/zsm.jpg',
    };
  },
};
</script>

<style lang="stylus" scoped>
.details {
    margin: 5% auto 0 auto;
    width: 100%;
}

summary {
    background-color: #faebd7;
    text-align: center;
    margin: 0 auto;
    width: 150px;
    cursor: pointer;
}

table th:nth-of-type(1), th:nth-of-type(4), th:nth-of-type(5) {
    width: 22.5%;
}
</style>
