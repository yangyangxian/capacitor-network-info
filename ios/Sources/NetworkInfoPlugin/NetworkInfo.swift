import Foundation

@objc public class NetworkInfo: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }

    @objc public func getCurrentIp() -> String {
        // Minimal implementation using getifaddrs to find first non-loopback IPv4
        var address: String = ""
        var ifaddr: UnsafeMutablePointer<ifaddrs>? = nil
        if getifaddrs(&ifaddr) == 0 {
            var ptr = ifaddr
            while ptr != nil {
                defer { ptr = ptr?.pointee.ifa_next }
                guard let sa = ptr?.pointee.ifa_addr else { continue }
                let family = sa.pointee.sa_family
                if family == UInt8(AF_INET) {
                    // IPv4
                    var hostname = [CChar](repeating: 0, count: Int(NI_MAXHOST))
                    let result = getnameinfo(sa, socklen_t(sa.pointee.sa_len), &hostname, socklen_t(hostname.count), nil, 0, NI_NUMERICHOST)
                    if result == 0 {
                        let ip = String(cString: hostname)
                        if ip != "127.0.0.1" {
                            address = ip
                            break
                        }
                    }
                }
            }
            freeifaddrs(ifaddr)
        }
        return address
    }
}
