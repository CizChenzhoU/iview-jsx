<template lang="html">
  <Row type="flex" align="top" justify="start">
    <Col span="24">
      <Card>
        <p slot="title">table中head中jsx写法</p>
        <div style="text-align: right;">
          <Button type="primary" size="default">添加</Button>
        </div>
        <Table style="margin-top: 10px;" :columns="tableTitle" :data="data"></Table>
      </Card>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  export default {
    data () {
      return {
        tableTitle: [
          {
            title: '序号',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            fixed: 'left',
            type: 'index'
          }, {
            title: '品种代码',
            align: 'center',
            tooltip: true,
            minWidth: 100,
            fixed: 'left',
            key: 'brand'
          }, {
            title: '商品名称',
            align: 'center',
            minWidth: 100,
            fixed: 'left',
            tooltip: true,
            key: 'name'
          }, {
            title: '规格',
            align: 'center',
            fixed: 'left',
            minWidth: 80,
            tooltip: true,
            render: (h, params) => {
              let type = params.row.unit_type
              let str = ''
              if (type === '3') {
                str = '若干枝'
              } else {
                let s = this.$util.getNameByStatus(type, 'unit_type', this.systemMap)
                str = params.row.unit + s
              }
              return <div>
                <span>{str}</span>
              </div>
            }
          }, {
            fixed: 'right',
            title: '操作',
            align: 'center',
            tooltip: true,
            width: 220,
            render: (h, params) => {
              let route = `/order/orderList/orderDetail/${params.row.id}`
              let vm = <div style="display:flex;flexDirection:row;justifyContent:space-around;">
                <i-button type="primary" size="small" to={route} replace>查看订单</i-button>
                <i-button type="error" size="small" style="marginLeft:3px;">取消订单</i-button>
                <i-button type="primary" size="small" style="marginLeft:3px;">暂未录入</i-button>
              </div>
              return vm
            }
          }
        ],
        data: [],
        stash: [
          {
            id: 1,
            title: 'A级'
          }, {
            id: 1,
            title: 'B级'
          }, {
            id: 1,
            title: 'C级'
          }, {
            id: 1,
            title: 'D级'
          }, {
            id: 1,
            title: '活动'
          }, {
            id: 1,
            title: '优质'
          }
        ]
        // data: [{}, {}, {}]
      }
    },
    methods: {
      createTableItem (arr) {
        let all = arr.map(item => {
          return {
            id: item.id,
            title: item.title,
            align: 'center',
            width: 100,
            tooltip: true,
            children: []
          }
        })
        return all
      },
      createdChildren (all) {
        let children = [
          {
            title: '当前',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            key: 'pack_price'
          }, {
            title: '上海',
            align: 'center',
            minWidth: 80,
            tooltip: true,
            render: (h, params) => {
              if (params.row) {
                return <i-input size="default"></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: '库存',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            render: (h, params) => {
              if (params.row) {
                return <i-input size="default"></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: '昆明参考价',
            align: 'center',
            tooltip: true,
            minWidth: 100,
            render: (h, params) => {
              if (params.row) {
                return <i-input size="default"></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }
        ]
        all.forEach(item => {
          item.children = children
        })
        return all
      }
    },
    created () {
      let all = this.createTableItem(this.stash)
      let title = this.createdChildren(all)
      // title.sort((pre, cur) => pre.id - cur.id)
      let vmTitle = Array.from(this.tableTitle)
      let len = vmTitle.length
      title.forEach((item, i) => {
        vmTitle.splice((len - i), 0, item)
      })
      this.tableTitle = vmTitle
    }
  }
</script>

<style lang="less" scoped>
</style>
