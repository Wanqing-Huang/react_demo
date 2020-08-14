package com.shopee.foody.driver.react.module

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object{
        private const val DURATION_SHORT_KEY = "SHORT"
        private const val DURATION_LONG_KEY = "LONG"
    }

    override fun getName(): String {
        return "ToastModule"
    }

    /**
     * 返回了需要导出给 JavaScript 使用的常量
     */
    override fun getConstants(): MutableMap<String, Any> {
        val constants: MutableMap<String, Any> = HashMap()
        constants[DURATION_SHORT_KEY] = Toast.LENGTH_SHORT
        constants[DURATION_LONG_KEY] = Toast.LENGTH_LONG
        return constants
    }

    /**
     * React Native 的跨语言访问是异步进行的，所以想要给 JavaScript 返回一个值的唯一办法是使用回调函数或者发送事件
     *
     * 参数类型映射关系：
     * Boolean -> Bool
     * Integer -> Number
     * Double -> Number
     * Float -> Number
     * String -> String
     * Callback -> function
     * ReadableMap -> Object
     * ReadableArray -> Array
     */
    @ReactMethod
    fun show(message: String?, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
    }
}