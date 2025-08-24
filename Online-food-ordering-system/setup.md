# Java Backend Setup Instructions

## Required JAR Files
Download and place in `WEB-INF/lib/` folder:
1. **mysql-connector-java-8.0.33.jar** - MySQL JDBC Driver
2. **gson-2.8.9.jar** - JSON processing
3. **servlet-api.jar** - Servlet API (usually provided by Tomcat)

## Compilation Steps
1. Open command prompt in project directory
2. Run: `ant compile` (or compile manually)
3. Manual compilation:
   ```
   javac -cp "WEB-INF/lib/*" -d WEB-INF/classes src/main/java/com/foodorder/*/*.java
   ```

## Deployment
1. Copy entire project folder to Tomcat `webapps` directory
2. Start Tomcat server
3. Access: `http://localhost:8080/Online-food-ordering-system`

## Database Setup
1. Start MySQL in XAMPP
2. Import `database.sql`
3. Update database credentials in `DatabaseConnection.java` if needed

## Project Structure
```
├── WEB-INF/
│   ├── web.xml
│   ├── classes/com/foodorder/
│   └── lib/ (JAR files)
├── src/main/java/com/foodorder/
│   ├── model/ (User.java, FoodItem.java)
│   ├── dao/ (UserDAO.java, FoodDAO.java)
│   └── servlet/ (LoginServlet.java, etc.)
└── HTML/CSS/JS files
```