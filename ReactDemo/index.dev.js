/**
 * 入口
 */

import {AppRegistry} from 'react-native';
import home from './home';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => home);
AppRegistry.registerComponent("@shopee-rn/main/HOME", () => home);
