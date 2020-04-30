
if [ "X${JAVA_HOME}" = "X" ]; then
  echo "Missing JAVA_HOME definition"
  exit -1
fi

java -cp $JAVA_HOME:* com.droneconnector.Application