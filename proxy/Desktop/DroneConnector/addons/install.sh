

PWD=~/

mkdir $PWD/drone-proxy &> /dev/null
mv *.jar $PWD/drone-proxy/ &> /dev/null
mv *.p12 $PWD/drone-proxy/ &> /dev/null

cat > $PWD/drone-proxy/run.sh <<EOF

if [ "X${JAVA_HOME}" = "X" ]; then
  echo "Missing JAVA_HOME definition"
  exit -1
fi

java -cp $JAVA_HOME:$PWD/drone-proxy/* com.droneconnector.Application

EOF

chmod 777 $PWD/drone-proxy/run.sh

sudo ln -s $PWD/drone-proxy/run.sh /bin/drone-proxy
