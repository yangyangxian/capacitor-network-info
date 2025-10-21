import Foundation

@objc public class NetworkInfo: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
