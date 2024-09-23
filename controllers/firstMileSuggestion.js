import { groq } from "../groq_sdk/groq.js";

export const firstMileSuggestion = async (req, res) => {
  try {
    const { MilesCarriers, selectedCarrier } = req.body;
    // Construct the prompt to guide the model's response
    const prompt = `
      You have the following mile carriers available: ${MilesCarriers.join(
        ", "
      )}. 
      The currently selected carrier is ${selectedCarrier}. 
      Recommend one of the available carriers to switch to for the First Mile, 
      along with the estimated cost savings in a single line response, like: "Switch to [Carrier] for First Mile to reduce costs by approximately $X.00."
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
    });
    console.log(completion.choices[0]?.message?.content || "");
      res.json({
        message: "data fetched successfully",
        success: true,
        data: completion.choices[0]?.message?.content || "",
      });
  } catch (error) {
    res.status(500).json({error});
  }
};
