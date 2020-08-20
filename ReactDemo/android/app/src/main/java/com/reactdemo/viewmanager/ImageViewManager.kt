package com.reactdemo.viewmanager

import android.widget.Button
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.shopee.android.log.impl.Logger
import com.shopee.foody.driver.widgets.SlideView


/**
 * @author vianhuang
 * @date 2020/8/20 6:16 PM
 */
class ImageViewManager : SimpleViewManager<Button>() {
    companion object {
        private const val TAG = "ImageViewManager"

        //定义event
        private const val EVENT_NAME_ON_CLICK = "onClick"
        private const val EVENT_NAME_ON_LONG_CLICK = "onLongClick"

        //定义command id
        private const val COMMAND_ID_SET_ENABLE = 0

        //定义command name
        private const val COMMAND_SET_ENABLE = "setEnable"
    }

    override fun getName(): String {
        return "RCTImageView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): Button {
        return Button(reactContext).apply {
            setOnClickListener {
                reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(
                    id, EVENT_NAME_ON_CLICK, Arguments.createMap()
                )
            }
            setOnLongClickListener {
                reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(
                    id, EVENT_NAME_ON_LONG_CLICK, Arguments.createMap()
                )
                true
            }
        }
    }

    //======================== 定义暴露给RN的属性值 ============================//

    @ReactProp(name = "width")
    fun setWidth(view: Button, width: Int) {
        view.layoutParams?.let {
            it.width = width
            view.layoutParams = it
        }
    }

    @ReactProp(name = "height")
    fun setHeight(view: Button, height: Int) {
        view.layoutParams?.let {
            it.height = height
            view.layoutParams = it
        }
    }

    @ReactProp(name = "text")
    fun setText(view: Button, text: String?) {
        view.text = text
    }

    //======================== 定义回调函数给RN ============================//

    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        return MapBuilder.of(
            EVENT_NAME_ON_CLICK,
            MapBuilder.of("registrationName", EVENT_NAME_ON_CLICK),
            EVENT_NAME_ON_LONG_CLICK,
            MapBuilder.of("registrationName", EVENT_NAME_ON_LONG_CLICK)
        )
    }


    //======================== 定义提供给RN调用的命令 ============================//
    override fun getCommandsMap(): MutableMap<String, Int> {
        return MapBuilder.of(
            COMMAND_SET_ENABLE,
            COMMAND_ID_SET_ENABLE
        )
    }

    override fun receiveCommand(view: SlideView, commandId: Int, args: ReadableArray?) {
        Logger.d(TAG, "receive command : view = $view, commandId = $commandId")
        when (commandId) {
            COMMAND_ID_SET_ENABLE -> setEnable(args, view)
        }
    }

    private fun setEnable(
        args: ReadableArray?,
        view: SlideView
    ) {
        val enable = args?.toArrayList()?.getOrNull(0) as? Boolean ?: return
        view.isEnabled = enable
    }

}