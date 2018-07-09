<template>
  <div id="app">
    <div class="order">
      <el-form class="form" label-width="120px">
        <el-form-item :label="item.label" v-for="(item,key) in forms" :key="key">
          <el-input v-if="item.type!=='bool'" v-model="item.value" :disabled="item.disable"></el-input>
          <el-switch v-else v-model="item.value"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="feeQuery">预览运费</el-button>
          <el-button @click="orderCreate">提交订单</el-button>

        </el-form-item>
        <el-form-item>
        </el-form-item>

      </el-form>
      <div class="status">
        <h2>请求回调</h2>
        <p>{{callback}}</p>

        <h2 style="margin-top:100px;">订单状态：</h2>
        <p>{{orderStatus}}</p>
      </div>
    </div>

    <div class="btn">
      <el-button @click="fake('orderAccept')">模拟接受订单</el-button>
      <el-button @click="fake('orderFetch')">模拟完成取货</el-button>
      <el-button @click="fake('orderFinish')">模拟完成订单</el-button>
      <el-button @click="fake('orderCancel')">模拟取消订单</el-button>
      <el-button @click="fake('orderExpire')">模拟订单过期</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {},
  name: "app",
  data() {
    return {
      forms: [
        { label: "shop_no", value: "11047059", disable: true },
        {
          label: "origin_id",
          value: Math.round(new Date().getTime() / 1000).toString(),
        },
        { label: "city_code", value: "0769" },
        { label: "cargo_price", value: 10 },
        { label: "is_prepay", value: false, type: "bool" },
        { label: "receiver_name", value: "蔡锦源" },
        { label: "receiver_address", value: "东莞市东城区创客谷516" },
        { label: "receiver_phone", value: "13728119700" },
        { label: "is_use_insurance", value: false, type: "bool" }
      ],
      orderStatus: {},
      callback: {}
    };
  },
  methods: {
    orderCreate() {
      let obj = {};
      this.forms.forEach(element => {
        obj[element.label] = element.value;
      });
      axios.post("/orderCreate", obj).then(res => {
        this.callback = res.data;
      });
    },
    feeQuery() {
      let obj = {};
      this.forms.forEach(element => {
        obj[element.label] = element.value;
      });
      axios.post("/feeQuery", obj).then(res => {
        this.callback = res.data;
      });
    },
    fake(status) {
      let order_id = this.forms.filter(item => item.label === "origin_id")[0]
        .value;
      axios.post("/fake", { status, order_id }).then(res => {
        console.log(res);
      });
    }
  },

  socket: {
    events: {
      notification(msg) {
        this.orderStatus = msg;
      }
    }
  }
};
</script>

<style>
.btn {
  margin: 50px auto;
  display: flex;
  justify-content: center;
  /* width: 500px; */
}
.form {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 500px;
}
.status {
  width: 400px;
}
.order {
  display: flex;
  justify-content: space-around;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
