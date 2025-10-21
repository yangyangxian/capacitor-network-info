// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorNetworkInfo",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorNetworkInfo",
            targets: ["NetworkInfoPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "NetworkInfoPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/NetworkInfoPlugin"),
        .testTarget(
            name: "NetworkInfoPluginTests",
            dependencies: ["NetworkInfoPlugin"],
            path: "ios/Tests/NetworkInfoPluginTests")
    ]
)