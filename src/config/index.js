import title from '@/assets/images/config/title.png';
import * as constants from 'constants';

// 图例
import tl from '@/assets/images/config/tl.png';
import ActiveTl from '@/assets/images/config/atl.png';

// 图层列表
import tc from '@/assets/images/config/tc.png';
import ActiveTc from '@/assets/images/config/atc.png';

// 书签
import sq from '@/assets/images/config/sq.png';
import ActiveSq from '@/assets/images/config/asq.png';

// 意见管理
import yj from '@/assets/images/config/yj.png';
import ActiveYj from '@/assets/images/config/ayj.png';

// 测量
import cl from '@/assets/images/config/cl.png';
import ActiveCl from '@/assets/images/config/acl.png';

// 绘图
import ht from '@/assets/images/config/ht.png';
import ActiveHt from '@/assets/images/config/aht.png';

// 打印
import dy from '@/assets/images/config/dy.png';
import ActiveDy from '@/assets/images/config/ady.png';

// 空间查询
import kj from '@/assets/images/config/kj.png';
import ActiveKx from '@/assets/images/config/akj.png';

// 属性查询'
import sx from '@/assets/images/config/sx.png';
import ActiveSx from '@/assets/images/config/asx.png';

// 碰撞分析
import pz from '@/assets/images/config/pz.png';
import ActivePz from '@/assets/images/config/apz.png';

const Featurelist = [
  {
    title: '常用功能',
    defaultimage: title,
    sort: 1,
    list: [
      {
        name: '图例',
        defaultimage: tl,
        checkedimage: ActiveTl,
        checked: true,
        sort: 1,
      },
      {
        name: '图层列表',
        defaultimage: tc,
        checkedimage: ActiveTc,
        checked: false,
        sort: 2,
      },
      {
        name: '书签',
        defaultimage: sq,
        checkedimage: ActiveSq,
        checked: false,
        sort: 3,
      },
      {
        name: '意见管理',
        defaultimage: yj,
        checkedimage: ActiveYj,
        checked: false,
        sort: 4,
      },
      {
        name: '测量',
        defaultimage: cl,
        checkedimage: ActiveCl,
        checked: false,
        sort: 5,
      },
      {
        name: '绘图',
        defaultimage: ht,
        checkedimage: ActiveHt,
        checked: false,
        sort: 6,
      },
      {
        name: '打印',
        defaultimage: dy,
        checkedimage: ActiveDy,
        checked: false,
        sort: 7,
      },
      {
        name: '空间查询',
        defaultimage: kj,
        checkedimage: ActiveKx,
        checked: false,
        sort: 8,
      },
      {
        name: '属性查询',
        defaultimage: sx,
        checkedimage: ActiveSx,
        checked: false,
        sort: 9,
      },
      {
        name: '碰撞分析',
        defaultimage: pz,
        checkedimage: ActivePz,
        checked: false,
        sort: 10,
      },
    ],
  },
];

function sort(arr) {
  arr.sort((a, b) => a.sort - b.sort);
  arr.forEach((item) => {
    if (item.list) {
      sort(item.list);
    }
  });
  return arr;
}
sort(Featurelist);
export default Featurelist;
