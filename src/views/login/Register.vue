<template>
  <div class="register">
    <div
      style="
        width: 400px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 10px;
      "
    >
      <el-form
        ref="refForm"
        :model="user"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          ><div
            style="
              font-size: 30px;
              color: #f5fffa;
              margin-top: 20px;
              margin-left: 20px;
            "
          >
            欢迎注册
          </div></el-form-item
        >
        <el-form-item label="用户昵称：" prop="userName">
          <el-input
            v-model="user.userName"
            placeholder="示例：帅刚（中文2-8位）"
          />
        </el-form-item>

        <!-- <el-form-item label="生日：" prop="birthday">
          <el-date-picker
            v-model="user.birthday"
            type="date"
            placeholder="请选择生日"
            style="width: 100%"
            :disabled-date="disabledDate"
            :editable="false"
          ></el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="电话：" prop="phone">
          <el-input v-model="user.phone" />
        </el-form-item> -->
        <el-form-item label="邮箱账号：" prop="email">
          <el-input
            :disabled="inputDisabled"
            v-model="user.email"
            placeholder="示例：1491900793@qq.com"
          />
        </el-form-item>
        <el-form-item label="">
          <el-row :gutter="10">
            <el-col :span="13">
              <el-input
                v-model="validCode"
                :disabled="inputDisabled"
                class="validate-code"
                placeholder="请输入"
                :prefix-icon="
                  Code === 1
                    ? 'el-icon-warning-outline'
                    : Code === 2
                    ? 'el-icon-success'
                    : 'el-icon-error'
                "
                v-on:input="change"
              />
            </el-col>
            <el-col :span="11" align="right">
              <el-button type="text" @click="send" style="color: #f5fffa"
                >点击发送验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="设置密码：" prop="password">
          <el-input
            v-model="user.password"
            placeholder="示例：Aa123456"
            show-password
          />
        </el-form-item>
        <!-- <el-form-item label="选择性别：" prop="sex">
          <el-radio-group v-model="user.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item style="margin-top: 40px">
          <el-button
            @click="register"
            style="
              height: 40px;
              width: 60%;
              background-color: #4eb8dd;
              color: #f5fffa;
            "
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item align="right">
          <a style="color: #f5fffa" href="../login">已有账号，去登录</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {post} from "@/http/axios";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import router from "@/router";
import myMessage from "@/utils/common";
import moment from "moment";
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const refForm = ref();
    // 页面数据
    const state = reactive({
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      validCode: null,
      inputDisabled: false,
      email: "",
      Code: 1,
      user: {
        userName: "",
        password: "",
        birthday: null,
        phone: "18888888888",
        sex: "1",
        email: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "昵称不能为空且只能为中文2-8位",
            trigger: "blur",
            transform(value) {
              let regex = /^[\u4e00-\u9fa5]{2,8}$/;
              if (regex.test(value)) {
                return value;
              }
            },
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空且只能为数字或者大小写字母(8-16位)",
            trigger: "blur",
            transform(value) {
              // 大小写字母+数字8-16
              // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
              let regex = /^[A-Za-z0-9]{8,16}$/;
              if (regex.test(value)) {
                return value;
              }
            },
          },
        ],
        phone: [
          {
            required: true,
            message: "示例：13345678911",
            trigger: "blur",
            type: "number",
            transform(value) {
              let regex = /^1[3|4|5|7|8]\d{9}$/;
              if (regex.test(value)) {
                return Number(value);
              }
            },
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空或邮箱格式错误",
            trigger: "blur",
            transform(value) {
              let regex =
                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
              if (regex.test(value)) {
                return value;
              }
            },
          },
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请输入生日",
            trigger: "change",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
      },
    });
    // 方法体
    const methods = {
      // 发送验证码
      send() {
        if (state.user.email) {
          request.sendMailCode();
        } else {
          myMessage("邮箱不能为空", null, 1, null, null);
        }
      },
      // 验证码校验
      change: function () {
        if (state.validCode > 999 && state.validCode < 10000) {
          request.checkMailCode();
        } else {
          state.Code = 0;
        }
      },
      // 注册
      register() {
        const form = refForm.value;
        if (!form) return;
        form.validate((valid: Boolean) => {
          if (valid) {
            if (state.Code === 2 && state.user.email === state.email) {
              state.user.birthday = Date.now();
              (state.user.birthday = moment(state.user.birthday).format(
                "YYYY-MM-DD"
              )),
                request.insert();
            } else if (state.Code !== 2) {
              myMessage("验证码错误", null, 1, null, null);
            } else if (state.user.email !== state.email) {
              myMessage("发送邮箱验证码后请勿在做更改！", null, 1, null, null);
            }
          }
        });
      },
    };
    // 页面默认请求
    onMounted(() => {});

    // 请求
    const request = {
      insert() {
        const param = state.user;
        post("/gsg/user/insertUser", param).then((res: any) => {
          let { code, message, data } = res;
          if (code === 200) {
            myMessage(message, null, 0, null, null);
            // window.location.href='/login'
            router.push("/login");
          } else {
            myMessage(message, null, 2, null, null);
          }
        });
      },
      sendMailCode() {
        const param = {
          type: 2,
          email: state.user.email,
        };
        post("/custom/v1/email/sendMailCode", param).then((res: any) => {
          let { code, message, data } = res;
          if (code === 200) {
            myMessage(message, null, 0, null, null);
            state.email = state.user.email;
          } else {
            myMessage(message, null, 2, null, null);
          }
        });
      },
      checkMailCode() {
        const param = {
          type: 2,
          email: state.user.email,
          validCode: state.validCode,
        };
        post("/custom/v1/email/checkMailCode", param).then((res: any) => {
          let { code, message, data } = res;
          if (code === 200) {
            myMessage(message, null, 0, null, null);
            state.Code = 2;
            state.inputDisabled = true;
          } else {
            myMessage(message, null, 2, null, null);
          }
        });
      },
    };
    return { ...methods, ...toRefs(state), refForm };
  },
});
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url(../../assets/background/hmbb/6.jpg);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  filter: brightness(82%);
}
.el-form {
  width: 90%;
}
:deep(.el-form-item__label) {
  color: #f5fffa !important;
}
:deep(.el-icon-success:before) {
  color: #00ff00 !important;
}
:deep(.el-icon-error:before) {
  color: #fc0404 !important;
}
</style>
