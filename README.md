# Mang Juan (STSWENG-MCO-G7, 021)
## Running via Expo Go's QR feature
1. Ensure Expo Go v58 at minimum is installed on your mobile device.
    - Download the latest version of Expo Go here: https://expo.dev/go
    - **NOTE:** Google Play Store's Expo Go is delayed of updates. Best to download it on the Expo website.
2. Run app in the Command Prompt or console via `npx expo start -c`.
3. Once the QR code appears, scan via Expo Go.
4. Wait for the app to bundle and load onto your mobile device.
## Running via Expo through Developer Options
### Enabling Developer Options
1. Navigate to your mobile device's `Settings > About Phone > Software Information`
    - **NOTE:** `Software Information` may differ on other devices, e.g. in Xiaomi, it is called `Detailed info and specs`.
2. Find `Build Number` and tap it 7 times in rapid succession.
    - **NOTE:** `Build Number` may differ on other devices, e.g. in Xiaomi, it is called `OS version`.
### Enabling USB debugging via Developer Options
3. With developer options enabled, navigate to `Settings > Developer Options`.
    - **NOTE:** Where `Developer Options` is located is dependent on the model of your mobile device, e.g. in Xiaomi, it is located in `Additional settings > Developer Options`. It is suggested that you use the search bar feature of your `Settings` to find it easily.
4. Enable `USB Debugging`.
### Running via Expo
5. Connect your mobile device to your PC using a compatible charger wire.
6. Run app in the Command Prompt or console via `npx expo start -c`.
7. Once loading finishes, press `Shift + A`.
8. Select your connected mobile device.
9. Wait for the app to bundle and load onto your mobile device.
    - **NOTE:** Permissions may be prompted on your mobile device during bundling. Ensure reading them and allowing only the permissions that are related to the app.
## Stopping Expo server
1. Simply press `Ctrl + C` on the console where Expo is running.
2. Disconnect associated mobile device(s) from PC.