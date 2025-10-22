package com.yangyang.networkinfo;

import com.getcapacitor.Logger;

public class NetworkInfo {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }

    // Minimal implementation: return first non-loopback IPv4 address, or empty string
    public String getCurrentIp() {
        try {
            java.util.Enumeration<java.net.NetworkInterface> interfaces = java.net.NetworkInterface.getNetworkInterfaces();
            while (interfaces != null && interfaces.hasMoreElements()) {
                java.net.NetworkInterface ni = interfaces.nextElement();
                try {
                    if (!ni.isUp() || ni.isLoopback() || ni.isVirtual()) continue;
                } catch (Exception ignored) {
                    // some interfaces may throw SecurityException on isUp(); skip them
                    continue;
                }

                java.util.Enumeration<java.net.InetAddress> addrs = ni.getInetAddresses();
                while (addrs.hasMoreElements()) {
                    java.net.InetAddress addr = addrs.nextElement();
                    if (addr == null) continue;
                    if (!addr.isLoopbackAddress() && addr instanceof java.net.Inet4Address) {
                        return addr.getHostAddress();
                    }
                }
            }
        } catch (Exception e) {
            // Logger.error expects a Throwable as the second argument in this environment
            try {
                Logger.error("NetworkInfo", e);
            } catch (Exception ex) {
                // Fallback to printing if Logger interface differs
                System.err.println("NetworkInfo failed to log error: " + e.toString());
            }
            e.printStackTrace();
        }
        return "";
    }
}
