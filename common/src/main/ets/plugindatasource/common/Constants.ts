/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Event } from '../../default/event/EventUtil';
import notificationManager from '@ohos.notificationManager';
import image from '@ohos.multimedia.image';
import resourceManager from '@ohos.resourceManager';
import { WantAgent } from '@ohos.wantAgent';
import NtfMgr from '@ohos.notificationManager';

export default class Constants {
  static readonly INIT_CONFIG = 'initConfig';
  static readonly INIT_FINISH = 'initFinish';
  static readonly CLEAR_ALL = 'clearAll';
  static readonly ADD_ITEM = 'addItem';
  static readonly REMOVE_ITEM = 'removeItem';
  static readonly LOCAL_DEVICE = 'local';
  static readonly LOAD_DATA = 'loadData';
  static readonly LOAD_PLUGIN_COMPONENT_DATA = 'loadPluginComponentData';
  static readonly UPDATE_PLUGIN_COMPONENT_DATA = 'updatePluginComponentData';
}

export type FilterData = {
  id: string;
  bundleName: string;
  abilityName: string;
};

export type RootConfigInfo = {
  action: string;
  filterDatas: FilterData[];
  loaderConfig: {
    [key in any]: LoaderConfigInfo;
  };
};

export type LoaderConfigInfo = {
  [key: string]: any;
};

export enum PluginType {
  META = 1,
  DATA_ABILITY = 2,
  PLUGIN_COMPONENT = 3,
}

export function obtainMsg(action: string, data: any): {
  action: string,
  data: any
} {
  return { action: action, data: data };
}

export type ItemComponentData = {
  id?: string;
  pluginType?: number;
  deviceId?: string;
  bundleName?: string;
  moduleName?: string,
  abilityName?: string;
  abilityLabelId?: number;
  abilityIconId?: number;
  label?: string;
  iconUrl?: string;
  template?: string;
  state?: any;
  actionData?: ActionData;
}

export class ActionData {
  clickAction?: Event;
  longClickAction?: Event;
  launchType?: number;
  pluginData?: PluginComponentData;
  extra?: any;
}

export class PluginComponentData {
  template;
  data;
}

export class itemData {
  id?:string;
  pluginType?:number;
  bundleName?:string;
  moduleName?:string;
  abilityName?:string;
  abilityLabelId?:number;
  abilityIconId?:number;
  label?:string;
  iconUrl?: string;
  actionData?;
  relationWindowId?
  canSelect?
  isShowLabel?
  isShowIcon?
}

export interface NotificationItemData {
  id: string;
  hashcode: string;
  userId: number;
  uid: number;
  contentType: string;
  timestamp: number;
  time: string;
  appName: string;
  want: WantAgent;
  actionButtons: notificationManager.ButtonOptions[];
  bundleName: string;
  smallIcon?: image.PixelMap | string;
  largeIcon?: image.PixelMap | string;
  picture?: image.PixelMap;
  title?: string;
  text?: string;
  additionalText?: string;
  briefText?: string;
  expandedTitle?: string;
  longText?: string;
  lines?: any[];
  longTitle?: string;
  slotLevel?: any;
  source?: number;
  versionName?: string;
  sound?: string;
  vibrationValues?: Array<number>;
  notificationFlags?: any;
  ruleData?: RuleData;
  template?: any;
  isOngoing?: boolean;
  isUnremovable?: boolean;
  isRemoveAllowed?: boolean;
  distributedOption?: any;
  deviceId?: string;
  groupName?: string;
  tapDismissed?: boolean;
}

export interface RuleData {
  isAllowBanner?: boolean;
  isAllowSound?: boolean;
  isAllowVibrationValues?: boolean;
  isAllowStatusBarShow?: boolean;
  isAllowNotificationListShow?: boolean;
}

export interface ConfigInfo {
  maxWidth: number;
  maxHeight: number;
  minHeight: number;
  showHorizontal: boolean;
  direction: number;
  realWidth: number;
  realHeight: number;
  xCoordinate: number;
  yCoordinate: number;
  ableToMaximize?: boolean;
  showNavHorizontal?: boolean;
}

export interface BundleItemData {
  appIcon?: string;
  appTitle?: string;
  appValue?: string;
  appArrow?: string | resourceManager.Resource;
  appSummary?: string;
  appBundleName?: string;
  appIconId?: string;
  appUri?: string;
  appUid?: number;
  systemApp?: boolean;
  slotSettingUrl?: string
}

export interface TouchMoveData {
  direction: string,
  touchComponent: string
}