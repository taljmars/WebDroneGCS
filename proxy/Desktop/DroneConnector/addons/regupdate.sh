echo "Found executable in path $1"
echo "Build registry structure"

MIME_FILE=~/.local/share/applications/drone-proxy.desktop

echo "[Desktop Entry]" > $MIME_FILE
echo "Name=drone-proxy" >> $MIME_FILE
echo "Exec=$1 \$1" >> $MIME_FILE
echo "Type=Application" >> $MIME_FILE
echo "Terminal=true" >> $MIME_FILE
echo "MimeType=x-scheme-handler/drone-proxy;" >> $MIME_FILE

echo "Sign registry"
RES=`grep "drone-proxy" ~/.local/share/applications/mimeapps.list`
if [ "X${RES}" = "X" ]; then
    echo "Failed to find drone proxy URI, creating it for the first time"
    echo "x-scheme-handler/drone-proxy=drone-proxy.desktop" >> ~/.local/share/applications/mimeapps.list
else
    echo "Drone proxy entry already signed"
fi

echo "Refresh registry"
update-desktop-database ~/.local/share/applications

echo "Done"
