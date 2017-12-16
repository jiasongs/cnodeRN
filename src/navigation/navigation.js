import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Home from '../page/home/home';
import Job from '../page/job/job';
import Notice from '../page/notice/notice';
import Mine from '../page/mine/mine';
import Detail from '../page/detail/detail'

const Tabs = TabNavigator({
  Home: { screen: Home },
  Job: { screen: Job },
  Notice: { screen: Notice },
  Mine: { screen: Mine },
}, {
    tabBarOptions: {
      indicatorStyle: { height: 0 },
      activeTintColor: '#0085da',
      style: {
        backgroundColor: '#fff',
      },
      showIcon: true,
    },
    lazy: true, //懒加载
    swipeEnabled: false,
    animationEnabled: false, //关闭安卓底栏动画
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
  });

const Navigation = StackNavigator({
  Tabs: { screen: Tabs },
  Detail: { path: 'people/:name', screen: Detail },
}, {
    initialRouteName: 'Tabs',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2D2D2D',
      },
      // headerBackTitle: null,
      headerTintColor: '#FFFFFF',
    },
    headerMode: 'screen'
  });
export default Navigation;