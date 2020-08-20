package com.reactdemo.module

import android.widget.Toast
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter


class ToastModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object{
        private const val DURATION_SHORT_KEY = "SHORT"
        private const val DURATION_LONG_KEY = "LONG"
    }

    override fun getName(): String {
        return "ToastModule"
    }

    /**
     * 提供给RN定义的常量
     */
    override fun getConstants(): MutableMap<String, Any> {
        val constants: MutableMap<String, Any> = HashMap()
        constants[DURATION_SHORT_KEY] = Toast.LENGTH_SHORT
        constants[DURATION_LONG_KEY] = Toast.LENGTH_LONG
        return constants
    }

    /**
     * 提供给RN调用的方法
     * @param message 参数1
     * @param duration 参数2
     * @param promise 回调
     */
    @ReactMethod
    fun show(message: String?, duration: Int, promise: Promise) {
        if(message.isNullOrBlank()){
            promise.reject("-1", "message can't be null.")
        }else{
            Toast.makeText(reactApplicationContext, message, duration).show()
            promise.resolve(true)
        }
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
                .getJSModule(RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }

    private fun sendEventDemo(){
        val params = Arguments.createMap().apply {
            putString("eventProperty", "someValue")
        }
        sendEvent(reactApplicationContext, "DemoEvent", params)
    }
}