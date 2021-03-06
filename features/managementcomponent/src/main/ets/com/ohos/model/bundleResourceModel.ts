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
import Log from '../../../../../../../../common/src/main/ets/default/Log';
import AbilityManager from '../../../../../../../../common/src/main/ets/default/abilitymanager/abilityManager';
import Bundle from '@ohos.bundle';
import { BundleInfo } from 'bundle/bundleInfo';
import ResMgr from '@ohos.resourceManager';
import {BusinessError} from 'basic';
import SwitchUserManager from '../../../../../../../../common/src/main/ets/default/SwitchUserManager';

const INDEX = 0;
const IS_INCLUDE_ABILITY_INFO = 0;

const TAG = 'NotificationManagenment-BundleResourceModel';

export interface BundleItemData {
  appIcon?: string;
  appTitle?: string;
  appValue?: string;
  appArrow?: string|Resource;
  appSummary?: string;
  appBundleName?: string;
  appIconId?: string;
  appUri?: string;
  appUid?: number;
  systemApp?: boolean;
}

export default class BundleResourceModel {
  private readonly mBundleInfoList: BundleItemData[] = [];

  async getAllBundleInfos(): Promise<void> {
    let userId =(await SwitchUserManager.getInstance().getCurrentUserInfo()).userId;
    await Bundle.getAllBundleInfo(IS_INCLUDE_ABILITY_INFO, userId).then((data: BundleInfo[]) => {
      void this.getIconItem(INDEX, data.length, data);
    });
    Log.showInfo(TAG, 'getAllBundleInfos end');
  }

  async getIconItem(index: number, count: number, data: BundleInfo[]): Promise<void> {
    Log.showInfo(TAG, `getIconItem data.length ${data.length}`);
    let label = '';
    let that = this;
    try {
      let bundleContext = await AbilityManager.getContext().createBundleContext(data[index].name);
      let bundleResourceManager = await bundleContext.resourceManager;
      let appInfo = data[index].appInfo;
      if (parseInt(appInfo.labelId) > 0) {
        bundleResourceManager.getString(parseInt(appInfo.labelId), (error: BusinessError, value: string) => {
          if (value) {
            label = value;
          }
        });
      } else {
        label = appInfo.label;
      }
      Log.showDebug(TAG, 'getIconItem ResMgr.getResourceManager finish label:' + label);
      if (parseInt(appInfo.iconId) <= 0) {
        this.nextIconItem(index, count, data, this.mBundleInfoList, that);
        return;
      }
      bundleResourceManager.getMediaBase64(parseInt(appInfo.iconId), (error: BusinessError, value: string) => {
        if (value) {
          Log.showInfo(TAG, `getIconItem ResMgr.getMediaBase64() imageValue:${value}` );
          let bundleItemData: BundleItemData = {
            appIcon: value,
            appTitle: label,
            appValue: '',
            appArrow: $r('app.media.ic_settings_arrow'),
            appSummary: data[index].versionName,
            appBundleName: data[index].name,
            appIconId: appInfo.iconId,
            appUri: 'pages/setEnable',
            appUid: data[index].uid,
            systemApp: appInfo.systemApp
          };
          this.mBundleInfoList.push(bundleItemData);
        }
        this.nextIconItem(index, count, data, this.mBundleInfoList, that);
      });
    } catch (error) {
      Log.showError(TAG, `getIconItem catch error: ${JSON.stringify(error)}`);
    }
  }

  nextIconItem(index: number, count: number, data: BundleInfo[], bundleInfoList: BundleItemData[], that: BundleResourceModel): void {
    Log.showInfo(TAG, 'nextIconItem index:' + index + ' | count:' + count);
    if (count - 1 > index) {
      index = index + 1;
      void that.getIconItem(index, count, data);
    } else {
      AppStorage.SetOrCreate('appManagementList', bundleInfoList);
    }
  }

  async getBundleInfo(bundleName: string, callback: {(data: BundleItemData): void}): Promise<void> {
    let mBundleInfo: BundleItemData = {};
    let label = '';
    let userInfo = await SwitchUserManager.getInstance().getCurrentUserInfo();

    await Bundle.getBundleInfo(bundleName, IS_INCLUDE_ABILITY_INFO, {
      userId: userInfo.userId
    }).then((data) => {
      Log.showInfo(TAG, `getBundleInfo bundleInfo:${JSON.stringify(data)}`);
      ResMgr.getResourceManager(data.name, (error: Error, item) => {
        let appInfo = data.appInfo;
        if (parseInt(appInfo.labelId) > 0) {
          item.getString(parseInt(appInfo.labelId), (error: Error, value: string) => {
            if (value) {
              Log.showDebug(TAG, `getBundleInfo getResourceManager getString() value:${JSON.stringify(value)}`);
              mBundleInfo.appTitle = value;
            } else {
              Log.showError(TAG, `getBundleInfo getResourceManager getString() error:${JSON.stringify(error)}`);
            }
          });
        }
        mBundleInfo.appTitle = appInfo.label;
        mBundleInfo.appValue = '';
        mBundleInfo.appArrow = $r('app.media.ic_settings_arrow');
        mBundleInfo.appSummary = data.versionName;
        mBundleInfo.appBundleName = data.name;
        mBundleInfo.appIconId = appInfo.iconId;
        mBundleInfo.appUri = '';
        mBundleInfo.appUid = data.uid;
        mBundleInfo.systemApp = appInfo.systemApp;
        Log.showDebug(TAG, 'getBundleInfo getResourceManager label:' + label);
        if (parseInt(appInfo.iconId) > 0) {
          item.getMediaBase64(parseInt(appInfo.iconId), (error: Error, imageValue: string) => {
            if (!!imageValue) {
              mBundleInfo.appIcon = imageValue;
            }
            callback(mBundleInfo);
          });
        } else {
          callback(mBundleInfo);
        }
      });
    });
    Log.showInfo(TAG, 'getBundleInfo end');
  }
}

