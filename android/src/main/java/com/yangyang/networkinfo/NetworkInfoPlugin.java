package com.yangyang.networkinfo;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "NetworkInfo")
public class NetworkInfoPlugin extends Plugin {

    private NetworkInfo implementation = new NetworkInfo();

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }

    @PluginMethod
    public void getCurrentIp(PluginCall call) {
        String ip = implementation.getCurrentIp();
        JSObject ret = new JSObject();
        ret.put("ipAddress", ip);
        call.resolve(ret);
    }
}
