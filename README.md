### 为啥要用jsx去写，因为iview Table中的render的写法写起来页面太长了。 所以换了个别的思路去实现
如果使用vue-cli2.0构建的项目,使用jsx需要按 [这里](https://github.com/vuejs/babel-plugin-transform-vue-jsx)的方法引用包,才能使用
    如果使用的vue-cli 3.0构建的,则不需要配置,直接使用即可
    
    另外, 在webstorm中开发时可能会出现eslint语法检查报错的问题
    解决办法：在script标签上添加 type='text/jsx', 如下：
```
render: (h, params) => {
     return <div>aaaaaaa</div> // eslint 会提示格式错
 }
```

```
<template>
    <div></div>
</template>
<script type="text/jsx">
    export default {
        data () {
            return {}
        }
    }
</script>
```

### 具体写法
```
<template>
  <Row type="flex" justify="center" align="top">
    <Col span="24">
      <Card>
        <p slot="title">table中自定义列render中jsx写法</p>
        <div style="text-align: right;">
          <Button type="primary" size="default">添加</Button>
        </div>
        <Table style="margin-top: 10px;" :columns="tableTitle" :data="data"></Table>
      </Card>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  // @ is an alias to /src

  export default {
    name: 'home',
    data () {
      return {
        tableTitle: [
          {
            title: '姓名',
            align: 'center',
            render: (h, params) => {
              return <i-input value={params.row.name}
                              onOn-change={this.modelHandler.bind(this, params, 'name')}></i-input>
            }
          }, {
            title: '性别',
            align: 'center',
            render: (h, params) => {
              return <i-select value={params.row.gender} onOn-change={this.selectHandler.bind(this, params)}>
                <i-option value="0" label="男"></i-option>
                <i-option value="1" label="女"></i-option>
              </i-select>
            }
          }, {
            title: '年龄',
            align: 'center',
            render: (h, params) => {
              return <i-input value={params.row.age}
                              onOn-change={this.modelHandler.bind(this, params, 'age')}></i-input>
            }
          }, {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              // 如果使用map去代替v-for, 则需要在回调中传入this来保证回调函数的this指向
              // 绑定的事件如果传递在methods中的话，则需要使用bind来保证运行时的this指向
              // 所以 this.btnClickHandler是在渲染页面时给当列绑定事件, 之所以用this.btnClickHandler而不是btnClickHandler,是因为btnClickHandler是写在methods中。
              // 如果是定义在render中。则可以 nativeOnClick={btnClickHandler}
              // bind的使用是何证这我们绑定的函数在运行时this的指向是当前的实例，这样我们可以在这个方法中使用 data 中的数据
              // 类似 react 中的 this.methodXXX.bind(this)
              let btns = [1, 2, 3, 4].map((item) => {
                return <i-button type="primary" size="small" nativeOnClick={this.btnClickHandler.bind(this, params.row, item)}>Btn-{item}</i-button>
              }, this)
              // 第二中写法 map回调中不传this
              /*
              let that = this
              let btns = [1, 2, 3, 4].map(item => {
                return <i-button type="primary" size="small" nativeOnClick={that.btnClickHandler.bind(that, params.row, item)}>Btn-{item}</i-button>
              })
              */
              return <div style="display:flex;flexDirection:row;justifyContent:space-around;alignItems:center;">
                {btns}
              </div>
            }
          }
        ],
        data: [
          {
            name: '张一',
            age: 12,
            gender: null
          }, {
            name: '张二',
            age: 22,
            gender: null
          }, {
            name: '张三',
            age: 32,
            gender: null
          }, {
            name: '张四',
            age: 42,
            gender: null
          }
        ]
      }
    },
    methods: {
      /**
       * 实现双向绑定
       * @param params 当然列的数据 params.row 就是当前列
       * @param key 当然列要绑定的属性名称
       * @param e Dom event对象
       */
      modelHandler (params, key, e) {
        let v = e.target.value
        console.log(params)
        params.row[key] = v
      },
      /**
       * iview 对select组件提供的on-change
       * @param params
       * @param v
       */
      selectHandler (params, v) {
        console.log(v)
        params.row.gender = v
      },
      /**
       * click 事件
       * @param row
       * @param v
       */
      btnClickHandler (row, v) {
        console.log(row, v)
      }
    }
  }
</script>

```
[git地址](https://github.com/jiabinbin/iview-jsx)

最后效果图

![](https://user-gold-cdn.xitu.io/2018/11/1/166cda8a0cc1896b?w=1758&h=516&f=png&s=55876)

以上就是具体的实现过程，
第一次写这种如果有不对的直接指出，非常感谢
    
