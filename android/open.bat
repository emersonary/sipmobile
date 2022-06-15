if exist app\build\outputs\apk\release\sipmobile-release.apk
 ( if exist app\build\outputs\apk\release\app-universal-release.apk
   ( del app\build\outputs\apk\release\sipmobile-release.apk ) )

ren app\build\outputs\apk\release\app-universal-release.apk sipmobile-release.apk

if exist app\build\outputs\bundle\release\app-release.aab
 ( if exist app\build\outputs\bundle\release\sipmobile-release.aab
   ( del app\build\outputs\apk\release\sipmobile-release.aab ) )

ren app\build\outputs\bundle\release\app-release.aab sipmobile-release.aab

if %1 == bundle 
(
explorer app\build\outputs\bundle\release
)
else
(
explorer app\build\outputs\apk\release
)
