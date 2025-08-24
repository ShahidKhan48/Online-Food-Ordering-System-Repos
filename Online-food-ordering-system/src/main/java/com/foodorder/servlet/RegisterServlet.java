package com.foodorder.servlet;

import com.foodorder.dao.UserDAO;
import com.foodorder.model.User;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class RegisterServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String password = request.getParameter("password");
        
        User user = new User(name, email, phone, password);
        boolean success = userDAO.registerUser(user);
        
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        if (success) {
            out.print("{\"success\": true, \"message\": \"Registration successful\"}");
        } else {
            out.print("{\"success\": false, \"message\": \"Registration failed\"}");
        }
    }
}