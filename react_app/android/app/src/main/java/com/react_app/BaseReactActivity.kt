package com.react_app

import com.facebook.react.ReactActivity

/**
 * @author vianhuang
 * @date 2020/8/31 4:46 PM
 */
open class BaseReactActivity: ReactActivity() {
    fun showDevOptionsDialog(){
        reactInstanceManager.showDevOptionsDialog()
    }
}