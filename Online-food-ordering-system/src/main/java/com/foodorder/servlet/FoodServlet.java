package com.foodorder.servlet;

import com.foodorder.dao.FoodDAO;
import com.foodorder.model.FoodItem;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import com.google.gson.Gson;

public class FoodServlet extends HttpServlet {
    private FoodDAO foodDAO = new FoodDAO();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        List<FoodItem> foodItems = foodDAO.getAllFoodItems();
        
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(gson.toJson(foodItems));
    }
}