package com.react_app.module

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.react_app.BaseReactActivity

/**
 * @author vianhuang
 * @date 2020/8/31 4:33 PM
 */
class TestModule (context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "TestModule"
    }

    @ReactMethod
    fun showDevOptionsDialog(){
        Handler(Looper.getMainLooper()).post {
            (currentActivity as? BaseReactActivity)?.showDevOptionsDialog()
        }
    }

    @ReactMethod
    fun sendEventToReact() {
        val params = Arguments.createMap().apply {
            putString("eventProperty", "someValue")
        }
        sendEvent(reactApplicationContext, "DemoEvent", params)
    }

    /**
     * 发送事件给RN
     * @param eventName 事件名
     * @param params 参数
     */
    private fun sendEvent(
            reactContext: ReactContext,
            eventName: String,
            params: WritableMap
    ) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }
}