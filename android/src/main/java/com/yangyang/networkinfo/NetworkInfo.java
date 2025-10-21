package com.yangyang.networkinfo;

import com.getcapacitor.Logger;

public class NetworkInfo {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
