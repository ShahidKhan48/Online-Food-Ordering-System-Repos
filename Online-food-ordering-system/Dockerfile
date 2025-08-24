FROM tomcat:9.0-jdk11

# Copy application files
COPY . /usr/local/tomcat/webapps/food-order/

# Download required JAR files
RUN cd /usr/local/tomcat/webapps/food-order/WEB-INF/lib && \
    curl -O https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.33/mysql-connector-java-8.0.33.jar && \
    curl -O https://repo1.maven.org/maven2/com/google/code/gson/gson/2.8.9/gson-2.8.9.jar

# Compile Java classes
WORKDIR /usr/local/tomcat/webapps/food-order
RUN javac -cp "WEB-INF/lib/*:/usr/local/tomcat/lib/*" -d WEB-INF/classes src/main/java/com/foodorder/*/*.java

EXPOSE 8080