
echo "If JAVA is missing, try this:"
echo "export JAVA_HOME=\$(readlink -f /usr/lib/jvm/java-1.8.0-openjdk-amd64/bin/javac | sed \"s:/bin/javac::\")"
echo "export PATH=\$JAVA_HOME/bin:\$PATH"


PWD=~/

mkdir $PWD/drone-proxy &> /dev/null
mv *.jar $PWD/drone-proxy/ &> /dev/null
sudo mv *.p12 / &> /dev/null

cat > $PWD/drone-proxy/run.sh <<EOF

#!/bin/bash

if [ "X\${JAVA_HOME}" = "X" ]; then
  echo "Missing JAVA_HOME definition"
  exit -1
fi

java -cp \$JAVA_HOME:$PWD/drone-proxy/* com.droneconnector.Application --envdir=/tmp/drone-proxy-env

EOF

chmod 777 $PWD/drone-proxy/run.sh

sudo rm /bin/drone-proxy &> /dev/null
sudo ln -s $PWD/drone-proxy/run.sh /bin/drone-proxy

echo "Handling Registries"
./regupdate.sh /bin/drone-proxy

