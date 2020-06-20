echo Installing Drone Proxy 

echo Handling Registries
call regupdate.bat "%~dp0\run.bat"

echo Handling Java

echo ^@echo off > run.bat
echo echo Welcome To Drone-Proxy! >> run.bat
echo mkdir "%userprofile%\drone-proxy-env" >> run.bat
echo java -cp "%JAVA_HOME%;%~dp0\*" com.droneconnector.Application --envdir="%userprofile%\drone-proxy-env" >> run.bat
