package com.react_demo.pack

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.react_demo.module.ToastModule
import com.react_demo.viewmanager.ButtonViewManager

/**
 * @author vianhuang
 * @date 2020/8/13 6:32 PM
 */
class CustomReactPackage: ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        val modules: MutableList<NativeModule> = mutableListOf()
        modules.add(ToastModule(reactContext))
        return modules
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<*, *>> {
        val managers: MutableList<ViewManager<*, *>> = mutableListOf()
        managers.add(ButtonViewManager())
        return managers
    }
}