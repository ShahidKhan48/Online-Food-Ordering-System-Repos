package com.foodorder.servlet;

import com.foodorder.dao.UserDAO;
import com.foodorder.model.User;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class LoginServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        User user = userDAO.loginUser(email, password);
        
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            out.print("{\"success\": true, \"message\": \"Login successful\"}");
        } else {
            out.print("{\"success\": false, \"message\": \"Invalid credentials\"}");
        }
    }
}