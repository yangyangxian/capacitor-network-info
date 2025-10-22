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
            java.util.Map<String, String> candidates = new java.util.LinkedHashMap<>();
            java.util.Enumeration<java.net.NetworkInterface> interfaces = java.net.NetworkInterface.getNetworkInterfaces();
            while (interfaces != null && interfaces.hasMoreElements()) {
                java.net.NetworkInterface ni = interfaces.nextElement();
                try {
                    if (!ni.isUp() || ni.isLoopback() || ni.isVirtual()) continue;
                } catch (Exception ignored) {
                    continue;
                }

                java.util.Enumeration<java.net.InetAddress> addrs = ni.getInetAddresses();
                while (addrs.hasMoreElements()) {
                    java.net.InetAddress addr = addrs.nextElement();
                    if (addr == null) continue;
                    if (!addr.isLoopbackAddress() && addr instanceof java.net.Inet4Address) {
                        String ip = addr.getHostAddress();
                        candidates.put(ni.getName(), ip);
                    }
                }
            }

            // Prefer common Wi-Fi interface names
            String[] wifiNames = new String[] {"wlan0", "wlan", "wifi", "eth0", "en0"};
            for (String name : wifiNames) {
                if (candidates.containsKey(name)) {
                    return candidates.get(name);
                }
            }

            // Fallback to first candidate
            if (!candidates.isEmpty()) {
                return candidates.values().iterator().next();
            }
        } catch (Exception e) {
            try {
                Logger.error("NetworkInfo", e);
            } catch (Exception ex) {
                System.err.println("NetworkInfo failed to log error: " + e.toString());
            }
            e.printStackTrace();
        }
        return "";
    }
}
