@ECHO OFF

echo Found executable in path %1
echo Updating Registries
reg add HKEY_CLASSES_ROOT\drone-proxy /t REG_SZ /d "Drone Proxy" /f
reg add HKEY_CLASSES_ROOT\drone-proxy /v Version /t REG_SZ /d v1 /f
reg add HKEY_CLASSES_ROOT\drone-proxy /v "URL Protocol" /t REG_SZ /d "" /f
reg add HKEY_CLASSES_ROOT\drone-proxy\DefaultIcon /t REG_SZ /d "" /f
reg add HKEY_CLASSES_ROOT\drone-proxy\shell /f
reg add HKEY_CLASSES_ROOT\drone-proxy\shell\open /f
reg add HKEY_CLASSES_ROOT\drone-proxy\shell\open\command /t REG_SZ /d %1 /f

echo Done
