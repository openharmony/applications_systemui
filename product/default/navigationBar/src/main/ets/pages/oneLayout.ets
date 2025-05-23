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

import keyButton from './keybutton';
import Constants from '../common/constants'
import Log from '../../../../../../../common/src/main/ets/default/Log';
const TAG = 'NavigationBar-OneLayout';

let KeyCodeArr: any[] = [
  {
    "uri": $r('app.media.ic_systemui_home'),
    "keyCode": Constants.KEYCODE_HOME
  }];

@Component
export default struct oneLayout {
  @StorageLink('minNavHeight') minNavHeight:number = 32

  aboutToAppear() {
    Log.showInfo(TAG, `aboutToAppear Start`)
  }

  aboutToDisappear(){
    Log.showInfo(TAG, `aboutToDisAppear`)
  }

  build() {
    Grid() {
      ForEach(KeyCodeArr, (item: any) => {
        GridItem() {
          keyButton({
            uri: item.uri,
            keyCode: item.keyCode
          })
        }
        .height('100%')
        .constraintSize({ minHeight: this.minNavHeight + 'px'})
        .align(Alignment.Center)
      })
    }
    .columnsTemplate(Constants.ONE_TEMPLATE)
    .height('100%')
    .align(Alignment.Center);
  }
}
