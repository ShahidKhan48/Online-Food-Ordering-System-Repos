package com.foodorder.servlet;

import com.foodorder.model.User;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import com.foodorder.dao.DatabaseConnection;

public class OrderServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        if (user == null) {
            out.print("{\"success\": false, \"message\": \"Please login first\"}");
            return;
        }
        
        String cartData = request.getParameter("cartData");
        double totalAmount = Double.parseDouble(request.getParameter("totalAmount"));
        
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'Pending')";
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, user.getId());
            stmt.setDouble(2, totalAmount);
            
            int result = stmt.executeUpdate();
            if (result > 0) {
                out.print("{\"success\": true, \"message\": \"Order placed successfully\"}");
            } else {
                out.print("{\"success\": false, \"message\": \"Order failed\"}");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            out.print("{\"success\": false, \"message\": \"Database error\"}");
        }
    }
}