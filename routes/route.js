import express, { json } from "express";
import { firstMileSuggestion } from "../controllers/firstMileSuggestion.js";
import OpenAI from "openai";
import axios from "axios";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const route = express.Router();

route.post("/first-Mile-suggestion", firstMileSuggestion);

route.get("/estimate", async (req, res) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Host", "api.shipengine.com");
    myHeaders.append("API-Key", "DNjTmm7T/eJohJPQkJWAn4C7oFIf77P8rSOoBVv4ono");
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(req.body);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://api.shipengine.com/v1/rates/estimate",
      requestOptions
    );
    const data = await result.json();

    res.json({
      cost: data[0]?.shipping_amount?.amount,
      days: data[0]?.delivery_days,
    });
  } catch (error) {
    console.log(error);
  }
});

route.post("/cost-info", async (req, res) => {
  try {
    // Extract information from the request body
    const {
      shippingVolume,
      packageDimensions,
      packageWeight,
      origin,
      destination,
      serviceLevel,
      currentCosts,
      firstMileCarrier,
      firstMileDistance,
      middleMileCarrier,
      middleMileDistance,
      lastMileCarrier,
      lastMileDistance,
    } = req.body;

    // Create the prompt for OpenAI API
    const prompt = `
      I need to make a shipping carrier recommendation based on the following information:

      - Shipping Volume: ${shippingVolume} packages per day/week/month
      - Package Dimensions: ${packageDimensions} (average dimensions of the package)
      - Package Weight: ${packageWeight} lbs (average weight of the package)
      - Origin: ${origin}
      - Destination: ${destination}
      - Service Level: ${serviceLevel} (overnight, express, ground, etc.)
      - Current Shipping Costs: ${currentCosts} (current costs with UPS or other carriers)

      The following carriers and distances are involved in the shipment:
      - First Mile Carrier: ${firstMileCarrier} covering ${firstMileDistance} miles
      - Middle Mile Carrier: ${middleMileCarrier} covering ${middleMileDistance} miles
      - Last Mile Carrier: ${lastMileCarrier} covering ${lastMileDistance} miles

      Please recommend whether these are the best carriers for cost savings or suggest alternatives, and provide an estimate of potential cost savings.
    `;

    // Make the request to OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract the content from the API response
    const aiResponse = completion.choices[0]?.message?.content;

    // Example Calculation: You can replace this with actual logic
    const totalCost = 15.0; // Set this dynamically based on your logic
    const totalSavings = 15.0; // Set dynamically based on AI recommendations
    const totalDiscountPercentage =
      (totalSavings / (totalCost + totalSavings)) * 100;

    // Return the response with cost, savings, and discount
    res.json({
      message: aiResponse,
      totalCost: `$${totalCost.toFixed(2)}`,
      totalSavings: `$${totalSavings.toFixed(2)}`,
      totalDiscount: `${totalDiscountPercentage.toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Error generating recommendation:", error);

    // Return error in JSON format
    res.status(500).json({
      message: "An error coccurred while generating the recommendation.",
      error: error.message,
    });
  }
});

export default route;
